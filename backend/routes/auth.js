const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Arpitisagoodb$oy';

// Creating User using: POST "/api/auth/createuser". No Login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password length must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res)=>{
    // If there are errors, return bad request & errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Check whether the user with same email exists already
    try {

      let user = await User.findOne({email: req.body.email}); 
      if (user){
        return req.status(400).json({error: "Sorry a user with this email already exists"})
      }

      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);

      // Creates a new user
      user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
        });

      const data = {
        user:{
          id: user.id
        }
      }
      const authToken = jwt.sign(data,  JWT_SECRET);
      
      // res.json(user)
      res.json({authToken})
          
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Authenticate User using: POST "/api/auth/login". No Login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res)=>{  
  // If there are errors, return bad request & errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if (!user){
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare){
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }

    const data = {
      user:{
        id: user.id
      }
    }
    const authToken = jwt.sign(data,  JWT_SECRET);
    res.json({authToken})
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router