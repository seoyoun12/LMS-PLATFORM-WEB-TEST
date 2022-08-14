export function setCookie(name: string, value: string, expires: number) {
  let date = new Date();
  date.setTime(date.getTime() + expires * 60 * 60 * 1000); // hour
  document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
}

export function getCookie(name: string) {
  let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value ? value[2] : null;
}

export function deleteCookie(name: string) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/'; //path=/ 명시해여 잘 삭제됨.
}
