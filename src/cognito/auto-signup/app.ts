import { Context, Callback, CognitoUserPoolTriggerEvent } from 'aws-lambda';

export const handler = (event: CognitoUserPoolTriggerEvent, context: Context, callback: Callback) => {
  // Set the user pool autoConfirmUser flag after validating the email domain
  event.response.autoConfirmUser = true;

  /* global callback */
  callback(null, event);
};
