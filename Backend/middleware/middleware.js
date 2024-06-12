const nodemailer = require('nodemailer');   // for sending otp to user emails

const jwt = require('jsonwebtoken');
const secretKey = 'User$ecretKey';  // jwt secret jey

const verifyToken = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('token');
    console.log("this is token", token);
    if (!token) {
        res.status(401).send({ error: "Token does not exist" })
    }
    try {
        const data = jwt.verify(token, secretKey);
        req.userId = data.userId;
        next();
    } catch (error) {
        console.log("invalid token or token expired")
        res.json({message: "Invalid Token", tokenStatus: false})
    }

}

const generateOTP = ()=> {
    const otpLength = 6;
    const otp = Math.floor(Math.pow(10, otpLength - 1) + Math.random() * 9 * Math.pow(10, otpLength - 1));
    const expirationTime = Math.floor(Date.now() / 1000) + 300; // 5 minutes

    return { otp, expirationTime };
}

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "ahmadrafaqat1122@gmail.com",
        pass: "pmjn iwka aouw nuhn",
    },
});



module.exports = {
    transporter,
    generateOTP,
    verifyToken
};
