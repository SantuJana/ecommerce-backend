const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Draft','Published', 'Scheduled'],
        default: 'Draft',
        required: true,
    },
    visibility: {
        type: String,
        enum: ['Hidden','Public'],
        default: 'Hidden',
        required: true,
    },
    publishDateTime: {
        type: Date,
        default: new Date(),
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductCategory',
        required: true,
    },
    tags: {
        type: Array,
        required: false,
    },
    manufacturerName: {
        type: String,
        required: false,
    },
    metaTitle: {
        type: String,
        required: false,
    },
    metaKeywords: {
        type: String,
        required: false,
    },
    metaDescription: {
        type: String,
        required: false,
    },
}, { timestamps: true, })

module.exports = mongoose.model('Product', productSchema);