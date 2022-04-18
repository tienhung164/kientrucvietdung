const nodemailer = require('nodemailer')
const GMAIL_USERNAME = process.env.GMAIL_USERNAME
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD


async function sendM(_to,_subject,_text) {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pallgree.dev@gmail.com', 
      pass: 'fpt16042001', 
    },
  });


  let info = await transporter.sendMail({
    from: '"Pallgree Shop" <do-not-reply@pallgree.io>', // sender address
    to: _to, // list of receivers
    subject: _subject, // Subject line
    text: _text, // plain text body
  });

}


 

module.exports= {sendM}

//  sendM("hungvt164@gmail.com",'Pallgree xin gửi OTP xác minh tài khoản',"123123").then(data => console.log(data))
//                                                                  .catch(e => console.log(e))