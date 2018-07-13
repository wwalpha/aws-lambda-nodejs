import { Context, Callback } from "aws-lambda";

export const handler = (event: any, context: Context, callback: Callback) => {
  callback(null, null);
};
