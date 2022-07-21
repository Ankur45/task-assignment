const router = require('express').Router();
const User = require('../controllers/userAuth');
const Users = new User();

router.post('/signUp', Users.createUser);
router.post('/signIn', Users.signinUser);
router.post('/getUserDetail', Users.getUserDetail);
router.post('/update', Users.updateData);
router.post('/logout', Users.logoutUser);
module.exports = router;
