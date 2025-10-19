const mongoose = require("mongoose");
const {Schema} = mongoose;

const chatSchema = new Schema({
    msg:String,
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
});
const Chat = mongoose.model("Chat",chatSchema);
module.exports = Chat;