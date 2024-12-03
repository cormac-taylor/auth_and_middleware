import { Router } from "express";
import {
  validateColorCode,
  validateName,
  validatePassword,
  validateQuote,
  validateRole,
  validateUserId,
} from "../helpers";
import { signUpUser } from "../data/users";
const router = Router();

router.route("/").get(async (req, res) => {
  return res.json({ error: "YOU SHOULD NOT BE HERE!" });
});

router
  .route("/signupuser")
  .get(async (_, res) => {
    try {
      res.render("signupuser", { pageTitle: "Sign Up", hasErrors: false });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  })
  .post(async (req, res) => {
    const errors = [];
    const signupData = req.body;

    try {
      signupData.firstName = validateName(signupData.firstName);
    } catch (e) {
      errors.push(`firstName ${e}`);
    }

    try {
      signupData.lastName = validateName(signupData.lastName);
    } catch (e) {
      errors.push(`lastName ${e}`);
    }

    try {
      signupData.userId = validateUserId(signupData.userId);
    } catch (e) {
      errors.push(`userId ${e}`);
    }

    try {
      signupData.password = validatePassword(signupData.password);
    } catch (e) {
      errors.push(`password ${e}`);
    }

    try {
      signupData.confirmPassword = validatePassword(signupData.confirmPassword);
    } catch (e) {
      errors.push(`confirmPassword ${e}`);
    }

    try {
      signupData.favoriteQuote = validateQuote(signupData.favoriteQuote);
    } catch (e) {
      errors.push(`favoriteQuote ${e}`);
    }

    let invalidColor = false;
    try {
      signupData.backgroundColor = validateColorCode(
        signupData.backgroundColor
      );
    } catch (e) {
      errors.push(`backgroundColor ${e}`);
      invalidColor = true;
    }

    try {
      signupData.fontColor = validateColorCode(signupData.fontColor);
    } catch (e) {
      errors.push(`fontColor ${e}`);
      invalidColor = true;
    }

    if (!invalidColor && signupData.backgroundColor === signupData.fontColor)
      errors.push("background and font colors must be different.");

    try {
      signupData.role = validateRole(signupData.role);
    } catch (e) {
      errors.push(`role ${e}`);
    }

    try {
      if (errors.length > 0) {
        res.render("signupuser", {
          pageTitle: "Sign Up",
          errors: errors,
          hasErrors: true,
        });
        res.status(400);
        return;
      }
      const {  } = signupData;
      const newUser = await signUpUser(title, body, posterId, tags);
      res.redirect(`/posts/${newPost._id}`);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });

router
  .route("/signinuser")
  .get(async (_, res) => {
    try {
      res.render("signinuser", { pageTitle: "Sign In" });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  })
  .post(async (req, res) => {
    //code here for POST
  });

router.route("/user").get(async (req, res) => {
  //code here for GET
});

router.route("/administrator").get(async (req, res) => {
  //code here for GET
});

router.route("/signoutuser").get(async (req, res) => {
  //code here for GET
});

export default router;
