const MIN_NAME_LEN = 2;
const MAX_NAME_LEN = 25;
const MIN_USERID_LEN = 5;
const MAX_USERID_LEN = 10;
const MIN_PASSWORD_LEN = 8;
const MIN_QUOTE_LEN = 20;
const MAX_QUOTE_LEN = 255;
const VALID_ROLES = ["admin", "user"];

// Sign in form
let signinForm = document.getElementById("signin-form");
let user_id_input = document.getElementById("user_id");
let password_in_input = document.getElementById("password");
let submit_button_label = document.getElementById("submit_button_label");
let client_signin_error = document.getElementById("client_signin_error");

// Sign up form
let signupForm = document.getElementById("signup-form");
let firstName_input = document.getElementById("firstName");
let lastName_input = document.getElementById("lastName");
let userId_input = document.getElementById("userId");
let password_up_input = document.getElementById("password");
let confirmPassword_input = document.getElementById("confirmPassword");
let favoriteQuote_input = document.getElementById("favoriteQuote");
let backgroundColor_input = document.getElementById("backgroundColor");
let fontColor_input = document.getElementById("fontColor");
let role_input = document.getElementById("role");
let submitButton_label = document.getElementById("submitButton_label");
let client_signup_error = document.getElementById("client_signup_error");

if (signinForm) {
  signinForm.addEventListener("submit", (event) => {
    const errors = [];
    const userId = user_id_input.value;
    const password = password_in_input.value;

    try {
      user_id_input.value = validateUserId(userId);
    } catch (e) {
      user_id_input.value = userId.trim();
      errors.push(`User ID ${e}`);
    }

    try {
      password_in_input.value = validatePassword(password);
    } catch (e) {
      password_in_input.value = password.trim();
      errors.push(`Password ${e}`);
    }

    if (errors.length > 0) {
      event.preventDefault();

      if (submit_button_label) submit_button_label.innerHTML = "";
      client_signin_error.innerHTML = "";
      for (let e of errors) {
        let li = document.createElement("li");
        li.className = "error";
        li.innerHTML = e;
        client_signin_error.appendChild(li);
      }
    }
  });
} else if (signupForm) {
  signupForm.addEventListener("submit", (event) => {
    const errors = [];
    const firstName = firstName_input.value;
    const lastName = lastName_input.value;
    const userId = userId_input.value;
    const password = password_up_input.value;
    const confirmPassword = confirmPassword_input.value;
    const favoriteQuote = favoriteQuote_input.value;
    const backgroundColor = backgroundColor_input.value;
    const fontColor = fontColor_input.value;
    const role = role_input.value;

    try {
      firstName_input.value = validateName(firstName);
    } catch (e) {
      firstName_input.value = firstName.trim();
      errors.push(`First Name ${e}`);
    }

    try {
      lastName_input.value = validateName(lastName);
    } catch (e) {
      lastName_input.value = lastName.trim();
      errors.push(`Last Name ${e}`);
    }

    try {
      userId_input.value = validateUserId(userId);
    } catch (e) {
      userId_input.value = userId.trim();
      errors.push(`User ID ${e}`);
    }

    let invalidPassword = false;
    try {
      password_up_input.value = validatePassword(password);
    } catch (e) {
      password_up_input.value = password.trim();
      invalidPassword = true;
      errors.push(`Password ${e}`);
    }

    if (!invalidPassword) {
      try {
        confirmPassword_input.value = validatePassword(confirmPassword);
      } catch (e) {
        confirmPassword_input.value = confirmPassword.trim();
        errors.push(`Confirm Password doesn't match.`);
      }
    }
    try {
      favoriteQuote_input.value = validateQuote(favoriteQuote);
    } catch (e) {
      favoriteQuote_input.value = favoriteQuote.trim();
      errors.push(`Favorite Quote ${e}`);
    }

    let invalidColor = false;
    try {
      backgroundColor_input.value = validateColorCode(backgroundColor);
    } catch (e) {
      backgroundColor_input.value = backgroundColor.trim();
      invalidColor = true;
      errors.push(`Background Color ${e}`);
    }

    try {
      fontColor_input.value = validateColorCode(fontColor);
    } catch (e) {
      fontColor_input.value = fontColor.trim();
      invalidColor = true;
      errors.push(`Font Color ${e}`);
    }

    if (
      !invalidColor &&
      backgroundColor_input.value === fontColor_input.value
    ) {
      errors.push("Background and Font Colors must be different.");
    }

    try {
      role_input.value = validateRole(role);
    } catch (e) {
      role_input.value = role.trim();
      errors.push(`Role ${e}`);
    }

    if (errors.length > 0) {
      event.preventDefault();

      if (submitButton_label) submitButton_label.innerHTML = "";
      client_signup_error.innerHTML = "";
      for (let e of errors) {
        let li = document.createElement("li");
        li.className = "error";
        li.innerHTML = e;
        client_signup_error.appendChild(li);
      }
    }
  });
}

// input validation helpers
const validateString = (str) => {
  if (typeof str !== "string") throw "must be a string.";
  const res = str.trim();
  if (!res) throw "must not be empty.";
  return res;
};

const validateStrOfLen = (str, minLen, maxLen) => {
  const res = validateString(str);
  if (res.length < minLen) throw `must be at least ${minLen} chars!`;
  if (res.length > maxLen) throw `must be at most ${maxLen} chars!`;
  return res;
};

const validateName = (name) => {
  // https://a-tokyo.medium.com/first-and-last-name-validation-for-forms-and-databases-d3edf29ad29d
  const NAME_REGEX = /^[a-zA-Z]+([ \-']{0,1}[a-zA-Z]+){0,2}[.]{0,1}$/;

  const res = validateStrOfLen(name, MIN_NAME_LEN, MAX_NAME_LEN);
  if (!NAME_REGEX.test(res)) throw "must be a valid name.";
  return res;
};

const validateUserId = (userId) => {
  const res = validateStrOfLen(userId, MIN_USERID_LEN, MAX_USERID_LEN);
  for (let c of res)
    if ("0" <= c && c <= "9") throw "must not contain numbers.";
  return res;
};

const validatePassword = (password) => {
  // https://www.geeksforgeeks.org/javascript-program-to-validate-password-using-regular-expressions/
  const PASSWORD_REGEX =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]+$/;

  const res = validateStrOfLen(password, MIN_PASSWORD_LEN, Infinity);
  if (!PASSWORD_REGEX.test(res))
    throw "not strong enough. Include a uppercase, digit, and special character.";
  return res;
};

const validateQuote = (quote) => {
  return validateStrOfLen(quote, MIN_QUOTE_LEN, MAX_QUOTE_LEN);
};

const validateColorCode = (colorCode) => {
  // https://stackoverflow.com/questions/8027423/how-to-check-if-a-string-is-a-valid-hex-color-representation
  const COLOR_CODE_REGEX = /^#[0-9A-Fa-f]{6}$/;

  const res = validateStrOfLen(colorCode, 7, 7);
  if (!COLOR_CODE_REGEX.test(res)) throw "must be a valid hex color code.";
  return res.toUpperCase();
};

const validateRole = (role) => {
  const res = validateString(role).toLowerCase();
  for (let r of VALID_ROLES) if (r === res) return res;
  throw "must be either admin or user.";
};
