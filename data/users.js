import { users } from "../config/mongoCollections";
import {
  validateName,
  validatePassword,
  validateQuote,
  validateTheme,
  validateUserId,
} from "../helpers";

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
  password = validatePassword(password);
  favoriteQuote = validateQuote(favoriteQuote);
  themePreference = validateTheme(themePreference);

  const usersCollection = await users();

  const usedUserId = await usersCollection.findOne({ userId: userId });
  if (usedUserId) throw "userId is taken!";
};

export const signInUser = async (userId, password) => {};
