import express from "express";
const app = express();
import session from "express-session";
import configRoutes from "./routes/index.js";
import exphbs from "express-handlebars";

app.use("/public", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  session({
    name: "AuthenticationState",
    secret: "some secret string!",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/", (req, _, next) => {
  const timestamp = new Date().toUTCString();
  const method = req.method;
  const route = req.originalUrl;
  let auth = "";
  let admin = "";

  if (!req.session || !req.session.user) {
    auth = "Non-";
  } else if (req.session.user.role === "admin") {
    admin = "Administrator ";
  }
  console.log(
    `[${timestamp}]: ${method} ${route} (${auth}Authenticated ${admin}User)`
  );
  next();
});

app.use("/", (req, res, next) => {
  const route = req.originalUrl;
  if (route === "/") {
    req.method = "GET";
    if (!req.session || !req.session.user) {
      res.redirect("/signinuser");
    } else if (req.session.user.role === "admin") {
      res.redirect("/administrator");
    } else if (req.session.user.role === "user") {
      res.redirect("/user");
    } else {
      res.redirect("/signinuser");
    }
  } else {
    next();
  }
});

app.use("/signinuser", (req, res, next) => {
  const method = req.method;
  if (method.toLowerCase() === "get") {
    if (!req.session || !req.session.user) {
      next();
    } else if (req.session.user.role === "admin") {
      res.redirect("/administrator");
    } else if (req.session.user.role === "user") {
      res.redirect("/user");
    } else {
      next();
    }
  } else {
    next();
  }
});

app.use("/signupuser", (req, res, next) => {
  const method = req.method;
  if (method.toLowerCase() === "get") {
    if (!req.session || !req.session.user) {
      next();
    } else if (req.session.user.role === "admin") {
      res.redirect("/administrator");
    } else if (req.session.user.role === "user") {
      res.redirect("/user");
    } else {
      next();
    }
  } else {
    next();
  }
});

app.use("/user", (req, res, next) => {
  const method = req.method;
  if (method.toLowerCase() === "get") {
    if (!req.session || !req.session.user) {
      res.redirect("/signinuser");
    } else {
      next();
    }
  } else {
    next();
  }
});

app.use("/administrator", (req, res, next) => {
  const method = req.method;
  if (method.toLowerCase() === "get") {
    if (!req.session || !req.session.user) {
      res.redirect("/signinuser");
    } else if (req.session.user.role !== "admin") {
      res.render("error", {
        pageTitle: "403 Forbiden",
        error: "403 Forbiden",
        themePreference: req.session.user.themePreference,
        defaultColor: false,
      });
      res.status(403);
      return;
    } else {
      next();
    }
  } else {
    next();
  }
});

app.use("/signoutuser", (req, res, next) => {
  const method = req.method;
  if (method.toLowerCase() === "get") {
    if (!req.session || !req.session.user) {
      res.redirect("/signinuser");
    } else {
      next();
    }
  } else {
    next();
  }
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
