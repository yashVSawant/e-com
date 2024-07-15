const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{type:Schema.Types.String,require:true},
    price:{type:Schema.Types.Number,require:true},
    
})

module.exports = mongoose.model('product',productSchema);