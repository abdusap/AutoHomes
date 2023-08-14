const cart = require("../../Model/cartModel")

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
      await cart.updateOne({userId:id,'cartItem._id': itemId},{
        $pull: {
          cartItem: { _id: itemId }
        }
      })
      res.status(200).json({message:'Product Removed Successfully.'})
   }else{
    res.status(400).json({message:'Something went wrong..!'})
   }
  }

  module.exports = {
    cartPage,
    deleteItem
  }