export const objectToErrorMessage = ( errors: any ) => {
  let message = "";

  Object.entries( errors ).forEach(([ key, value ]) => {
    message += value + "\n"
  });

  return message;

}
