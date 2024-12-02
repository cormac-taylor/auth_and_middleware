import { users } from "../config/mongoCollections";
import { validateName, validateUserId } from "../helpers";

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
  // TO DO

  const usersCollection = await users();

  const usedUserId = await usersCollection.findOne({ userId: userId });
  if (usedUserId) throw "userId is taken!";
};

export const signInUser = async (userId, password) => {};
