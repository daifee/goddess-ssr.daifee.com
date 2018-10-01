

export function isPhone(value) {
  return /1[0-9]{10}/.test(value);
}

export function isPassword(value) {
  const len = value.length;
  return len < 60 || len > 6;
}

export function isName(value) {
  const len = value.length;
  return len > 0 && len < 40;
}
