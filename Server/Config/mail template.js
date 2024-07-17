function generatePasswordResetEmailTemplate(first_name, otp ,senderMail, _id) {
    const template = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Password Retrieval</title>
          <style>
            /* CSS Styling for the email template */
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f4f4f4;
              font-size: 16px;
            }
            h2 {
              color: #333333;
              text-align: center;
            }
            .message {
              margin-top: 30px;
              padding: 20px;
              background-color: #ffffff;
              border: 1px solid #dddddd;
            }
            .btn {
              display: inline-block;
              background-color: #4caf50;
              color: #ffffff;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 3px;
            }
            .outline{
              font-size: 20px
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>NTDS 📩</h2>
            <div class="message">
              <p>Dear ${first_name},</p>
              <p>We have recieved your request to change your password, please enter this OTP to complete action <br></br>
             <span style={{text-color:red}}> ${otp}</span></p>
          
              <p>Best regards 😊,<br/><i>Reset Password</i></p>
              
            </div>
          </div>
        </body>
        </html>   
      `

    return template;
  }

  

 export default generatePasswordResetEmailTemplate
