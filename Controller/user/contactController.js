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
     console.log(req.body);
     res.status(200).json({success:true})
    }catch(err){
      console.log(err);
    }
  }


  module.exports = {
    contact,
    contactForm
  }