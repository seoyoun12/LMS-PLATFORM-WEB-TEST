// const passwordRegex =
//   /^(?:[a-zA-Z]+[0-9]+$)|(?:[a-zA-Z]+[^a-zA-Z0-9\n]+$)|(?:[0-9]+[a-zA-Z]+$)|(?:[0-9]+[^a-zA-Z0-9\n]+$)|(?:[^a-zA-Z0-9\n]+[a-zA-Z0-9]+$)/;

// const passwordRegex = /[a-zA-z]+[0-9]+[\[\]\{\}\/,.<>;:\'\"`~!@#$%^&*\(\)-_=+\\]/;
// const passwordRegex = /[a-zA-z0-9\[\]\{\}\/,.<>;:\'\"`~!@#$%^&*\(\)-_=+\\]/;
// const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
// const phoneRegex = /[0-9]$/;

export const passwordRegex = /[a-zA-z0-9\[\]\{\}\/,.<>;:\'\"`~!@#$%^&*\(\)-_=+\\]/;
export const emailRegex =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
export const phoneRegex = /[0-9]{11}/;

export const Phone3Regex = /[0-9]{4}/;
export const Phone4Regex = /[0-9]{5}/;

export const carNumberRegex =
  /(?=.*[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2}[\d]{2}[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{1}[\d]{4})/;

export const Max100Regex = /^[0-9]{1}$|^[1-9]{1}[0-9]{1}$|^100$/;
