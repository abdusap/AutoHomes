const cart= async (req, res) => {
    try{
       res.render('../View/user/cart.ejs')
    }catch(error){
      console.log(error);
    }
  }



  module.exports = {
    cart,
  }