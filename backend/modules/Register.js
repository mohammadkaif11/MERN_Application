const mongoose=require('mongoose');
const {Schema}=mongoose;

const RegisterSchema= new Schema({
    name:{
      type:String,
      requird:true
    },
     email:{
        type:String,
        requird:true,
        unique:true  
    },
      password:{
        type:String,
        requird:true
      },
      date:{
        type:Date,
        default:Date.now
      }
});
const Register=mongoose.model('registeruser',RegisterSchema);
module.exports= Register;