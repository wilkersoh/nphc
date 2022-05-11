export const objectToQueryString = ( obj: any ) => {
  const result = new URLSearchParams( obj ).toString();

  return result;
}
