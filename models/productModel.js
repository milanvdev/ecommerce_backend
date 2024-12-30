const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        stock: {type: Number, required: true},
        price: {type: Number, required: true},
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        image: {type: String},
        visibility: {
            type: String,
            enum: ['Publish', 'Scheduled', 'Hidden'],
            required: true,
        },
        visibilityDate: { type: Date, default: null },
        discount: {
            amount: {type: Number},
            startDate: {type: Date},
            endDate: {type: Date},
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model('Product', productSchema);
