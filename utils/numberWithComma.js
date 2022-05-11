const convertToCommaDelimiter = ( value ) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const numberWithCommas = ( x ) => {
  let value = x.toFixed(2);
  if( value ) {
    return convertToCommaDelimiter( value )
  } else {
    return 0
  }
}
