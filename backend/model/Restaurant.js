const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Restaurant = new Schema({
    name:{
    type: String
  },
  imageUrls: {
    type:Array
  },
  address: {
    type: Object
  },
  contact: {
    type: Object
  },
  descripation: {
    type: Object
  }, 
Establishment: {
    type: Array
  },
  features: {
    type: Array
  },
  meals: {
    type: Array
  },
  Pricerange:{
      type:mongoose.Schema.Types.ObjectId
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
},
reviews:{
  type:Array
},
rating:{
  type:Array
},
likes:{
  type:Array
}

}, {
  collection: 'Resturant'
})

module.exports = mongoose.model('Restaurant', Restaurant)