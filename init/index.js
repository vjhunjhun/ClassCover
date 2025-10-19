const mongoose = require("mongoose");
const initData = require("./data.js");
const Classbct = require("../MODEL/class.js");

const MONGO_URL="mongodb://127.0.0.1:27017/college";

main().then(()=>{
    console.log("connected to db");
}).catch(err=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
};
const initDB= async ()=>{
    await Classbct.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,createdBy:"68e54882816775709a645606"}));
  await Classbct.insertMany(initData.data); 
  console.log("data was initialized");  
};
initDB();