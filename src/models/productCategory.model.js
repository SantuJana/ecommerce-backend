const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: false,
    },
}, { timestamps: true, })

productCategorySchema.pre('save', function ( category ){
    category.slug = category.name.replace(' ', '-').toLowerCase();
})
productCategorySchema.pre(['updateOne', 'findOneAndUpdate'], function ( category ){
    category.slug = category.name.replace(' ', '-').toLowerCase();
})

module.exports = mongoose.model('ProductCategory', productCategorySchema);