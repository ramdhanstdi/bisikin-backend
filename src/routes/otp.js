const otp = require('express').Router();
const otpController = require('../controller/otp');

otp.post('/otp',otpController.createOtp);

module.exports = otp;