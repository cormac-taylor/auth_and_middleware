
import { signInUser, signUpUser } from "./data/users.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";

//lets drop the database each time this is run
const db = await dbConnection();
await db.dropDatabase();

try {
  const res = await signUpUser(
    "Patrick",
    "Hill",
    "graffixnyc",
    "HorsePull748*%",
    "We have two lives, the 2nd begins when you realize you only have one.",
    { backgroundColor: "#000000", fontColor: "#FFFFFF" },
    "admin"
  );
  console.log(res);
} catch (e) {
  console.log(e);
}

try {
  const res = await signInUser("graffixnyc", "HorsePull748*%");
  console.log(res);
} catch (e) {
  console.log(e);
}

await closeConnection();
