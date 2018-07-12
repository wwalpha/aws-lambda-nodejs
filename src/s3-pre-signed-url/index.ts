import { S3 } from 'aws-sdk';
import { APIGatewayEvent, Context, Callback } from 'aws-lambda';

export const handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  // const s3 = new S3();

  // const url = s3.getSignedUrl('getObject', {
  //   Bucket: process.env.BUCKET_NAME,
  //   Key: 'key',
  //   Expires: 60,
  // });
  console.log('1111222');
  callback(null, {
    'statusCode': 200,
    'body': JSON.stringify({
      message: 'hello world222',
    })
  });
};
