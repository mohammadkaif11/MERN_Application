const mongoose=require('mongoose');
const {Schema}=mongoose;
const MarketSchema= new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
  },
  tittle:{
      type:String,
      requird:true
    },
     description:{
        type:String,
        requird:true,
    },
      tag:{
        type:String,
        default:"Genral"
      },
      date:{
        type:Date,
        default:Date.now
      },
//bill:{
//       type:Array
//  }
});

const Market=mongoose.model('market',MarketSchema);
module.exports= Market;
