const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type : String
    },
    name : {
        type : String
    },
    dateOfBirth : {
        type : Date
    },
    status : {
        type : String
    }
});

const User = mongoose.model('User',userSchema);
module.exports = User;