const  express = require('express');
const User = require('../model/user');
const userController = require('../controller/userController');

const router = express.Router();

router.post('/createProfile',userController.createProfile);
router.get('/listAllProfiles',userController.listAllProfiles);
router.get('/listPausedProfiles',userController.listPausedProfiles);
router.patch('/pauseProfile/:email',userController.pauseProfile);
router.patch('/activateProfile/:email',userController.activateProfile);
router.delete('/deleteProfile/:email',userController.deleteProfile);

module.exports = router;