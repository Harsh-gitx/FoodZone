const mongoose=require('mongoose')
const schema=mongoose.Schema
mongoose.connect('mongodb://localhost/FoodDB')
let quackSchema=new schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    phone:{
        type:Number
    },
    isActivated:{
        type:Boolean
    },
    address:{
        type:String
    },
    key:{
        type:String
    },
    otp:{
        type:String
    },
    gender:{
        type:String
    }
});
console.log(mongoose)

let product=new schema({
    name:{
        type:String
    },
    price:{
        type:Number
    },
    type:{
        type:String
    },
    quantity:{  
        type:Number
    }
})
let cartSchema=new schema({
    email:{
        type:String
    },
    productID:{
        type:Array
    }
})

let wishlistSchema=new schema({
    email:{
        type:String
    },
    productID:{
        type:[Number]
    }
})
module.exports ={            
                food:mongoose.model("Food",product),
                userDetails:mongoose.model("UserDetails",quackSchema),
                cart:mongoose.model("cart",cartSchema),
                wishlist:mongoose.model("wishlist",wishlistSchema)
}
