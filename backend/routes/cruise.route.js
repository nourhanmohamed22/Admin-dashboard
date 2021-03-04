const express = require('express');
const multer = require("multer");
const app = express();
const cruiseRoute = express.Router();
let Cruise = require('../model/Cruise');


//add cruise
cruiseRoute.post('/add-cruise', (req, res, next) => {
    //const url = req.protocol + '://' + req.get('host')
   const cruise = new Cruise({
     // _id: new mongoose.Types.ObjectId(),
     //images:url + '/images/' + req.files.filename,
     shipName:req.body.shipName,
 price:req.body.price,
 discount:req.body.discount,
 sailingDate:req.body.sailingDate,
 departureMonth:req.body.departureMonth,
 days:req.body.days,
 whereTo:req.body.whereTo,
 departsFrom:req.body.departsFrom,
 activities:req.body.activities,
 entertainment:req.body.entertainment,
 dining:req.body.dining,
 travelers:req.body.travelers,
 shipInfo:req.body.shipInfo


   });
   cruise.save().then(result => {
     console.log(result);
     res.status(201).json({
       message: "data saved successfully!",
         id: result._id
       
     })   
   })
 });

 // Get all cruises
cruiseRoute.route('/').get((req, res) => { 
    Cruise.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })

  // Get single cruise
cruiseRoute.route('/read-cruise/:id').get((req, res) => {
    Cruise.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })

  // Update cruise
cruiseRoute.route('/update-cruise/:id').put((req, res, next) => {
    Cruise.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        console.log(error)
        return next(error);
      } else {
        res.json(data)
        console.log('Cruise successfully updated!')
      }
    })
  })

  // Delete cruise
cruiseRoute.route('/delete-cruise/:id').delete((req, res, next) => {
    Cruise.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      } 
    })
  })
  
  module.exports = cruiseRoute;