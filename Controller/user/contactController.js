const contact= async (req, res) => {
    try{
      res.clearCookie('userId', {
        path: '/', // Specify the path of the cookie you want to clear
        secure: true, // Only set if the cookie was originally set with the secure attribute
        sameSite: 'strict', // Match the sameSite attribute
        httpOnly: true, // Match the httpOnly attribute
        expires: new Date(0), // Set the cookie to expire immediately
      });
       res.render('../View/user/contact.ejs')
    }catch(error){
      console.log(error);
    }
  }



  module.exports = {
    contact,
  }