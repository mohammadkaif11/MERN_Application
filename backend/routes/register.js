const express=require('express');
const router=express.Router();
const Register=require('../modules/Register')
const { body, validationResult } = require('express-validator');
const fetchuser=require('../middleware/fetch')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken'); 
const JWT_SECRET="kAIFMH@#$"

//add request
router.post('/singup',[
    body('name','enter valid name').isLength({min:5}),
    body('email','enter valid email').isEmail(),
    body('password','endter valid password').isLength({ min: 7 })
],async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
     let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    
    try {
      let register= await Register.findOne({email:req.body.email});
      if(register){
        return res.status(400).json({ success,error:"user already exits with same email"})
      }
    const salt= await bcrypt.genSalt(10);
    const securepass=await bcrypt.hash(req.body.password,salt);
      register = await  Register.create({
       name:req.body.name, 
       email: req.body.email,
      password:securepass,
     //  password:req.body.password,
     })
     const data={
       register:{
       id:register.id
       }
     } 
     //console.log(data)
     const jwttoken=jwt.sign(data,JWT_SECRET);
    // console.log(jwttoken); 
     success=true;
     res.send({success,register,jwttoken});
    } catch (error) {
    //  console.log(error.message);
       res.status(500).send("some error occured")
    }
     });  
//login
router.post('/login',[
    body('email','enter valid email').isEmail(),
    body('password','password cannot be blank').exists()
    ], async (req, res) => {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let register= await Register.findOne({email:req.body.email}); 
      let success=false;
      if(!register){
        return res.status(400).json({sucess:false,error:"please try to login with correct credintial"})
      }
      const passwordcampare= await bcrypt.compare(req.body.password,register.password);
      if(!passwordcampare){
        return res.status(400).json({sucess:false,error:"please try to login with correct credintial"})
      }
     const data={
       user:{
       id:register.id
       }
     }   
     success=true;
     const jwttoken=jwt.sign(data,JWT_SECRET); 
      res.send({success,jwttoken});
    } catch (error) {
      console.log(error.message);
       res.status(500).send("some error occured")
    }
    });
    
    router.post('/getuser',fetchuser,async (req,res)=>{
        try {
      const userid=req.user.id;
      const register=await Register.findById(userid).select("-password");
      res.send(register)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured")                
    }
    })

module.exports=router;
