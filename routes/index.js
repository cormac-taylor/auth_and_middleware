//Here you will import route files and export the constructor method as shown in lecture code and worked in previous labs.
import authRoutes from "./auth_routes.js";

const constructorMethod = (app) => {
  app.use("/", authRoutes);

  app.use("*", (req, res) => {
    const errorObj = { pageTitle: "404 Not Found", error: "404 Not Found" };
    if (req.session && req.session.user)
      errorObj.themePreference = JSON.stringify(req.session.user.themePreference);
    res.render("error", errorObj);
    res.status(404);
    return;
  });
};

export default constructorMethod;
