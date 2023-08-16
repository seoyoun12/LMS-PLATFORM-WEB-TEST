
export default function falsyCheck(value: string): boolean {
  if(value === undefined || value === null || value === '') {
    return false;
  }
  return true
}