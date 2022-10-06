const prisma = require('../helpers/prisma');

exports.createOtpModel = async(data) =>{
  const results = {}
  try {
    const otp = await prisma.otp.create({
      data
    })
    results.data = otp;
    return results;
  } catch (error) {
    console.log(error);
    results.error = error;
    return results;
  }
};