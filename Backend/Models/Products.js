const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema(
    {
        ProductName: {
            type: String,
            required: true,
        },
        ProductPrice: {
            type: Number,
            required: true,
        },
        ProductBarcode: {
            type: String,
            required: true,
            unique: true  // This ensures the barcode is unique in the database
        },
    });

const Products = mongoose.model("Products", ProductSchema)
module.exports = Products;
