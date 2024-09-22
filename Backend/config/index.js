import mongoose from "mongoose";
function Connect(params) {
  mongoose.connect(process.env.Mongo_db).then(function(){
    console.log("Connected to MongoDB");
  }).catch(function(err){
    console.log("Could not connect to MongoDB");
    console.log(err);
  });

}

export default Connect;
