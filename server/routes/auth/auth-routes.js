const express = require('express');
const { registerUser , loginUser ,logout , authMiddleware} = require('../../controller/auth/auth-controller');

const router = express.Router()

router.post('/signup' , registerUser);
router.post('/login' , loginUser);
router.get('/logout' , logout); 
router.get('/checkauth',authMiddleware , (req , res) => {
  const user = req.user;
  res.status(200).json({
    success : true,
    message :"autenticated user!" ,
    user
})
})
module.exports = router;