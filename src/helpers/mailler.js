const nodemailer = require('nodemailer');

const emailSetting = {
  services: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
}

exports.sendToEMail = async(data) => {
  const transporter = nodemailer.createTransport(emailSetting)
  const results = {};
  try {
    const sent = await transporter.sendMail({
      from: emailSetting.auth.user,
      to: data.email,
      subject: 'Bisikin OTP Verification',
      html:`
        <div class="container" style="max-width: 90%; margin: auto; padding-top: 20px">
          <h2>Welcome to the Bisikin.</h2>
          <h4>You are be our family</h4>
          <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
          <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${data.OTP}</h1>
        </div>
      `
    })
    console.log(sent);
    results.success = sent
    return results;
  } catch (error) {
    console.log(error);
    results.error = error;
    return results;
  }
};