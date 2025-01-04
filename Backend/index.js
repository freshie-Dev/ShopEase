const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

//! 4: User Route 
app.use('/payment', require('./routes/paymentRoutes.js'));
// app.use('/payment', require('./routes/paymentRoutes2.js'));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.get('/', (req,res) => {
  res.send("Hello World!")
})

//! 1: Product Route 
app.use('/products', require('./routes/productRoutes.js'));

//! 2: User Route 
app.use('/auth', require('./routes/userRoutes.js'));

//! 3: User Route 
app.use('/api/v1/dalle', require('./routes/imageGeneration.js'));


//! 5: Image route
// Serve static files from the 'upload/images' directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

let port = process.env.PORT;

app.listen(process.env.PORT || port, function() {
  console.log('Server started on port ' + (process.env.PORT || port));
});
// app.listen(port, function() {
//     console.log('Server started on port 3001');
//     });