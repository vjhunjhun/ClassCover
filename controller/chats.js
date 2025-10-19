const Chat = require("../MODEL/chat");
const Classbct = require("../MODEL/class");

module.exports.postChat = async(req,res)=>{
    let {id} = req.params;
    let selClass = await Classbct.findById(id);
    let newChat = new Chat(req.body.chat);
    newChat.author=req.user._id;
    selClass.chats.push(newChat);
    await newChat.save();
    await selClass.save();
    console.log("chat saved");
    req.flash("success","new chat created");
    res.redirect(`/classes/${id}`);
};

module.exports.destroyChat = async(req,res)=>{
    let {id,chatId} = req.params;
    await Classbct.findByIdAndUpdate(id,{$pull:{chats:chatId}});
    await Chat.findByIdAndDelete(chatId);
    req.flash("success","chat deleted");
    res.redirect(`/classes/${id}`);
}