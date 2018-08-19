import { CloudFormation } from 'aws-sdk';
import { execCmd, deleteIfExist, init } from './utils';

// 初期化処理
const config: any = init();

// 変数定義
const { env, service, function: funcName, bucket, proxy = undefined, build = false } = config;
const stackName: string = `${service}-${env}-${funcName}`;

const cfn = new CloudFormation({
  region: 'ap-northeast-1',
  httpOptions: {
    proxy,
  },
});

/** Stack作成 */
const create = async () => {
  const srcPath = `src/${service}/${funcName}`;

  // 異常終了のstackを削除する
  console.log('check stack status...');
  // await deleteIfExist(cfn, stackName);

  let cmd: string;

  if (build) {
    console.log('start wepack build...');
    // Build Exec
    cmd = `webpack --config ${srcPath}/webpack.config.js`;
    // コマンド実行
    await execCmd(cmd);
  }

  console.log('\r\nstart validate template...');
  // Validate コマンド
  cmd = `sam validate -t ${srcPath}/template.sam.yml`;
  // コマンド実行
  await execCmd(cmd);

  console.log('\r\nstart package template...');

  // Package コマンド
  cmd = `sam package --template-file ${srcPath}/template.sam.yml --s3-bucket ${bucket} --output-template-file ${srcPath}/packaged.yml`;
  // コマンド実行
  await execCmd(cmd);

  console.log('\r\nstart deploy template...');

  // Deploy コマンド
  cmd = `aws cloudformation deploy --template-file ${srcPath}/packaged.yml --stack-name ${stackName} --capabilities CAPABILITY_IAM`;
  // コマンド実行
  await execCmd(cmd);

  process.exit(0);
};

create();

process.on('rejectionHandled', console.log);
