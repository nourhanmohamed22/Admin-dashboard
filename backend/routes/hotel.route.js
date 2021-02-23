const express = require('express');
const app = express();
const hotelRoute = express.Router();

// Hotel model
let Hotel = require('../model/Hotel');

// Add Hotel
hotelRoute.route('/add-hotel').post((req, res, next) => {
  Hotel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all hotels
hotelRoute.route('/').get((req, res) => {
  Hotel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single hotel
hotelRoute.route('/read-hotel/:id').get((req, res) => {
  Hotel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update hotel
hotelRoute.route('/update-hotel/:id').put((req, res, next) => {
  Hotel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Hotel successfully updated!')
    }
  })
})

// Delete hotel
hotelRoute.route('/delete-hotel/:id').delete((req, res, next) => {
  Hotel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    } 
  })
})

module.exports = hotelRoute;