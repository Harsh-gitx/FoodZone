const axios=require('axios')
const db=require('./DB')
const userDetails=db.userDetails
const food=db.food
const cart=db.cart
const wishList=db.wishlist

let saveUser=(user)=>{
    //write code to insert to DB
    db.userDetails.create(user).then( (data)=>{
        console.log(data)
    }, (err)=>{
    })
}
let checkEmail=(email)=>db.userDetails.findOne({"email":email})

let login=(user)=>{
    let loadedUser=db.userDetails.find({email:user.email,password:user.password})
    if(loadedUser!=null)
        return true
    else
        return false
}

let checkIsActivated=(email)=>
    db.userDetails.find({"email":email},{_id:0,isActivated:1}).isActivated

let verfiyEmail=(key)=>
    db.userDetails.findOneAndUpdate({"key":key},{isActivated:true})

let getFoodDetails=()=>
    axios.get('https://raw.githubusercontent.com/Harsh-gitx/Zomato/master/menu.json')

let resetPassword=(email,otp,password)=>{
         db.userDetails.findOneAndUpdate({email:email,otp:otp},{password:password})
}
let addToCart=(productID,email)=>
    cart.findOneAndUpdate({email:email},{"$push":{productID:productID}})
let addToWishList=(productID,email)=>
    cart.findOneAndUpdate({email:email},{"$push":{productID:productID}})

module.exports={
    saveUser:saveUser,
    checkMail:checkEmail,
    login:login,
    checkIsActivated:checkIsActivated,
    verfiyEmail:verfiyEmail,
    getFoodDetails:getFoodDetails,
    resetPassword:resetPassword,
    addToCart:addToCart,
    addToWishList:addToWishList
}
