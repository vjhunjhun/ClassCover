const express = require("express");
const router = express.Router();
const Classbct = require("../MODEL/class.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateClass } = require("../middleware.js");
const classesController = require("../controller/classes.js");




router.route("/")
.get(wrapAsync(classesController.renderIndex))
//create route
.post(isLoggedIn,validateClass,wrapAsync(classesController.postClass));

//new route
router.get("/new",isLoggedIn,classesController.renderNewForm);

//show route
router.route("/:id")
.get(wrapAsync(classesController.showClass))
//update route
.put(isLoggedIn,isOwner,validateClass,wrapAsync(classesController.updateClass))
.delete(isLoggedIn,isOwner,wrapAsync(classesController.destroyClass));
//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(classesController.renderEditForm));

module.exports = router;