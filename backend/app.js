const connectToMongo=require('./db');
const express=require('express');
const cors=require('cors');
connectToMongo();



const app=express();
app.use(cors());
const port=5000;
app.use(express.json());
app.get('/',(req,res)=>{
res.send("hii kaif");
});

//Avaiable routes
app.use('/register',require('./routes/register'));
app.use('/market',require('./routes/market'));


app.listen(port,() =>{
 console.log(`server is listen at port${port}`);
})