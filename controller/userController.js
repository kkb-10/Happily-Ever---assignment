const User = require('../model/user');

module.exports= {

    createProfile : async (req,res)=>{
        try{
            const {email,name,dateOfBirth} = req.body;
            const searchEmail = await User.findOne({email : email});
            if(searchEmail){
                return res.send({"message" : "User already Exists!, Try different email."});
            }
            let user = {};
            user.email = email;
            user.name = name;
            user.dateOfBirth = new Date(dateOfBirth);
            user.status = 'ACTIVATE';
            let userModel = new User(user);
            await userModel.save();
            res.json(userModel);
            console.log('User Created!');
        }
        catch(error){
            console.log("Error: ",error);
            res.json(error);
        }
    },

    listAllProfiles : async (req,res) =>{
        try {
            const allProfiles = await User.find();
            const result = allProfiles.map(profile => {
                return {
                    email: profile.email , 
                    name: profile.name ,
                    dateOfBirth: profile.dateOfBirth,
                    status: profile.status
                }
            })
            return res.send(result);
        } 
        catch (error) {
            console.log("Error: ",error);
            res.json(error);
        }
    },

    listPausedProfiles : async (req,res) => {
        try{
            const allProfiles = await User.find({status : 'PAUSED'});
            const result = allProfiles.map(profile => {
                return {
                    email: profile.email , 
                    name: profile.name ,
                    dateOfBirth: profile.dateOfBirth,
                    status: profile.status
                }
            })
            return res.send(result);
        }
        catch(error){
            console.log("Error: ",error);
            res.json(error);
        }
    },

    pauseProfile : async (req,res) => {
        try{
            const email = req.params.email;
            const updateStatus = await User.findOneAndUpdate({email : email},{status : 'PAUSED'},{new :true});
            if(!updateStatus){
                return res.send({"message" : "Email doesn't exists!"});
            }
            console.log('Paused a profile!');
            res.json(updateStatus);
        }
        catch(error){
            console.log("Error: ",error);
            res.json(error);
        }
    },

    activateProfile : async (req,res) => {
        try{
            const email = req.params.email;
            const updateStatus = await User.findOneAndUpdate({email : email},{status : 'ACTIVATE'},{new :true});
            if(!updateStatus){
                return res.send({"message" : "Email doesn't exists!"});
            }
            console.log('Activated a profile!');
            res.json(updateStatus);
        }
        catch(error){
            console.log("Error: ",error);
            res.json(error);
        }
    },

    deleteProfile : async (req,res) =>{
        try{
            const email = req.params.email;
            const searchEmail = await User.findOne({email : email});
            if(!searchEmail){
                return res.send({"message" : "User doesn't exists!, Try different email."});
            }
            const deletedProfile = await User.deleteOne({email : email});
            console.log('Deleted a profile!');
            res.json({
                message : "Deleted a profile",
                email: email
            });
        }
        catch(error){
            console.log("Error: ",error);
            res.json(error);
        }
    }
};