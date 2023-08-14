const cart = require("../../Model/cartModel")
const { service1, service2, service3 } = require("../../Utilities/services")

const service= async (req, res) => {
    try{
      let cartCount=null
      if(req.cookies.userId){
        let token=req.cookies.userId
        let userData=await cart.findOne({userId:token})
        cartCount=userData.cartItem.length
      }
      if(req.query.name){
        const serviceName=req.query.name
       if(serviceName=="Gate Automation"){
          const {name,description,imageCount}=service1
          res.render('../View/user/service.ejs',{name,description,imageCount,cartCount})
       }else if(serviceName=="Lighting Control"){
        const {name,description,imageCount}=service2
        res.render('../View/user/service.ejs',{name,description,imageCount,cartCount})
      }else if(serviceName=="Home Wifi"){
        const {name,description,imageCount}=service3
        res.render('../View/user/service.ejs',{name,description,imageCount,cartCount})
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