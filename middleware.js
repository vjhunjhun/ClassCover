const Chat = require("./MODEL/chat");
const Classbct = require("./MODEL/class");
const User = require("./MODEL/user");
const { classSchema, chatSchema } = require("./schema");
const ExpressError = require("./utils/ExpressError");

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be logged-in");
        return res.redirect("/login");
    }
    next();
};

module.exports.savedRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req,res,next)=>{
      let {id} = req.params;
    let reqclass = await Classbct.findById(id);
    if(!reqclass.createdBy._id.equals(res.locals.currUser._id)){
        req.flash("error","you are not authorized");
        return res.redirect(`/classes/${id}`);
    }
    next();
};

module.exports.validateClass = (req,res,next)=>{
    let result = classSchema.validate(req.body);
    if(result.error){
        let errMsg = result.error.details.map((el)=>el.message).join(",");
        //console.log(errMsg);
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};
module.exports.isReviewAuthor = async (req,res,next)=>{
      let {id,chatId} = req.params;
    let reqRev = await Chat.findById(chatId);
    if(!reqRev.author._id.equals(res.locals.currUser._id)){
        req.flash("error","you are not authorized to delete the review");
        return res.redirect(`/classes/${id}`);
    }
    next();
};

module.exports.validateChat = (req,res,next)=>{
    let result = chatSchema.validate(req.body);
    if(result.error){
        let errMsg = result.error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

module.exports.isProfileOwner = async (req,res,next)=>{
      let {userId} = req.params;
    let reqUser = await User.findById(userId);
    if(!reqUser._id.equals(res.locals.currUser._id)){
        req.flash("error","you are not authorized");
        return res.redirect(`/classes`);
    }
    next();
};