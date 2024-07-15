const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{type:Schema.Types.String,require:true,unique: true},
    password:{type:Schema.Types.String,require:true},
})

module.exports = mongoose.model('user',userSchema);