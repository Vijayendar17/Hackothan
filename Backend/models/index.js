import mongoose from "mongoose";
const UserSchema =new mongoose.Schema({
  name:{type:"string",required:"true",},
  email:{type:"string",required:"true",unique:true},
  password:{type:"string",required:"true"}
})

const UserModel = mongoose.model("User",UserSchema);
export default UserModel