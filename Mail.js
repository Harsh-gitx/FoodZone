const mailer=require('nodemailer');

let mail=mailer.createTransport(
    {
        service:'gmail',
        auth:{
            user:'harsha.m19x@gmail.com',
            pass:'P@ssword@123'
        }
    }
)

const options={
    from:'Harsha.m19x@gmail.com',
    to:'raghu@gmail.com',
    subject:'Email verification',
    text:'url'
}
let sendMail=(to,key)=>{
    options.to=to
    options.text="http://localhost:3000/verifyEmail?id="+key
    mail.sendMail(options,(err, data)=>{
    console.log('email sent')
})
}
let sendOTP=(email,otp)=>{
    options.to=email
    options.text=`This is your OTP to reset the password ${otp}`
    mail.sendMail(options,(err,data)=>{
        console.log('OTP sent')
    })
}

module.exports={
    sendMail:sendMail,
    sendOTP:sendOTP
}


