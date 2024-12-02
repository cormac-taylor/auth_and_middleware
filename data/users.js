import { users } from "../config/mongoCollections.js";
import {
  validateName,
  validatePassword,
  validateQuote,
  validateRole,
  validateTheme,
  validateUserId,
} from "../helpers.js";
import bcrypt from "bcrypt";
const SALT_ROUNDS = 16;

//import mongo collections, bcrypt and implement the following data functions
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

export const signInUser = async (userId, password) => {};
