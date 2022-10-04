const profile = require('express').Router();
const profileController = require('../controller/profile');
const {body} = require('express-validator');
const validation = require('../middleware/validation');
const uploadFile = require('../middleware/upload');
const auth = require('../middleware/auth');

const userSchema = [
  body('username').notEmpty().isAlphanumeric().escape().isLength({min:5}),
  body('email').notEmpty().isEmail().withMessage('Wrong Email Format').escape(),
]

profile.get('/profile',auth,profileController.getProfile);
profile.patch('/profile',auth,uploadFile,...userSchema,validation,profileController.editProfile);

module.exports = profile