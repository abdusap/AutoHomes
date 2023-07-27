const product= async (req, res) => {
    try{
       res.render('../View/user/product.ejs')
    }catch(error){
      console.log(error);
    }
  }



  module.exports = {
    product,
  }