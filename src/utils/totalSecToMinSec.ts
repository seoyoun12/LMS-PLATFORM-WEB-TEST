export const totalSecToMinSec = (totalSec: number) => {
  const min = Math.floor(totalSec / 60);
  const sec = totalSec - min * 60;
  return { min, sec };
};
