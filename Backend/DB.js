// Setting up mongoose in a different file:
const mongoose = require('mongoose');
const { Schema } = mongoose;

const options = {
    useNewUrlParser: true,
    family: 4 // Use IPv4, skip trying IPv6
};

const connectToMongoDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://dbUser:admin123@cluster0.dk70mwt.mongodb.net/EcommerceDB-remastered', options);
        console.log('Connected to MongoDB')

    } catch (error) {
        console.log(error, 'Error connecting to MongoDB')
    }
}
connectToMongoDB();


//! Creating a schema for the product:
const productSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId, // Assuming you're using ObjectId for unique IDs
        ref: 'User', // Reference to your User schema/collection
        // required: true
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: String, // You may want to use a numeric type if price is expected to be a number
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        // required: true
    },
    uniqueIdentifier: {
        type: String,
        // required: true
    },
    customizable: {
        type: Boolean
    },
    customizedProductSize: {
        type: String
    },
    savedBackendImage: {
        type: String
    },
    savedBackendImageName: {
        type: String
    },
    attributes: [
        {
            id: {
                type: Number,
                required: true,
            },
            colorName: {
                type: String,
                required: true,
            },
            size: [
                {
                    sizeId: {
                        type: Number,
                        required: true,
                    },
                    sizeName: {
                        type: String,
                        required: true,
                    },
                    stock: {
                        type: Number,
                        required: true,
                    },
                },
            ],
        },
    ],
    categories: {
        type: [String], // Assuming categories is an array of strings
        required: true,
    },
});

//! Creating a schema for user:
const userSchema = new Schema({
    username: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },
    usertype: {
        type: String,
        // required: true
    },
    phone: {
        type: String,
        // required: true
    },
    address: [{
        area: String,
        city: String,
        zip_code: String,
        email: String,
        customerName: String,
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    cart: [{
        productId: {
            type: Schema.Types.ObjectId, // Assuming you're using ObjectId for unique IDs
            ref: 'Product', // Reference to your Product schema/collection
            // required: true
        },
        quantity: {
            type: Number,
            // required: true
        },
        color: {
            type: String,
        }

    }],
    orders: [{
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            quantity: {
                type: Number,
            },
            color: {
                type: String,
            },
            imageUrl: {
                type: String,
            },
            name: {
                type: String,
            },
            price: {
                type: Number,
            }
        }],
        orderDate: {
            type: Date,
            default: Date.now
        },
        selectedAddress: {
            type: Schema.Types.ObjectId,
            ref: 'address'
        }
    }],
    otp: {
        code: {
            type: Number,
            default: null,
        },
        expiresAt: {
            type: Date,
            default: null,
        },
    },
});

const orderSchema = new mongoose.Schema({
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        color: {
          type: String
        },
        imageUrl: {
          type: String
        },
        name: {
          type: String
        },
        price: {
          type: Number,
          required: true
        }
      }
    ],
    orderDate: {
      type: Date,
      default: Date.now
    },
    selectedAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'hipped', 'delivered', 'cancelled'],
      default: 'pending'
    }
  });



//! Creating a model for the product:
const Product = mongoose.model('Product', productSchema);
//! Creating a model for the user:
const User = mongoose.model('User', userSchema);
//! Creating a model for the Orders:
const Order = mongoose.model('Order', orderSchema);


module.exports = { Product, User, Order };