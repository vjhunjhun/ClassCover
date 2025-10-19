const user = require("../MODEL/user.js");
module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup = async(req,res)=>{
    try{
    let {username,email,password} = req.body;
    const newUser = new user({email,username});
    const registeredUser = await user.register(newUser,password);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","welcome to classCover");
    res.redirect("/classes");
    });
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async(req,res)=>{
    req.flash("success","welcome to CoverClass,you are logged in");
    let redirectUrl = res.locals.redirectUrl || "/classes";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","user successfully logged-out");
        res.redirect("/classes");
    })
};

module.exports.showProfile =async (req,res)=>{
    let {userId} = req.params;
    const reqUser = await user.findById(userId);
    res.render("users/profile.ejs",{reqUser});
};

module.exports.renderProfileEditForm = async (req,res)=>{
    let {userId} = req.params;
    const reqUser = await user.findById(userId);
    res.render("users/edit.ejs",{reqUser});
};

module.exports.updateUser = async (req,res)=>{
    let {userId} = req.params;
    let url = req.file.path;
    let filename = req.file.filename;
    let usr = req.body.usr;
    usr.image = {url,filename};
    await user.findByIdAndUpdate(userId,usr);
    req.flash("success","profile updated");
    res.redirect(`/profile/${userId}`);
    // const reqUser = await user.findById(userId);
    // res.render("users/edit.ejs",{reqUser});
};