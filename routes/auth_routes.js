import { Router } from "express";
import {
  validateColorCode,
  validateName,
  validatePassword,
  validateQuote,
  validateRole,
  validateUserId,
} from "../helpers.js";
import { signInUser, signUpUser } from "../data/users.js";
import { object } from "webidl-conversions";
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
      errors.firstName = e;
    }

    try {
      signupData.lastName = validateName(signupData.lastName);
    } catch (e) {
      errors.lastName = e;
    }

    try {
      signupData.userId = validateUserId(signupData.userId);
    } catch (e) {
      errors.userId = e;
    }

    try {
      signupData.password = validatePassword(signupData.password);
    } catch (e) {
      errors.password = e;
    }

    try {
      if (
        !errors.password &&
        signupData.password !== signupData.confirmPassword
      )
        throw "must match password.";
    } catch (e) {
      errors.confirmPassword = e;
      if (!errors.password) errors.password = "try again.";
    }

    try {
      signupData.favoriteQuote = validateQuote(signupData.favoriteQuote);
    } catch (e) {
      errors.favoriteQuote = e;
    }

    let invalidColor = false;
    try {
      signupData.backgroundColor = validateColorCode(
        signupData.backgroundColor
      );
    } catch (e) {
      errors.backgroundColor = e;
      invalidColor = true;
    }

    try {
      signupData.fontColor = validateColorCode(signupData.fontColor);
    } catch (e) {
      errors.fontColor = e;
      invalidColor = true;
    }

    if (!invalidColor && signupData.backgroundColor === signupData.fontColor) {
      const err = "these colors must be different.";
      errors.backgroundColor = err;
      errors.fontColor = err;
    }

    try {
      signupData.role = validateRole(signupData.role);
    } catch (e) {
      errors.role = e;
    }

    try {
      if (Object.keys(errors).length > 0) {
        res.render("signupuser", {
          pageTitle: "Sign Up",
          data: signupData,
          hasErrors: true,
          errors: errors,
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
          data: signupData,
          hasErrors: true,
          errors: { other: "Internal Server Error" },
        });
        res.status(500);
        return;
      }
    } catch (e) {
      res.render("signupuser", {
        pageTitle: "Sign Up",
        data: signupData,
        hasErrors: true,
        errors: { other: e },
      });
      res.status(400);
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
    const errors = {};
    const signinData = req.body;

    try {
      signinData.user_id = validateUserId(signinData.user_id);
    } catch (e) {
      errors.user_id = e;
    }

    try {
      signinData.password = validatePassword(signinData.password);
    } catch (e) {
      errors.password = e;
    }

    try {
      if (Object.keys(errors).length > 0) {
        res.render("signinuser", {
          pageTitle: "Sign In",
          data: { user_id: signinData.user_id },
          hasErrors: true,
          errors: errors,
        });
        res.status(400);
        return;
      }

      const { user_id, password } = signinData;

      const signedInUser = await signInUser(user_id, password);

      const {
        firstName,
        lastName,
        userId,
        favoriteQuote,
        themePreference,
        role,
      } = signedInUser;

      req.session.user = {
        firstName,
        lastName,
        userId,
        favoriteQuote,
        themePreference,
        role,
      };

      if (role === "admin") {
        res.redirect("/administrator");
        return;
      } else if (role === "user") {
        res.redirect("/user");
        return;
      } else {
        res.render("error", {
          pageTitle: "403 Forbidden",
          error: "403 Forbidden",
        });
        res.status(403);
        return;
      }
    } catch (e) {
      res.render("signinuser", {
        pageTitle: "Sign In",
        data: { user_id: signinData.user_id },
        hasErrors: true,
        errors: { other: e },
      });
      res.status(400);
    }
  });

router.route("/user").get(async (req, res) => {
  const session = req.session.user;
  res.render("user", {
    pageTitle: "User",
    firstName: session.firstName,
    lastName: session.lastName,
    currentTime: session.currentTime,
    currentDate: session.currentDate,
    role: session.role,
    favoriteQuote: session.favoriteQuote,
    isAdmin: session.role === "admin",
  });
  return;
});

router.route("/administrator").get(async (req, res) => {
  res.render("error", {
    pageTitle: "test",
    error: "administrator",
  });
  return;
});

router.route("/signoutuser").get(async (req, res) => {
  //code here for GET
});

export default router;

// Remember:
// case insensitive query for username
// reseting select for user in signup with client js
// // const selectElement = document.getElementById('userSelection');
// // selectElement.value = 'option2'; // Sets "Option 2" as the selected option.
// make sure the user page gets filled in
