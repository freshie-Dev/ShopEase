const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');    // to generate web token
const secretKey = 'User$ecretKey';  // jwt secret jey
const bcrypt = require('bcrypt');   // for encrypting passowrd

const { User } = require('../DB.js');
const { Product } = require('../DB.js');
const { transporter, generateOTP, verifyToken } = require('../middleware/middleware.js'); // middle functions

const stripe = require('stripe')("sk_test_51PIsNORtrR5OEeMFvqNdReTVFRg1ZtUA9K8hV1FPQAKEBzC4rzH33dplSeKaCeJGE4y08dLlGWtV35VWMas5dgGm00dzCBOlDB");


//! sign up signup
router.route('/')
    .post(async (req, res) => {
        try {
            const { Username, Password, usertype, Email } = req.body;


            console.log('Sending email to:', Email, Username, usertype);

            const existingUser = await User.findOne({ username: Username });
            if (existingUser) {
                return res.status(400).json({ message: 'Username already taken' });
            }

            const { otp, expirationTime } = generateOTP();
            const mailOptions = {
                from: "ahmadrafaqat1122@gmail.com",
                to: Email, // Use the email from req.body
                subject: "SHOPEASE - OTP for registration",
                html: `Your OTP is <h1>${otp}</h1>`,
            };

            await transporter.sendMail(mailOptions);

            // Hash the password before saving to the database
            const hashedPassword = await bcrypt.hash(Password, 10);

            const user = new User({
                username: Username,
                email: Email,
                password: hashedPassword,
                usertype,
                otp: { code: otp, expiresAt: new Date(expirationTime * 1000) }
            });
            await user.save();

            // Generate a JWT token
            const token = jwt.sign({ userId: user._id }, secretKey);

            res.send({ user, token, success: true, message: 'OTP sent to your Email for verification' });
        } catch (error) {
            console.log(error, 'Server error occurred while creating a new user');
            res.status(500).json({ error: 'Server error occurred', success: false, message: 'Server under maintenance' });
        }
    });
//! login log in signin sign in
router.route('/login')
    .post(async (req, res) => {
        try {
            const { Username, Password } = req.body;
            // Find the user by username
            const user = await User.findOne({ username: Username });

            // Check if the user exists
            if (!user) {
                return res.status(404).json({ message: 'Incorrect Credentials' });
            }

            // Compare the provided password with the hashed password in the database
            const isPasswordValid = bcrypt.compare(Password, user.password);

            // Check if the password is valid
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Incorrect Credentials' });
            }

            // Generate a JWT token for the authenticated user
            const token = jwt.sign({ userId: user._id }, secretKey);

            res.json({ user, token, success: true, message: 'Login successful' });
        } catch (error) {
            console.log(error, 'Server error occurred while processing the login request');
            res.status(500).json({ error: 'Server error occurred', success: false, message: 'Server under maintenance' });
        }
    });
//! token verify
router.route('/verifytoken')
    .get(verifyToken, (req, res) => {
        console.log("verifying Token running")
        res.send({ message: "Token Verified", tokenStatus: true })
    });
//! update username update password
router.route('/updateinfo')
    .put(verifyToken, async (req, res) => {
        const { password, username } = req.body;
        console.log(password)
        console.log(username)

        const user = await User.findOne({ _id: req.userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }


        try {
            if (password) {
                // Implement password update logic here
                // For example, hash the new password and update it in the database
                const { otp, expirationTime } = generateOTP();
                console.log("this is otp", otp)
                user.otp = { code: otp, expiresAt: new Date(expirationTime * 1000) }; // Convert seconds to milliseconds

                await user.save();
                // const mailOptions = {
                //     from: "ahmadrafaqat1122@gmail.com",
                //     to: user.email, // this will be taken from user from req.body
                //     subject: "SHOPEASE - OTP for password change",
                //     html: `Your OTP is <h1>${otp}</h1>`
                //   };

                // await transporter.sendMail(mailOptions);
                res.status(200).json({ message: "OTP send to your Mail", otp, otpSent: true });

            } else if (username) {

                user.username = username;
                await user.save();
                // Send a success response
                res.json({ message: 'Username updated successfully', user, otpSent: false });
            } else {
                res.status(200).json({ message: "Username already exists" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

router.route('/verifyotp')
    .post(verifyToken, async (req, res) => {

        const { tempPassword, OTP } = req.body;
        console.log(OTP)
        console.log(tempPassword)
        const enteredOTP = parseInt(OTP, 10);

        const user = await User.findOne({ _id: req.userId });

        if (!user) {
            res.status(404).json({ message: "User does not exist." });
        }


        if (user.otp && JSON.stringify(user.otp.code) === JSON.stringify(enteredOTP) && user.otp.expiresAt > Math.floor(new Date().getTime() / 1000)) {

            // user.otp = undefined;
            const hashedNewPassword = await bcrypt.hash(tempPassword, 10);

            user.password = hashedNewPassword;
            await user.save();

            return res.status(200).json({ message: 'OTP verified successfully', status: true });

        } else {
            return res.status(400).json({ message: 'Incorrect OTP or OTP expired', status: false });
        }


    })

//! Route to save user address information

router.route('/save_address')
    .post(verifyToken, async (req, res) => {
        try {
            const userAddressInfo  = req.body;
            // console.log(req.body)

            const user = await User.findById(req.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Add the new address to the user's address array

      user.address.push({
        area: userAddressInfo.area,
        city: userAddressInfo.city,
        zip_code: userAddressInfo.zip_code,
        email: userAddressInfo.email,
        customerName: userAddressInfo.customerName,
      });

            await user.save();

            res.status(200).json({ message: 'Address saved successfully', success: true });
        } catch (error) {
            console.log(error, 'Server error occurred while saving address');
            res.status(500).json({ error: 'Server error occurred', success: false, message: 'Server under maintenance' });
        }
    });

//! Route to save order
router.route('/add_order')
    .post(async (req, res) => {
      try {
        const { productsData } = req.query;
        const productsDataParsed = JSON.parse(productsData);
        const { sessionId } = req.body;
        const session = await stripe.checkout.sessions.retrieve(sessionId);
  
        if (session.payment_status === 'paid') {
  
          // add product to order table
  
          const newOrder = {
            items: productsDataParsed.map((item, index) => ({
              productId: item._id,
              quantity: item.quantity,
              color: item.color,
              imageUrl: item.imageUrl,
              name: item.name,
              price: item.price,
              brand: item.brand,
            })),
            paymentIntentId: session.payment_intent,
            status: 'paid',
            orderDate: new Date(),
          };
          const user = await User.findById(req.userId);
          user.orders.push(newOrder);
          await user.save();
  
          res.json({ success: true, message: 'Payment Successful' });
        } else {
          res.json({ success: false, message: 'Payment Unsuccessful' });
        }
      } catch (error) {
        console.error('Error while Payment Procedure:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    });
module.exports = router;