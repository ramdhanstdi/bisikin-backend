const response = require('../helpers/standardResponse');
const otpModels = require('../models/otp');

exports.createOtp = async(req,res) => {
  const number = Math.floor(100000 + Math.random() * 900000);
  const otp = await otpModels.createOtpModel({number});
  return response(res, 'Number OTP',otp.data);
};

exports.editOtp = async(req,res) => {
  const otp = await otpModels.editOtpModel(req.body);
  if(otp.error){
    return response(res, 'Wrong OTP, or OTP has been Used', null, null, 400)
  }
  return response(res, 'OTP Success', otp.data);
};