const { Router } = require('express');
const router = Router();
const {
    renderSignUpForm,
    singup,
    renderSigninForm,
    signin,
    logout,
    middlewareSignIn
} = require('../controllers/users.controller')

// Routes
router.get("/users/signup", renderSignUpForm);

router.post("/users/signup", singup);
//
router.get("/users/signin", renderSigninForm);

router.post("/users/signin", signin, middlewareSignIn);
//
router.get("/users/logout", logout);

module.exports = router;