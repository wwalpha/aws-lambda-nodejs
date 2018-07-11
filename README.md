# AWS-Lambda
Lambda functionsを一括管理するため、何が必要かを考える

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
