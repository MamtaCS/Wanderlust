let mongoose=require('mongoose');
const initData=require('./data.js');
const listing=require("../models/listing.js");

async function main(){
     await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
        
    }
    main().then((res)=>{
        console.log("Database connection successful");
    }).catch((err)=>{
        console.log(err);
    });
const initDB=async ()=>{
    await listing.deleteMany({});
   initData.data= initData.data.map((obj)=>({...obj, owner:"6a3a54422b5ac8a2136583c5"}))
    await listing.insertMany(initData.data);
    console.log("Data was initialized");
}

initDB();