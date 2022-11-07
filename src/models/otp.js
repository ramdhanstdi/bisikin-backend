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

exports.editOtpModel = async(data) => {
  const results = {};
  try {
    const findotp = await prisma.otp.findMany({
      where: {
        number: parseInt(data.number),
        AND: {
          isUsed: false
        }
      }
    })
    if(!findotp){
      return results.error = new Error('OTP has been Used')
    }
    const otp = await prisma.otp.update({
      where: {
        id: findotp[0].id,
      },
      data: {
        isUsed: true,
      }
    })
    results.data = otp;
    return results;
  } catch (error) {
    console.log(error);
    results.error = error;
    return results;
  }
}