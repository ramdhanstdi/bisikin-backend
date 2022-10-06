const response = require('../helpers/standardResponse');
const errorResponse = require('../helpers/errorResponse');
const otpModels = require('../models/otp');

exports.createOtp = async(req,res) => {
  const number = Math.floor(100000 + Math.random() * 900000);
  const otp = await otpModels.createOtpModel({number});
  return response(res, 'Number OTP',otp);
}