export const totalSecToMinSec = (totalSec: number) => {
  console.log(totalSec)
  const min = Math.floor(totalSec / 60);
  const sec = totalSec - min * 60;
  return { min, sec };
};
