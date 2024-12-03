//Here you will import route files and export the constructor method as shown in lecture code and worked in previous labs.
import authRoutes from "./auth_routes.js";

const constructorMethod = (app) => {
  app.use("/", authRoutes);

  app.use("*", (_, res) => {
    res.render("error", { pageTitle: "404 Not Found", error: "404 Not Found" });
    res.status(404);
    return;
  });
};

export default constructorMethod;
