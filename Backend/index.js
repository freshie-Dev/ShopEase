const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req,res) => {
  res.send("Hello World!")
})

//? We have 2 routes

//! 1: Product Route 
app.use('/products', require('./routes/productRoutes.js'));

//! 2: User Route 
app.use('/auth', require('./routes/userRoutes.js'));


//! 3: Image route
// Serve static files from the 'upload/images' directory
console.log(__dirname)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

let port = process.env.PORT;

if (port == null || port == "") {
  port = 3002;
}

app.listen(process.env.PORT || port, function() {
  console.log('Server started on port ' + (process.env.PORT || port));
});
// app.listen(port, function() {
//     console.log('Server started on port 3001');
//     });