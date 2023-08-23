const cart = require("../../Model/cartModel")
const nodemailer = require('nodemailer');


const cartPage= async (req, res) => {
    try{
      let cartData=null
      let cartCount=null
      if(req.cookies?.userId){
        let token=req.cookies.userId
      cartData= await cart.findOne({userId:token})
      cartCount=cartData.cartItem.length
      console.log(cartCount);
      res.render('../View/user/cart.ejs',{cartData,cartCount})
      }else{
        res.render('../View/user/cart.ejs',{cartData,cartCount})
      }
    }catch(error){
      console.log(error);
    }
  }

  const deleteItem= async (req, res) => {
   if(req.cookies.userId){
    let id=req.cookies.userId
    let itemId=req.body.id
    const updatedData = await cart.findOneAndUpdate(
      { userId: id, 'cartItem._id': itemId },
      {
          $pull: {
              cartItem: { _id: itemId }
          }
      },
      { new: true } // This option ensures that the updated document is returned
  );
  if(updatedData.cartItem.length==0){
      res.clearCookie('userId', {
        path: '/', // Specify the path of the cookie you want to clear
        secure: true, // Only set if the cookie was originally set with the secure attribute
        sameSite: 'strict', // Match the sameSite attribute
        httpOnly: true, // Match the httpOnly attribute
        expires: new Date(0), // Set the cookie to expire immediately
      });
  }
      res.status(200).json({message:'Product Removed Successfully.'})
   }else{
    res.status(400).json({message:'Something went wrong..!'})
   }
  }
  const cartSubmit= async (req, res) => {
try{
  if(req.cookies.userId){  
    if(req.body){
      const {name,email,mobile,contact_message}= req.body
        let token=req.cookies.userId
        let userData=await cart.findOne({userId:token})

        const products = userData.cartItem
  .map(obj => `<p style="font-size:16px">${obj.productName} - ${obj.category}</p>`)
  .join('\n');

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
        subject: 'Product & Service Estimation', // Email subject
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
                                    Name : ${name}
                                </p>
                                <p style="font-size:16px">
                                  Email : ${email}
                                </p>
                                <p style="font-size:16px">
                                  Email : ${mobile}
                                </p>
                                <p style="font-size:16px">
                                  Message : ${contact_message}
                                </p>
                            </td>
                        </tr>
                        <tr>
                        <td style="font:16px/22px 'Helvetica Neue',Arial,'sans-serif';text-align:left;color:#555555;padding:20px 20px 0 20px">
                        <p style="font-size:16px">
                        Products:-
                      </p>
                       ${products}
                    
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
          res.clearCookie('userId', {
            path: '/', // Specify the path of the cookie you want to clear
            secure: true, // Only set if the cookie was originally set with the secure attribute
            sameSite: 'strict', // Match the sameSite attribute
            httpOnly: true, // Match the httpOnly attribute
            expires: new Date(0), // Set the cookie to expire immediately
          });
      res.status(200).json({message:'You\'re all set! We\'ll get back to you shortly.',success:true})
        }
      });
        
     
      
    }else{
      res.status(400).json({message:'Details Not Exist!.'})    }
  }else{
    res.status(400).json({message:'No Product Exist For Estimation!'})
  }
}catch(err){
  console.log(err);
}
  }



  module.exports = {
    cartPage,
    deleteItem,
    cartSubmit
  }