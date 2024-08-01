const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');    // to generate web token
const secretKey = 'User$ecretKey';  // jwt secret jey
const bcrypt = require('bcrypt');   // for encrypting passowrd

const { User } = require('../DB.js');
const { Product } = require('../DB.js');
const { Order } = require('../DB.js');
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
                otp: { code: otp, expiresAt: new Date(expirationTime * 1000) },
                address: {}
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

            console.log("password", Password)
            // Compare the provided password with the hashed password in the database
            const isPasswordValid = await bcrypt.compare(Password, user.password);
            console.log("password validation: ", isPasswordValid)
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

//! verify OTP
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
            const userAddressInfo = req.body;
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
            const updatedUserAddress = user.address;


            res.status(200).json({ message: 'Address saved successfully', success: true, updatedUserAddress });
        } catch (error) {
            console.log(error, 'Server error occurred while saving address');
            res.status(500).json({ error: 'Server error occurred', success: false, message: 'Server under maintenance' });
        }
    });

//! Route to get user address
router.route('/address').get(verifyToken, async (req, res) => {

    try {

        const user = await User.findById(req.userId);

        if (!user) {

            return res.status(404).json({ message: 'User not found' });

        }


        res.json({ success: true, message: 'Address fetched successfully', address: user.address });

    } catch (error) {

        console.log(error, 'Server error occurred while fetching address');

        res.status(500).json({ error: 'Server error occurred', success: false, message: 'Server under maintenance' });

    }

});

//! Route to delete a specific address
router.route('/delete_address/:addressId').delete(verifyToken, async (req, res) => {
    try {
        const { addressId } = req.params;
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the address by ID and remove it
        user.address = user.address.filter(address => address._id.toString() !== addressId);

        await user.save();
        res.status(200).json({ message: 'Address deleted successfully', success: true, updatedUserAddress: user.address });
    } catch (error) {
        console.log(error, 'Server error occurred while deleting address');
        res.status(500).json({ error: 'Server error occurred', success: false, message: 'Server under maintenance' });
    }
});

//! Route to save order by cash
// router.route('/add_order_by_cash')
//     .post(verifyToken, async (req, res) => {
//         try {
//             const userId = req.userId;  // Get user ID from verified token
//             const { addressId, cartItems } = req.body

//             const user = await User.findById(userId);
//             if (!user) {
//                 return res.status(404).json({ message: 'User not found' });
//             }
//             console.log(cartItems)
//             const order = {
//                 items: cartItems.map((item) => ({
//                     productId: item.productId,
//                     userId: item.userId,
//                     quantity: item.quantity,
//                     color: item.color,
//                     imageUrl: item.imageUrl,
//                     name: item.title,
//                     price: item.price,
//                 })),
//                 orderDate: Date.now(),
//                 selectedAddress: addressId,
//             };
//             // console.log(order)

//             user.orders.push(order);
//             await user.save();

//             res.json({ message: 'Order Successful!', result: true });
//         } catch (error) {
//             res.status(500).json({ message: 'Order Failed!', result: false });
//             console.log(error)
//         }
//     })
//! Route to save order by cash
router.route('/add_order_by_cash')
    .post(verifyToken, async (req, res) => {
        try {
            const userId = req.userId;  // Get user ID from verified token
            const { addressId, cartItems } = req.body

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            console.log(cartItems)
            // Group cart items by seller ID
            const sellerGroups = {};
            cartItems.forEach((item) => {
                if (!sellerGroups[item.userId]) {
                    sellerGroups[item.userId] = [];
                }
                sellerGroups[item.userId].push({
                    productId: item._id,
                    quantity: item.quantity,
                    color: item.color,
                    imageUrl: item.image,
                    name: item.title,
                    price: item.price,
                });
            });
            console.log("seller groups: ", sellerGroups)

            // Create orders for each seller
            for (const sellerId in sellerGroups) {
                const order = {
                    sellerId,
                    customerId: userId,
                    items: sellerGroups[sellerId],
                    orderDate: Date.now(),
                    selectedAddress: addressId,
                };
                let int = 1;
                console.log(int)
                console.log(order)
                // Save order to Orders collection 
                const newOrder = new Order(order);
                await newOrder.save();

                //? Add order to seller's orders array
                // const seller = await User.findById(sellerId);
                // if (seller) {
                //     seller.orders.push(newOrder._id);
                //     await seller.save();
                // }
            }

            res.json({ message: 'Order Successful!', result: true });
        } catch (error) {
            res.status(500).json({ message: 'Order Failed!', result: false });
            console.log(error)
        }
    })



//! Route to save order by card
router.route('/add_order_by_card')
    .post(verifyToken, async (req, res) => {
        try {
            const order = req.body;
            const userId = req.userId;  // Get user ID from verified token

            if (order.length === 0) {
                return res.status(400).json({ message: 'Order is empty', success: false });
            }
            // Create an array to hold the order items
            const orderItems = [];

            // Populate the order items with details from the Product model
            for (const item of order) {
                const product = await Product.findById(item._id);
                if (product) {
                    orderItems.push({
                        productId: product._id,
                        userId: product.userId,
                        quantity: item.quantity,
                        color: item.color,
                        imageUrl: product.imageUrl,
                        name: product.title,
                        price: product.price,
                    });
                }
            }

            // Find the user and add the order
            const user = await User.findById(userId);
            if (user) {
                user.orders.push({ items: orderItems });
                await user.save();
                res.status(200).json({ success: true, message: 'Order placed successfully', orders: user.orders });
            } else {
                res.status(404).json({ success: false, message: 'User not found' });
            }
        } catch (error) {
            console.error('Error while placing order:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    });

//! Route to fetch user customers
router.route('/customers')
    .get(verifyToken, async (req, res) => {
        try {
            const sellerId = req.userId;

            // Find all products by the seller
            const products = await Product.find({ userId: sellerId }).select('_id');
            // const productIds = products.map(product => product._id); // array of product id's
            const productIds = products.map(product => product._id.toString()); // Convert _id to strings
            console.log("product ids", productIds)

            // Find all users who have the seller's products in their cart or orders
            const customers = await User.find({
                $or: [
                    { 'cart.productId': { $in: productIds } },
                    { 'orders.items.productId': { $in: productIds } }
                ]
            }).select('username email phone address orders');




            let orderss = [];

            customers.map(customer => {
                orderss.push(customer.orders)
                return customer.orders.map(order => {
                    order.items.map(item => {
                        console.log(JSON.stringify(item.productId), JSON.stringify(productIds[0]), JSON.stringify(productIds[1]))
                        // console.log(/* true or false whether item.productId exists in  "const productIds"*/)
                        // console.log(JSON.stringify(item.productId) === JSON.stringify(productIds[1])) // gives true or false
                        console.log(productIds.includes(item.productId.toString())) // always gives false.
                    })
                    return
                })
            })

            // Filter orders to include only items uploaded by the seller
            const filteredCustomers = customers.map(customer => {
                const filteredOrders = customer.orders.map(order => {
                    const filteredItems = order.items.filter(item => productIds.includes(item.productId.toString()));
                    return { ...order._doc, items: filteredItems };
                });
                return { ...customer._doc, orders: filteredOrders };
            });

            res.status(200).json({ success: true, message: 'Customers fetched successfully', customers, filteredCustomers, productIds });
        } catch (error) {
            console.error('Error while fetching customers:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    });

//! Fetch orders for seller
router.route('/seller_orders')
    .get(verifyToken, async (req, res) => {
        try {
            const sellerId = req.userId;
            const orders = await Order.find({ sellerId: sellerId });

            const fetchedOrders = await Promise.all(orders.map(async (order) => {
                const customer = await User.findById(order.customerId);
                return {
                    _id: order._id,
                    customer: {
                        username: customer.username,
                        email: customer.email
                    },
                    items: order.items,
                    orderDate: order.orderDate,
                    selectedAddress: order.selectedAddress,
                    status: order.status
                };
            }));

            res.status(200).json({ success: true, message: 'Orders fetched successfully', fetchedOrders });
        } catch (error) {
            console.error('Error while fetching orders:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    });


//! Update order status
    router.put('/update_order_status/:orderId', async (req, res) => {
        try {
          const orderId = req.params.orderId;
          const statusValue = req.body.status;
      
          // Update the order status in the database
          const order = await Order.findByIdAndUpdate(orderId, { status: statusValue }, { new: true });
      
          if (!order) {
            return res.status(404).json({ message: 'Order not found' });
          }
      
          res.status(200).json({ message: 'Order status updated successfully', success: true });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error updating order status', success: false });
        }
      });

module.exports = router;