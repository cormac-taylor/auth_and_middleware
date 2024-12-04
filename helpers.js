import { ObjectId } from "mongodb";

const MIN_NAME_LEN = 2;
const MAX_NAME_LEN = 25;
const MIN_USERID_LEN = 5;
const MAX_USERID_LEN = 10;
const MIN_PASSWORD_LEN = 8;
const MIN_QUOTE_LEN = 20;
const MAX_QUOTE_LEN = 255;
const VALID_ROLES = ["admin", "user"];

const checkUndefined = (val) => {
  if (typeof val === "undefined") throw "must be defined.";
};

export const validateBoolean = (bool) => {
  checkUndefined(bool);
  if (typeof bool !== "boolean") throw "must be a boolean.";
  return bool;
};

export const validateFloat = (num) => {
  checkUndefined(num);
  if (typeof num !== "number") throw "must be a number.";
  if (isNaN(num)) throw "must have a value.";
  if (!isFinite(num)) throw "must be finite.";
  return num.toFixed(2);
};

export const validateInteger = (int) => {
  checkUndefined(int);
  if (typeof int !== "number") throw "must be a number.";
  if (isNaN(int)) throw "must have a value.";
  if (!isFinite(int)) throw "must be finite.";
  if (!Number.isInteger(int)) throw "must be an integer.";
  return int;
};

export const validateString = (str) => {
  checkUndefined(str);
  if (typeof str !== "string") throw "must be a string.";
  const res = str.trim();
  if (!res) throw "must not be empty.";
  return res;
};

export const validateStrOfLen = (str, minLen, maxLen) => {
  const res = validateString(str);
  if (res.length < minLen) throw `must be at least ${minLen} chars!`;
  if (res.length > maxLen) throw `must be at most ${maxLen} chars!`;
  return res;
};

export const validateArray = (arr) => {
  checkUndefined(arr);
  if (!Array.isArray(arr)) throw "must be an array.";
  return arr;
};

export const validateNonEmptyArray = (arr) => {
  const res = validateArray(arr);
  if (res.length === 0) throw "must be non-empty.";
  return res;
};

export const validateObject = (obj) => {
  checkUndefined(obj);
  if (typeof obj !== "object") throw "must be an object.";
  if (Array.isArray(obj)) throw "must not be an array.";
  return obj;
};

export const validateNonEmptyObject = (obj) => {
  const res = validateObject(obj);
  if (Object.keys(res).length === 0) throw "must be non-empty.";
  return res;
};

export const validateFunction = (func) => {
  checkUndefined(bool);
  if (typeof func !== "function") throw "must be a function.";
  return func;
};

export const validateObjectID = (id) => {
  const res = validateString(id);
  if (!ObjectId.isValid(res)) throw "must be a mongo objectID.";
  return ObjectId.createFromHexString(res);
};

export const validateName = (name) => {
  // https://a-tokyo.medium.com/first-and-last-name-validation-for-forms-and-databases-d3edf29ad29d
  const NAME_REGEX = /^[a-zA-Z]+([ \-']{0,1}[a-zA-Z]+){0,2}[.]{0,1}$/;

  const res = validateStrOfLen(name, MIN_NAME_LEN, MAX_NAME_LEN);
  if (!NAME_REGEX.test(res)) throw "must be a valid name.";
  return res;
};

export const validateUserId = (userId) => {
  const res = validateStrOfLen(userId, MIN_USERID_LEN, MAX_USERID_LEN);
  for (let c of res)
    if ("0" <= c && c <= "9") throw "must not contain numbers.";
  return res;
};

export const validatePassword = (password) => {
  // https://www.geeksforgeeks.org/javascript-program-to-validate-password-using-regular-expressions/
  const PASSWORD_REGEX =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]+$/;

  const res = validateStrOfLen(password, MIN_PASSWORD_LEN, Infinity);
  if (!PASSWORD_REGEX.test(res))
    throw "not strong enough. Include a uppercase, digit, and special character.";
  return res;
};

export const validateQuote = (quote) => {
  return validateStrOfLen(quote, MIN_QUOTE_LEN, MAX_QUOTE_LEN);
};

export const validateColorCode = (colorCode) => {
  // https://stackoverflow.com/questions/8027423/how-to-check-if-a-string-is-a-valid-hex-color-representation
  const COLOR_CODE_REGEX = /^#[0-9A-Fa-f]{6}$/;

  const res = validateStrOfLen(colorCode, 6, 8);
  if (!COLOR_CODE_REGEX.test(res)) throw "must be a valid hex color code.";
  return res.toUpperCase();
};

export const validateTheme = (theme) => {
  const res = validateNonEmptyObject(theme);
  if (Object.keys(res).length !== 2) throw "must only contain two keys.";
  try {
    res.backgroundColor = validateColorCode(res.backgroundColor);
    res.fontColor = validateColorCode(res.fontColor);
  } catch (e) {
    throw "must have hex code color values.";
  }
  if (res.backgroundColor === res.fontColor) throw "must be different.";
  return res;
};

export const validateRole = (role) => {
  const res = validateString(role).toLowerCase();
  for (let r of VALID_ROLES) if (r === res) return res;
  throw "must be either admin or user.";
};

export const timeFormat = (time) => {
  return String(time).padStart(2, '0')
}