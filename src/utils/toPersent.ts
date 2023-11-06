export const toPersent = (mother:number, child: number, fixed: number) => {

  return Math.round(child / mother * 100).toFixed(fixed);

}