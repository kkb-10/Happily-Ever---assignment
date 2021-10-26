const express = require('express');
const app = express();
require('./DB/connection');
require('dotenv').config();
const userRouter = require("./routes/userRoute");

const port = process.env.PORT || 3000;
const hostName = process.env.HOST || 'localhost';

app.use(express.json());

// middleware
app.use('/user',userRouter);


app.listen(port,()=>{
    console.log(`Server Running on http://${hostName}:${port}`);
})
