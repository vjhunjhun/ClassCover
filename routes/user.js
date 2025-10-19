const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {savedRedirectUrl, isLoggedIn, isOwner, isProfileOwner} = require("../middleware.js");
const userController = require("../controller/users.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage}); 
// const upload = multer({dest:"uploads/"}); 
router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup));

router.route("/login")
.get(userController.renderLoginForm)
.post(savedRedirectUrl,
    passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
    userController.login);
router.get("/logout",userController.logout);

router.get("/profile/:userId",isLoggedIn,isProfileOwner,wrapAsync(userController.showProfile));

router.get("/:userId/edit",wrapAsync(userController.renderProfileEditForm));
router.put("/:userId",upload.single("usr[image]"),wrapAsync(userController.updateUser));
module.exports = router;