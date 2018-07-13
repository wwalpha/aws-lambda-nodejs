# AWS-Lambda Project
Lambda Functionsを一括管理するため、何が必要かを考える

Nodejsベースのプロトタイプを作って、これを使い、改善を図る

## Installation
### Prerequisites
* [Docker](https://www.docker.com/)
* [Python2.7 or Python3.6](https://www.python.org/)
* [aws-sam-cli](https://github.com/awslabs/aws-sam-cli)
* [Visual Studio Code (VSCode)](https://code.visualstudio.com/)
* [Node.js](https://nodejs.org/ja/)
* Option: [Yarn](https://yarnpkg.com/lang/ja/)

`SAM CLI`を使って、ローカルでServerless Functionsをテストする
SAM CLI will use the `DOCKER_HOST` environment variable to contact the docker daemon.

### VSCode Plugins
* [YAML Support by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml)
  * VSCodeとYAML schemaを使って、簡単かつ高速でTemplateを書くことができます
  * [参考：YAMLでCloudFormation Templateを書く](https://qiita.com/wwalpha/items/280c25840ee3c3fdab2d)

### NPM library
* webpack + webpack-merge
  * Release Minimal Module For Cost Down
  * 機能ごと、独自のコンパイル設定ができる
  * ライブラリ＋Lambdbを一つのファイルにコンパイルする

## Configuration 
### VSCode > File > Prefenrences > Settings
```

```

## Test
テスト対象のフォルダにて、下記コマンドを実行する

### Run API Gateway locally
ライブラリは共通管理するため、実行する前にコンパイルが必要です。

`Command Window: [1]`：ソースを監視し、変更あった場合、速やかに差分で再ビルドする

`Command Window: [2]`：APサーバーを起動し、Lambdaを呼ぶ、ソース変更があった場合、自動的にHot-Relodingする

* Command Window: [1]
```s
$ yarn build
```
* Command Window: [2]
```s
$ sam local start-api
```

### Lambda Function YAML Sample
```yaml
AWSTemplateFormatVersion: 2010-09-09
Transform: AWS::Serverless-2016-10-31
Description: Create S3 Pre-Signed URL
Resources:
  GetPreSignedURL:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: dist
      Handler: index.handler
      Runtime: nodejs8.10
      Policies: S3FullAccess
      Events:
        GetResource:
          Type: Api
          Properties:
            Path: /test
            Method: Get
      Environment:
        Variables:
          BUCKET_NAME: 'xxx'
```

### Debugging Lambda
Debuggingを有効するため、起動時Debug Portの指定が必要になる

```s
# Invoke a function locally in debug mode on port 5858
$ sam local invoke -d 5858 <function logical id>
# Invoke a function locally in debug mode via package.json
$ yarn invoke

# Start local API Gateway in debug mode on port 5858
$ sam local start-api -d 5858
# Start local API Gateway in debug mode via package.json
$ yarn api

```

### Debugging via API Gateway locally
VSCodeのDebug機能を使う、下記設定通りDebugを起動し、自動的にAttachする

(e.g. Node.js 4.3 and Node.js 6.10) use the `legacy` protocol

(e.g. Node.js 8.10) use the `inspector` protocol

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Attach to SAM Local",
      "type": "node",
      "request": "attach",
      "address": "localhost",
      "port": 5858,
      "localRoot": "${workspaceRoot}",
      "remoteRoot": "/var/task",
      "protocol": "inspector"
    }
  ]
}
```


## Lambda Deploy Flow
* コードのビルド
  * 開発・プロダクション環境の設定の切り替え
  * 依存ライブラリの解決とコードへの混入
  * ネイティブライブラリの生成とコードへの混入
* IAM User（or IAM Role）の準備
  * S3にコードをアップロードするためのIAM User
  * 依存するAWSリソースを作成するためのIAM User
  * Lambda Functionを作成するためのIAM User
  * Lambda Functionを実行するためのIAM Role
* 依存するAWSリソースの作成
* Lambda Functionの作成
* イベントソースの設定
