const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

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

      // Creates a new user
      user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        })
        
      res.json(user)
          
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

module.exports = router