const express=require('express')

const DAO=require('./DAO')
const router =express.Router()
const mail=require('./Mail');
let OTP=""
let generateKey=()=>{
    let key=""
    let alphabets=["A","b","c","D","E","f","g","H","i"]
    for(let i=0;i<10;i++){
        if(i%2==0)
            key+=alphabets[Math.floor(Math.random()*10)]
        else
         key+=Math.floor(Math.random()*10)
    }
    return key
}

router.post("/register",(req,res)=>{
    const user=req.body
    user.isActivated=false
    let key=generateKey();
    mail.sendMail(key)
    user.key=key
    console.log(user)
    DAO.saveUser(user)
    res.send("success")
})
router.get('/verifyEmail',(req,res)=>{
    let key=req.query.id;
    DAO.verfiyEmail(key).then(data=>res.send("Account Activated please login"))
})
router.get('/checkEmail',(req,res)=>{
    DAO.checkMail(req.query.email).then(data=>res.send(true))
})
router.post('/login',(req,res)=>{
    let user=req.body
    if(DAO.checkIsActivated(user.email))
        if(DAO.login(user))
             res.send({"data":"success"})
        else res.send( {"data":"Invalid credentials"}) 
    else
        res.send( {"data":"Please verify your Email ID before Login !! "})
})

let generateOTP=()=>{
    for(i=0;i<6;i++){
            OTP+=Math.floor(Math.random()*9)
    }
    return OTP
}

router.get('/forgotPassword', (req,res)=>{
    let email=req.query.email;
    let otp=generateOTP()
    mail.sendOTP(email,otp)
    res.send("OTP sent please check your mail")
})

router.get('/verifyOTP',(req,res)=>{
let email=req.query.email
let data=req.body
let otp=data.otp
let password=data.password
DAO.resetPassword(email,otp,password).then(data=>res.send("success"),res.send("Enter a valid OTP"))
});

//Get Products
router.get('/getProducts',(req,res)=>DAO.getFoodDetails().then(resp=>res.send(resp.data)))

router.get('/checkMailExists',(req,res)=>{
     let email= req.query.email
    DAO.checkMail(email).then( (data)=>{
            data==null?res.send("Valid Email ID")
            :res.send("EMail ID Already exists")
    })
})

router.post("/addToCart",(req,res)=>{
    let productID=req.body
    let email=req.email
    DAO.addToCart(productID,email).then(data=>res.send("success"))
})

router.post("/addToWishList",(req,res)=>{
    let productID=req.body
    let email=req.email
    DAO.addToCart(productID,email).then(data=>res.send("success"))
})

module.exports=router