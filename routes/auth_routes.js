//import express, express router as shown in lecture code

router.route('/').get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({error: 'YOU SHOULD NOT BE HERE!'});
});

router
  .route('/signupuser')
  .get(async (req, res) => {
    //code here for GET
  })
  .post(async (req, res) => {
    //code here for POST
  });

router
  .route('/signinuser')
  .get(async (req, res) => {
    //code here for GET
  })
  .post(async (req, res) => {
    //code here for POST
  });

router.route('/user').get(async (req, res) => {
  //code here for GET
});

router.route('/administrator').get(async (req, res) => {
  //code here for GET
});

router.route('/signoutuser').get(async (req, res) => {
  //code here for GET
});
