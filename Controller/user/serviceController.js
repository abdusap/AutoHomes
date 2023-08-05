const { service1, service2, service3 } = require("../../StaticAsset/services")

const service= async (req, res) => {
    try{
      if(req.query.name){
        const serviceName=req.query.name
       if(serviceName=="Gate Automation"){
          const {name,description,imageCount}=service1
          res.render('../View/user/service.ejs',{name,description,imageCount})
       }else if(serviceName=="Lighting Control"){
        const {name,description,imageCount}=service2
        res.render('../View/user/service.ejs',{name,description,imageCount})
      }else if(serviceName=="Home Wifi"){
        const {name,description,imageCount}=service3
        res.render('../View/user/service.ejs',{name,description,imageCount})
      }else{
         next()
       }
      }
    }catch(error){
      console.log(error);
    }
  }



  module.exports = {
    service,
  }