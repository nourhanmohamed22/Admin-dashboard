const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Hotel = new Schema({
    name:{
    type: String
  },
  booking:{
      type: Array
  },
  map: {
    type: String
  },
  Pricedeals: {
    type: Array
  },
  rooms: {
    type: Number
  },
  images: {
    type: Array
  },
 deals: {
    type: Array
  },
  amenities: {
    type: Array
  },
  class:{
    type: Number
  },
  distance: {
    type: Object
  },
  reviews: {
    type: Array
  },
  rating:{
      type:Array
  },
  style:{
    type:Array
},
languageSpoken:{
    type:Array
}
}, {
  collection: 'restaurants'
})

module.exports = mongoose.model('Restaurant', Restaurant)