const service= async (req, res) => {
    try{
       res.render('../View/user/service.ejs')
    }catch(error){
      console.log(error);
    }
  }



  module.exports = {
    service,
  }