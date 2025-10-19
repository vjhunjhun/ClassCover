const express = require("express");
const router = express.Router({mergeParams:true});
const Chat = require("../MODEL/chat.js");
const {chatSchema} = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Classbct = require("../MODEL/class.js");
const { isLoggedIn,validateChat, isReviewAuthor } = require("../middleware.js");
const chatController = require("../controller/chats.js");


//chat apis
//add chat 
router.post("/",isLoggedIn,validateChat,wrapAsync(chatController.postChat));
//delete chat
router.delete("/:chatId",isLoggedIn,isReviewAuthor,wrapAsync(chatController.destroyChat));

module.exports = router;