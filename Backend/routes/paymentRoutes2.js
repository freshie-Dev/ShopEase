// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.
const express = require('express');
const router = express.Router();
const stripe = require('stripe')("sk_test_51PIsNORtrR5OEeMFvqNdReTVFRg1ZtUA9K8hV1FPQAKEBzC4rzH33dplSeKaCeJGE4y08dLlGWtV35VWMas5dgGm00dzCBOlDB");

// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;
endpointSecret =  "whsec_e2f6ad3a189d64e82f250d8b2eec7cc04a7f32637c1e28e85c54ed0b8a22a4f4";

router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    const sig = request.headers['stripe-signature'];
    let data;
    let eventType;

    if (endpointSecret) {
        let event;
        try {
            event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
            console.log("Verified WEBHOOK")
        } catch (err) {
            console.log(`Webhook Error: ${err.message}`)
            response.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }
        data = event.data.object
        eventType = event.type
    } else {
        data = request.body.data.object
        eventType = req.body.type
    }

    //! Handle the event
    if (eventType === "checkout.session.completed") {
        stripe.customers.retrieve(data.customer)
            .then((customer) => {
                console.log("customer: ",customer)
                console.log("data: ",data)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    //* Return a 200 response to acknowledge receipt of the event
    response.send().end();
});

module.exports = router