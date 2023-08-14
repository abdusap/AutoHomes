const cart = require("../../Model/cartModel")

const home= async (req, res) => {
    try{
      let cartCount=null
      if(req.cookies.userId){
        let token=req.cookies.userId
        let userData=await cart.findOne({userId:token})
        cartCount=userData.cartItem.length
        res.render('../View/user/home.ejs',{cartCount})

      }else{
        res.render('../View/user/home.ejs',{cartCount})

      }
      console.log(req.cookies);
    }catch(error){
      console.log(error);
    }
  }



  module.exports = {
    home,
  }