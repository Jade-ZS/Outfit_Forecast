const CtoF = temp => Math.round(temp * (9/5) + 32);
const FtoC= temp => Math.round((temp - 32) * 5/9);

export {
  FtoC,
  CtoF
}