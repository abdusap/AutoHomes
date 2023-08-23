const cart = require("../../Model/cartModel")

const home= async (req, res,next) => {
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
    }catch(error){
      console.log(error);
      next(error)
    }
  }


const errorPage= async (req, res) => {
try{
  res.render('../View/user/error.ejs')

}catch(err){
  console.log(err);
}
  }

  module.exports = {
    home,
    errorPage
  }