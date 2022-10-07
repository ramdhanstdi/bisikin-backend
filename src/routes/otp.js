const otp = require('express').Router();
const otpController = require('../controller/otp');

otp.post('/otp',otpController.createOtp);
otp.patch('/otp',otpController.editOtp);

module.exports = otp;