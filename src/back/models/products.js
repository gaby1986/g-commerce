const mongoose = require('mongoose');
const {Schema} = mongoose

const ProductoSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, require: true},
    price: {type: Number, require: true}
});

module.exports = mongoose.model('Product', ProductoSchema)