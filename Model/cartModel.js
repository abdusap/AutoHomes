let mongoose = require('mongoose')

let cartSchema=new mongoose.Schema({
    userId : {
        type: String
    },
    cartItem : [{
        productName:{
            type:String,
        },
        category:{
            type:String,
        }
    }]
    
})

let cart=mongoose.model('cart',cartSchema)

module.exports=cart