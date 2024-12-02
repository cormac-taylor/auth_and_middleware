import { ObjectId } from "mongodb";

const MIN_NAME_LEN = 2;
const MAX_NAME_LEN = 25;
const MIN_USERID_LEN = 5;
const MAX_USERID_LEN = 10;
const MIN_PASSWORD_LEN = 8;
const MIN_QUOTE_LEN = 20;
const MAX_QUOTE_LEN = 255;
const VALID_ROLES = ["admin", "user"];

export const validateBoolean = (bool) => {
  if (typeof bool !== "boolean") throw "bool must be a boolean!";
  return bool;
};

export const validateFloat = (num) => {
  if (typeof num !== "number") throw "num must be a number!";
  if (isNaN(num)) throw "num must have a value!";
  if (!isFinite(num)) throw "num must be finite!";
  return num.toFixed(2);
};

export const validateInteger = (int) => {
  if (typeof int !== "number") throw "int must be a number!";
  if (isNaN(int)) throw "int must have a value!";
  if (!isFinite(int)) throw "int must be finite!";
  if (!Number.isInteger(int)) throw "int must be an integer!";
  return int;
};

export const validateString = (str) => {
  if (typeof str !== "string") throw "str must be a string!";
  const res = str.trim();
  if (!res) throw "str must not be empty!";
  return res;
};

export const validateStrOfLen = (str, minLen, maxLen) => {
  const res = validateString(str);
  if (res.length < minLen) throw `str must be at least ${minLen} chars!`;
  if (res.length > maxLen) throw `str must be at most ${maxLen} chars!`;
  return res;
};

export const validateArray = (arr) => {
  if (!Array.isArray(arr)) throw "arr must be an array!";
  return arr;
};

export const validateNonEmptyArray = (arr) => {
  const res = validateArray(arr);
  if (res.length === 0) throw "arr must be non-empty!";
  return res;
};

export const validateObject = (obj) => {
  if (typeof obj !== "object") throw "obj must be an object!";
  if (Array.isArray(obj)) throw "obj must not be an array!";
  return obj;
};

export const validateNonEmptyObject = (obj) => {
  const res = validateObject(obj);
  if (Object.keys(res).length === 0) throw "obj must be non-empty!";
  return res;
};

export const validateFunction = (func) => {
  if (typeof func !== "function") throw "func must be a function!";
  return func;
};

export const validateObjectID = (id) => {
  const res = validateString(id);
  if (!ObjectId.isValid(res)) throw "id must be an objectID!";
  return ObjectId.createFromHexString(res);
};

export const validateName = (name) => {
  // https://a-tokyo.medium.com/first-and-last-name-validation-for-forms-and-databases-d3edf29ad29d
  const NAME_REGEX = /^[a-zA-Z]+([ \-']{0,1}[a-zA-Z]+){0,2}[.]{0,1}$/;

  const res = validateStrOfLen(name, MIN_NAME_LEN, MAX_NAME_LEN);
  if (!NAME_REGEX.test(res)) throw "name must be a valid name!";
  return res;
};

export const validateUserId = (userId) => {
  const res = validateStrOfLen(userId, MIN_USERID_LEN, MAX_USERID_LEN);
  for (let c of res)
    if ("0" <= c && c <= "9") throw "name must not contain numbers!";
  return res.toLowerCase();
};

export const validatePassword = (password) => {
  // https://www.geeksforgeeks.org/javascript-program-to-validate-password-using-regular-expressions/
  const PASSWORD_REGEX =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]+$/;

  const res = validateStrOfLen(password, MIN_PASSWORD_LEN, Infinity);
  if (!PASSWORD_REGEX.test(res))
    throw "password must be a valid password! Include uppercase, digit, and special.";
  return res;
};

export const validateQuote = (quote) => {
  return validateStrOfLen(quote, MIN_QUOTE_LEN, MAX_QUOTE_LEN);
};

export const validateColorCode = (colorCode) => {
  // https://stackoverflow.com/questions/8027423/how-to-check-if-a-string-is-a-valid-hex-color-representation
  const COLOR_CODE_REGEX = /^#[0-9A-Fa-f]{6}$/;

  const res = validateStrOfLen(colorCode, 6, 8);
  if (!COLOR_CODE_REGEX.test(res)) throw "colorCode must be a valid color code";
  return res.toUpperCase();
};

export const validateTheme = (theme) => {
  const res = validateNonEmptyObject(theme);
  if (Object.keys(res).length !== 2) throw "theme must only contain two keys!";
  try {
    res.backgroundColor = validateColorCode(res.backgroundColor);
    res.fontColor = validateColorCode(res.fontColor);
  } catch (e) {
    throw "backgroundColor and fontColor must have hex code color values.";
  }
  if (res.backgroundColor === res.fontColor)
    throw "backgroundColor and fontColor must not be the same!";
  return res;
};

export const validateRole = (role) => {
  const res = validateString(role).toLowerCase();
  for (let r of VALID_ROLES) if (r === res) return res;
  throw "role must be a valid role!";
};
