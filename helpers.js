//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import { ObjectId } from "mongodb";

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
