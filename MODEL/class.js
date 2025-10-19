const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Chat = require("./chat.js");
const classSchema = new Schema({
    subject:{
        type:String,
        required:true,
    },
    originalTeacher:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    room:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["open","claimed","completed","cancelled"],
        required:true,
    },
    claimedBy:{
        type:String,
    },
    chats:[
        {
            type:Schema.Types.ObjectId,
            ref:"Chat"
        }
    ,],
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});
classSchema.post("findOneAndDelete",async(data)=>{
    if(data){
        await Chat.deleteMany({_id:{$in:data.chats}});
    }
});
const Classbct = mongoose.model("Classbct",classSchema);
module.exports=Classbct;
//Classes: subject, originalTeacher, time, room, status, claimedBy
// Users: name, email, role, department, specializations
// ClaimHistory: classId, teacherId, timestamp, feedback