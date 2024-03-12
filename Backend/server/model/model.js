const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    ingredients:{
        required:true,
        type: Array
    },
    preptime:{
        required:true,
        type: Number
    },
    vegetarian:{
        required:true,
        type: Boolean
    },
    filters:{
        required:true,
        type: Array
    }
},{collection: 'recipes'})

module.exports = mongoose.model('recipes', dataSchema)