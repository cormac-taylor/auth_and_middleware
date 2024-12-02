import { Router } from "express";
const router = Router();

router.route("/").get(async (req, res) => {
  return res.json({ error: "YOU SHOULD NOT BE HERE!" });
});

router
  .route("/signupuser")
  .get(async (req, res) => {
    //code here for GET
  })
  .post(async (req, res) => {
    //code here for POST
  });

router
  .route("/signinuser")
  .get(async (req, res) => {
    //code here for GET
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
