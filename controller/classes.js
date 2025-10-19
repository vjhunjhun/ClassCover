const Classbct = require("../MODEL/class");

module.exports.renderIndex = async (req,res)=>{
    const classes = await Classbct.find({});
    res.render("classes/index.ejs",{classes});
};

module.exports.postClass = async (req,res,next)=>{
        let c = req.body.c;
    const newClass = new Classbct(c);
    if(!newClass.status){
        newClass.status="open";
    }
    newClass.createdBy = req.user._id;
    await newClass.save();
    req.flash("success","class created successfully");
    res.redirect("/classes");
    };

    module.exports.showClass = async (req,res)=>{
    let {id} = req.params;
    const c = await Classbct.findById(id).populate({path:"chats",
        populate:{path:"author",},
    }).populate("createdBy");
    console.log(c);
    if(!c){
        req.flash("error","class doesn't exist");
        res.redirect("/classes");
    }else{
        res.render("classes/show.ejs",{c});
    }
};

module.exports.updateClass = async (req,res)=>{
    let {id} = req.params;
    await Classbct.findByIdAndUpdate(id,{...req.body.c});
    req.flash("success","class created");
    res.redirect(`/classes/${id}`);
};

module.exports.destroyClass = async (req,res)=>{
    let {id}=req.params;
    await Classbct.findByIdAndDelete(id);
    req.flash("success","class deleted successfully");
    res.redirect("/classes");
};

module.exports.renderEditForm = async (req,res)=>{
     let {id} = req.params;
    const c = await Classbct.findById(id);
    if(!c){
        req.flash("error","class doesn't exist");
        res.redirect("/classes");
    }else{
        res.render("classes/edit.ejs",{c});
    }
};

module.exports.renderNewForm = (req,res)=>{
    res.render("classes/new.ejs");
};