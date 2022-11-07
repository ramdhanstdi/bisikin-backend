const nodemailer = require('nodemailer');

const MAIL_SETTINGS = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
}

const transporter = nodemailer.createTransport(MAIL_SETTINGS);

exports.sendMail = (data, cb) => {
  let mailOptions = {}
  if(data.method==='login'){
    mailOptions = {
      from: MAIL_SETTINGS.auth.user,
      to: data.user,
      subject: 'OTP Bisikin',
      html: `
        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >
            <h2>Hey this is your OTP to continue login</h2>
            <h4>Type this OTP on your OTP screen</h4>
            <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
            <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${data.OTP}</h1>
        </div>
        `,
    }
  } else {
    mailOptions = {
      from: MAIL_SETTINGS.auth.user,
      to: data.user,
      subject: 'OTP Bisikin',
      html: `
        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >
            <h2>Welcome to Bisikin.</h2>
            <h4>Now your is our member</h4>
            <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
            <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${data.OTP}</h1>
        </div>
        `,
    }
  }
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      cb(err)
    } else {
      cb(err, info)
    }
  });
};