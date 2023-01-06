const mongoose = require('mongoose');

const Products = mongoose.model('Products', {
    title: { type: String, required: true },
    image: {
        type: String,
        required: true,
        trim: true,
        default: ''
    },
    price: {
        type: String,
        default: '0.00',
        required: false,
        trim: true,

    },
    created_at: {
        type: Date,
        required: true,
        trim: true,
        default: ''
    }
});

module.exports = Products;
