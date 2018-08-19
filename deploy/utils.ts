import { CloudFormation, AWSError } from 'aws-sdk';
import { exec } from 'child_process';
import * as fs from 'fs';

export const execCmd = (cmd: string): Promise<void> => new Promise((resolve, reject) => {
  const proc = exec(cmd);

  proc.stdout.on('data', (data) => {
    process.stdout.write(data);
  });

  proc.stderr.on('data', (data) => {
    process.stdout.write(data);
  });

  proc.on('exit', (code) => {
    resolve();
  });
});

export const deleteStack = (cfn: CloudFormation, params: CloudFormation.DeleteStackInput) =>
  new Promise((resolve, reject) => cfn.deleteStack(params, (err: AWSError, data: any) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(data);
  }));

export const createStack = (cfn: CloudFormation, params: CloudFormation.CreateStackInput) =>
  new Promise((resolve, reject) => cfn.createStack(params, (err: AWSError, data: CloudFormation.CreateStackOutput) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(data);
  }));

export const updateStack = (cfn: CloudFormation, params: CloudFormation.UpdateStackInput) =>
  new Promise((resolve, reject) => cfn.updateStack(params, (err: AWSError, data: CloudFormation.UpdateStackOutput) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(data);
  }));

export const describeStacks = (cfn: CloudFormation, params: CloudFormation.DescribeStacksInput): Promise<CloudFormation.DescribeStacksOutput> =>
  new Promise((resolve, reject) => cfn.describeStacks(params, (err: AWSError, data: CloudFormation.DescribeStacksOutput) => {
    if (err) {
      if (err.message.indexOf('does not exist') !== -1) {
        resolve();
      } else {
        reject(err);
      }

      return;
    }

    resolve(data);
  }));

export const timer = (delay: number) => new Promise((resolve, reject) => setTimeout(resolve, delay));

export const validateTemplate = (cfn: CloudFormation, params: CloudFormation.ValidateTemplateInput): Promise<CloudFormation.ValidateTemplateOutput> =>
  new Promise((resolve, reject) => cfn.validateTemplate(params, (err: AWSError, data: CloudFormation.ValidateTemplateOutput) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(data);
  }));

/** 異常終了のstackを削除する */
export const deleteIfExist = async (cfn: CloudFormation, stackName: string): Promise<CloudFormation.StackStatus | null> => {
  while (true) {
    const stackInfo = await describeStacks(cfn, {
      StackName: stackName,
    });

    // stack存在しない
    if (!stackInfo) {
      return null;
    }

    if (!stackInfo.Stacks) {
      return null;
    }
    const status: CloudFormation.StackStatus = stackInfo.Stacks[0].StackStatus;

    // 正常終了のStackは削除しない
    if (status === 'CREATE_COMPLETE' || status === 'UPDATE_COMPLETE') {
      return status;
    }

    // Stack操作中、結果を待つ
    if (status.indexOf('IN_PROGRESS') !== -1) {
      // 1秒待つ
      await timer(1000);
      continue;
    }

    // 異常終了のstackを削除する
    await deleteStack(cfn, {
      StackName: stackName,
    });

    // 削除のプロセスを待つ
    await timer(3000);
  }
};

/** 初期化処理 */
export const init = (): any => {
  const args: string[] = process.argv.splice(2);

  // パラメータなし
  if (!args || args.length !== 1) {
    console.log('パラメータがありません', ...args);
    process.exit(255);
  }

  const yaml = require('js-yaml');
  const configs: any = yaml.safeLoad(fs.readFileSync('./deploy/config.yml', 'utf8'));

  const config: any = configs[args[0]];

  // 設定情報が存在しない
  if (!config) {
    console.log('設定情報が存在しません', ...args);
    process.exit(255);
  }

  return config;
};
