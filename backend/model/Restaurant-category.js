const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RestaurantCategory = new Schema({
    Establishment:{
        type:Array
    } ,
    features:{
        type:Array
    },
    meals:{
        type:Array
    },
    Pricerange:{
        type:Array
    },
    cuisine:{
        type:Array
    },
    dishes:{
        type:Array
    },
    DietaryRestrictions:{
        type:Array
    },
    goodFor:{
        type:Array
    }

},{
    collection: 'Resturant Category'
  })
  module.exports = mongoose.model('RestaurantCategory', RestaurantCategory)