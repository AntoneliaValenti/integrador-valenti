const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    products: {
        type:[
            {product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            }
            }
        ]
    },
    amount: {
        type: Number,
        default: 0,
      }
})

CartSchema.pre('findOne', function(){
    this.populate('products.product')
})

const Cart = mongoose.model('Carritos', CartSchema)

module.exports = Cart