const response = require('../helpers/standardResponse');
const errorResponse = require('../helpers/errorResponse');
const otpModels = require('../models/otp');
const { sendMail } = require('../helpers/mailler');
const otpMaker = require('./otp');
const userModels = require('../models/users');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.registerAccount = async (req, res) => {
  try {
    const results = await userModels.createUsersModel(req.body);
    if (results.error) {
      console.log(results.error);
      return errorResponse(results.error, res)
    }
    const token = jwt.sign({ id: results.data.user_id }, process.env.APP_KEY || 'k4Aul4h');
    const number = Math.floor(100000 + Math.random() * 900000);
    const otp = await otpModels.createOtpModel({ number });
    sendMail({ user: req.body.email, OTP: otp, method: 'register' });
    return response('Register Successfully Check Email for OTP', { token })
  } catch (error) {
    return errorResponse(error, res)
  }
};

exports.loginUser = async (req, res) => {
  try {
    const results = await userModels.getUserByEmail(req.body.email);
    if (results.error) {
      return errorResponse(results.error, res);
    }
    if (results.data.length < 1) {
      return response(res, 'Wrong Email or Password', null, null, 400);
    }
    const user = results.data
    const number = Math.floor(100000 + Math.random() * 900000);
    const otp = await otpModels.createOtpModel({ number });
    bcrypt.compare(req.body.password, user[0].password)
      .then((cpres) => {
        if (cpres) {
          sendMail({ user: user[0].email, OTP: otp.data.number, method: 'login' });
          const token = jwt.sign({ id: user[0].id, email: user[0].email}, process.env.APP_KEY || 'k4Aul4h');
          return response(res, 'Login Success', { token })
        }
        return response(res, 'Wrong Email or Password', null, null, 400)
      })
      .catch((e) => {
        return response(res, 'Wrong Email or Password', null, null, 400)
      })
  } catch (err) {
    return errorResponse(err, res)
  }
};