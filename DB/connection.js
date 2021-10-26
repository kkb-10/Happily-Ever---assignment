const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.URI;

mongoose.connect(URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(()=> {
    console.log('DB has been connected..');
})
.catch((err)=>{
    console.log("DB connection error: ",err);
});
