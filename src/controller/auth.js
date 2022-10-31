const response = require('../helpers/standardResponse');
const errorResponse = require('../helpers/errorResponse');
const otpModels = require('../models/otp');
const otpSender = require('../helpers/mailler');
const otpMaker = require('./otp');
const userModels = require('../models/users');
const jwt = require('jsonwebtoken')

exports.registerAccount = async (req,res) => {
  try {
    const results = await userModels.createUsersModel(req.body);
    if(results.error){
      console.log(results.error);
      return errorResponse(results.error,res)
    }
    const token = jwt.sign({id: results.data.user_id}, process.env.APP_KEY || 'k4Aul4h');
    console.log(token);
    const otp = otpMaker.createOtp();
    const sending = await otpSender.sendToEMail({user: req.body.email, OTP: otp});
    console.log(sending);
    return response('Register Successfully Check Email for OTP', {token})
  } catch (error) {
    return errorResponse(error,res)
  }
};

exports.loginUser = async (req,res) => {
  try {
    const results = await userModels.getUserByEmail(req.body.email);
    if(results.error){
      return errorResponse(results.error,res);
    }
    if(results.data.length < 1){
      return response(res, 'Wrong Email or Password', null, null, 400);
    }
    const user = results.data
    const number = Math.floor(100000 + Math.random() * 900000);
    const otp = await otpModels.createOtpModel({number});
    otpSender.sendMail({user :user[0].email, OTP: otp.data.number},(err,res)=>{
      if(err){
        console.log(err);
        return errorResponse(err,res);
      }else{
        console.log(res);
        console.log('sent');
      }
    });
    bcrypt.compare(req.body.password,user[0].password)
      .then((cpres)=>{
        if(cpres){
          const token = jwt.sign({id: user[0].id}, process.env.APP_KEY || 'k4Aul4h');
          return response(res, 'Login Success', {id: user[0].id, token})
        }
        return response(res, 'Wrong Email or Password', null, null, 400)
      })
      .catch((e)=>{
        return response(res, 'Wrong Email or Password', null, null, 400)
      })
  } catch (err) {
    return errorResponse(err,res)
  }
};

exports.confirmOTP = async(req,res) => {
  try {
    const results = await otpMaker.editOtp(req.body);
    return results
  } catch (error) {
    return error
  }
};