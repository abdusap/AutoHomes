const home= async (req, res) => {
    try{
      console.log(req.cookies);
       res.render('../View/user/home.ejs')
    }catch(error){
      console.log(error);
    }
  }



  module.exports = {
    home,
  }