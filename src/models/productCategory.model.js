const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    image: {
        type: String,
        required: false,
    },
    sequence: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        required: true,
        default: 'active',
    },
}, { timestamps: true, })

productCategorySchema.pre('save', async function (  ){
    this.slug = this.name.replace(' ', '-').toLowerCase();
})
productCategorySchema.pre(['updateOne', 'findOneAndUpdate'], function ( category ){
    category.slug = category.name.replace(' ', '-').toLowerCase();
})

module.exports = mongoose.model('ProductCategory', productCategorySchema);