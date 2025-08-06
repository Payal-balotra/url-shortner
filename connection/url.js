const mongoose = require("mongoose");


const connection = async ()=>{
    try{

        await mongoose.connect("mongodb+srv://payal:payal@payalcluster.vmhzb4x.mongodb.net/urls");
        console.log("connection esatblished!")
    }catch(err){
        console.log("connection failed",err.message);
        process.exit(1);
    }

}

module.exports = connection;