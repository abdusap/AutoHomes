const home= async (req, res) => {
    try{
       res.render('../View/user/home.ejs')
    }catch(error){
      console.log(error);
    }
  }



  module.exports = {
    home,
  }