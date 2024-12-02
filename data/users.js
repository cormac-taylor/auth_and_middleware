import bcrypt from "bcrypt";
import { users } from "../config/mongoCollections.js";
import {
  validateName,
  validatePassword,
  validateQuote,
  validateRole,
  validateTheme,
  validateUserId,
} from "../helpers.js";

const SALT_ROUNDS = 16;

export const signUpUser = async (
  firstName,
  lastName,
  userId,
  password,
  favoriteQuote,
  themePreference,
  role
) => {
  firstName = validateName(firstName);
  lastName = validateName(lastName);
  userId = validateUserId(userId);
  password = await bcrypt.hash(validatePassword(password), SALT_ROUNDS);
  favoriteQuote = validateQuote(favoriteQuote);
  themePreference = validateTheme(themePreference);
  role = validateRole(role);

  const newUser = {
    firstName,
    lastName,
    userId,
    password,
    favoriteQuote,
    themePreference,
    role,
  };

  const usersCollection = await users();

  const usedUserId = await usersCollection.findOne({ userId: userId });
  if (usedUserId) throw "userId is taken!";

  const insertInfo = await usersCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "could not add user!";

  return { registrationCompleted: true };
};

export const signInUser = async (userId, password) => {
  userId = validateUserId(userId);
  password = validatePassword(password);

  const usersCollection = await users();

  const foundUserId = await usersCollection.findOne({ userId: userId });
  if (!foundUserId) throw "Either the userId or password is invalid";

  const isMatch = await bcrypt.compare(password, foundUserId.password);
  if (!isMatch) throw "Either the userId or password is invalid";

  const res = {
    firstName: foundUserId.firstName,
    lastName: foundUserId.lastName,
    userId: foundUserId.userId,
    favoriteQuote: foundUserId.favoriteQuote,
    themePreference: foundUserId.themePreference,
    role: foundUserId.role,
  };
  return res;
};
