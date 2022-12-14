const users = require('express').Router();
const authController = require('../controller/auth');
const {body} = require('express-validator');
const bcrypt = require('bcrypt');
const validation = require('../middleware/validation');

const userSchema = [
  body('username').notEmpty().isAlphanumeric().escape().isLength({min:5}),
  body('email').notEmpty().isEmail().withMessage('Wrong Email Format').escape(),
  body('password').notEmpty().isLength({min:8}).withMessage('Password Must be min 8 character').escape()
    .customSanitizer(async(val)=>{
      const hash = await bcrypt.hash(val, 10);
      return hash;
    }),
]

users.post('/register',...userSchema,validation,authController.registerAccount);
users.post('/login',userSchema[1],validation,authController.loginUser);

module.exports = users;