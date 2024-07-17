import nodemailer from 'nodemailer';
import generatePasswordResetEmailTemplate from "../Config/mail template.js"



let transporter=nodemailer.createTransport({
 
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user:  process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },   
    // tls: {
    //   rejectUnauthorized: false
    // }
  });

const sendMailService = (senderMail, recieverMail, first_name, id, cb, otp)=>{

  const mailOptions = {
    from: senderMail,
    to: recieverMail,
    subject: "Password Retrieval",
    first_name: first_name,
    html: generatePasswordResetEmailTemplate(first_name, otp),
   
  };
 


   transporter.sendMail(mailOptions, function (err,data) {
      if (err) { 
        cb(err, null);
        console.log(err);
       }else{
        cb(null, data);
       }
   })

}

export default sendMailService