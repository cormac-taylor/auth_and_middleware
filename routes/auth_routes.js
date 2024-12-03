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
    const errors = {};
    const signupData = req.body;

    try {
      signupData.firstName = validateName(signupData.firstName);
    } catch (e) {
      errors.firstName = `firstName ${e}`;
    }

    try {
      signupData.lastName = validateName(signupData.lastName);
    } catch (e) {
      errors.lastName = `lastName ${e}`;
    }

    try {
      signupData.userId = validateUserId(signupData.userId);
    } catch (e) {
      errors.userId = `userId ${e}`;
    }

    try {
      signupData.password = validatePassword(signupData.password);
    } catch (e) {
      errors.password = `password ${e}`;
    }

    try {
      signupData.confirmPassword = validatePassword(signupData.confirmPassword);
      if (signupData.password !== signupData.confirmPassword)
        throw "must match password.";
    } catch (e) {
      errors.confirmPassword = "passwords must match.";
    }

    try {
      signupData.favoriteQuote = validateQuote(signupData.favoriteQuote);
    } catch (e) {
      errors.favoriteQuote = `favoriteQuote ${e}`;
    }

    let invalidColor = false;
    try {
      signupData.backgroundColor = validateColorCode(
        signupData.backgroundColor
      );
    } catch (e) {
      errors.backgroundColor = `backgroundColor ${e}`;
      invalidColor = true;
    }

    try {
      signupData.fontColor = validateColorCode(signupData.fontColor);
    } catch (e) {
      errors.fontColor = `fontColor ${e}`;
      invalidColor = true;
    }

    if (!invalidColor && signupData.backgroundColor === signupData.fontColor) {
      const err = "background and font colors must be different.";
      errors.backgroundColor = err;
      errors.fontColor = err;
    }

    try {
      signupData.role = validateRole(signupData.role);
    } catch (e) {
      errors.role = `role ${e}`;
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
      const {
        firstName,
        lastName,
        userId,
        password,
        favoriteQuote,
        backgroundColor,
        fontColor,
        role,
      } = signupData;
      const newUser = await signUpUser(
        firstName,
        lastName,
        userId,
        password,
        favoriteQuote,
        {
          backgroundColor,
          fontColor,
        },
        role
      );
      if (newUser.registrationCompleted) {
        res.redirect("/signinuser");
        return;
      } else {
        res.render("signupuser", {
          pageTitle: "Sign Up",
          errors: { server: "Internal Server Error" },
          hasErrors: true,
        });
        res.status(500);
        return;
      }
    } catch (e) {
      res.status(400).json({ error: e });
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
