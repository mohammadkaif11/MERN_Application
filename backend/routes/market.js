const express=require('express');
const router=express.Router();
const Market=require('../modules/Market')
const { body, validationResult } = require('express-validator');
const fetchuser=require('../middleware/fetch')
//const bcrypt=require('bcryptjs');
//const jwt=require('jsonwebtoken'); 
//const JWT_SECRET="kAIFMH@#$"

//get
router.get('/getitem',fetchuser,async (req,res)=>{
  const data=await Market.find({user:req.user.id})
   res.json(data);
 });

//postrequest 
router.post('/additem',fetchuser,[
    body('tittle','enter valid tittle').isLength({min:4}),
    body('description','Descriptin is atleat 5 character').isLength({min:5})
  ],
  async (req,res)=>{
    const {tittle ,description,tag,bill}=req.body;
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    try {
      const market= new Market({
        tittle,tag,description,user:req.user.id,bill
      })
      const savedata= await market.save();
      res.send(savedata);
      console.log(savedata);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured")                
    }
   });

   //update
   router.put('/updateitem/:id',fetchuser,async(req,res)=>{
    try {
      const {tittle,description,tag}=req.body;  
      const newdata={}
      if(tittle){newdata.tittle=tittle}
      if(description){newdata.description=description}
      if(tag){newdata.tag=tag} 
      let data= await Market.findById(req.params.id)
    if(!data){
    return res.status(404).send("note found");
    }
    if(data.user.toString() !== req.user.id){
    //  console.log(note.user.toString());
    // console.log(req.params.id);
      return res.status(401).send("NOt allwoed");
    }
    data= await Market.findByIdAndUpdate(req.params.id,{$set:newdata},{new:true});
    res.json(data);
    } catch (error) {-
      console.log(error.message);
      res.status(500).send("some error occured")               
  }
   });

//delete data
   router.delete('/deleteitem/:id',fetchuser,async(req,res)=>{
    try {
      let data= await Market.findById(req.params.id)
    if(!data){
    return res.status(404).send("note found");
    }
    if(data.user.toString() !== req.user.id){
          //console.log(note.user.toString());
          // console.log(req.params.id);
      return res.status(401).send("NOt allwoed");
    }
    data= await Market.findByIdAndDelete(req.params.id);
    res.json({delte:"note is delete"});
    } catch (error) {-
      console.log(error.message);
      res.status(500).send("some error occured")               
  }
   })

  

module.exports=router;
