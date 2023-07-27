const contact= async (req, res) => {
    try{
       res.render('../View/user/contact.ejs')
    }catch(error){
      console.log(error);
    }
  }



  module.exports = {
    contact,
  }