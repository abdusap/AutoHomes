const cart = require("../../Model/cartModel");
const generateUniqueId = require("../../Utilities/generateUniqueId");

const product= async (req, res) => {
    try{
      console.log(req.cookies);
      const token= generateUniqueId()
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: true, // Only send over HTTPS
        sameSite: 'strict', // Restrict cookie to same-site requests
      });
             res.render('../View/user/product.ejs')
    }catch(error){
      console.log(error);
    }
  }


const addToCart=async (req,res)=>{
  try{
    if(req.cookies.userId){
      const {name,category} = req.body
      const token = req.cookies.userId
      const existingCartItem = await cart.findOne({
        userId: token,
        'cartItem.productName': name
      });
      if(existingCartItem==null){
        const newCartItem = {
          productName: name,
          category: category
        };
      
        await cart.updateOne(
          { userId: token },
          { $push: { cartItem: newCartItem } }
        );
        res.status(200).json({message:'Product Added Successfully'})
      }else{
       res.status(400).json({message:'Product Already in Cart..!'})
      }
    }else{
      const {name,category} = req.body
      const token=generateUniqueId()
      res.cookie('userId', token, {
        httpOnly: true,
        secure: true, // Only send over HTTPS
        sameSite: 'strict', // Restrict cookie to same-site requests
      });
      const cartData = new cart({
        userId: token,
        cartItem: [{
          productName:name,
          category:category
        }]
      });
      await cartData.save()
      res.status(200).json({message:'Product Added Successfully'})
    }
 
  }catch(error){
    console.log(error)
  }
}


  module.exports = {
    product,
    addToCart
  }