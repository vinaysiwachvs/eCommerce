const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000 ;
const dbConnect = require('./config/dbconnect') 
const bodyParser = require("body-parser");
const authRouter = require('./routes/auth_routes');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());


app.use('/api/user',authRouter);

app.get('/',(req,res)=>{
    res.send("hello from server side")
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
