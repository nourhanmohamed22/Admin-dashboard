const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Cruise = new Schema({
shipName:{
    type:String
},
price:{
    type:Number
},
discount:{
    type:Number
},
sailingDate:{
    type:Date
},
departureMonth:{
    type:String
},
activities:{
    type:Array
},
entertainment:{
    type:Array
},
dining:{
    type:Array
},
images:{
    type:Array
},
days:{
    type:Number
},
whereTo:{
    type:String
},
travelers:{
    type:Array
},
shipInfo:{
    type:Array
},
departsFrom:{
    type:String
},
reviews:{
    type:Array
},
rating:{
    type:Array
},
booking:{
    type:Array
}

}, {
    collection: 'Cruise'
  })

  module.exports = mongoose.model('Cruise', Cruise)