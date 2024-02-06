const mongoose = require('mongoose');

const productVariantSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    stock: {
        type: Number,
        required: true,
    },
    stockUnit: {
        type: String,
        required: true,
    },
    mrp: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },
    price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },
    sequence: {
        type: Number,
        required: true,
    },
})