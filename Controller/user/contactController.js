const nodemailer = require('nodemailer');
const cart = require("../../Model/cartModel")

const contact= async (req, res) => {
    try{

      let cartCount=null
      if(req.cookies.userId){
        let token=req.cookies.userId
        let userData=await cart.findOne({userId:token})
        cartCount=userData.cartItem.length
      }
      // res.clearCookie('userId', {
      //   path: '/', // Specify the path of the cookie you want to clear
      //   secure: true, // Only set if the cookie was originally set with the secure attribute
      //   sameSite: 'strict', // Match the sameSite attribute
      //   httpOnly: true, // Match the httpOnly attribute
      //   expires: new Date(0), // Set the cookie to expire immediately
      // });
       res.render('../View/user/contact.ejs',{cartCount})
    }catch(error){
      console.log(error);
    }
  }
  const contactForm= async (req, res) => {
    try{
     if(req.body){
      console.log(process.env.HOST);
      const {username,email,contact_message }= req.body
      // Create a Nodemailer transporter using the SendinBlue SMTP settings
const transporter = nodemailer.createTransport({
  host: process.env.HOST, // Replace with SendinBlue SMTP host
  port: 587,                         // SMTP port
  secure: false,                     // Use TLS
  auth: {
    user: process.env.USER,            // SMTP username
    pass: process.env.PASSWORD             // SMTP password or API key
  }
});

// Create email data
const mailOptions = {
  from: process.env.FROM, // Sender email address
  to:   process.env.TO, // Recipient email address
  subject: 'Contact Form submission', // Email subject
  // text: 'This is a test email sent from Node.js using SendinBlue SMTP.'
  html:`<table bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:800px" class="responsive-table">
  <tbody>
      <tr>
          <td>
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                      <td align="center" style="font-size:24px;color:#0e0e0f;font-weight:700;font-family:Helvetica Neue;line-height:28px;vertical-align:top;text-align:center;padding:35px 40px 0px 40px">
                          <strong>AutoHoms</strong>
                      </td>
                  </tr>
                  <tr>
                      <td class="content" style="font:16px/22px 'Helvetica Neue',Arial,'sans-serif';text-align:left;color:#555555;padding:40px 40px 0 40px">
                          <p style="font-size:16px">
                              Name : ${username}
                          </p>
                          <p style="font-size:16px">
                            Email : ${email}
                          </p>
                          <p style="font-size:16px">
                            Message : ${contact_message}
                          </p>
                      </td>
                  </tr>
          
              </table>
          </td>
      </tr>
      <tr>
          <td width="100%" align="center" valign="top" bgcolor="#ffffff" height="45"></td>
      </tr>
  </tbody>
</table>`
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
    res.status(400).json({message:'An error occurred. Please try again later.'})
  } else {
res.status(200).json({message:'You\'re all set! We\'ll get back to you shortly.'})
  }
});

     }else{
      res.status(400).json({message:'An error occurred. Please try again later.'})
     }
    }catch(err){
      console.log(err);
    }
  }


  module.exports = {
    contact,
    contactForm
  }




