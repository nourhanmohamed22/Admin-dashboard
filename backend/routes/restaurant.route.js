const express = require('express');
const app = express();
const restaurantRoute = express.Router();

// Restaurant model
let Restaurant = require('../model/Restaurant');

// Add Restaurant
restaurantRoute.route('/add-restaurant').post((req, res, next) => {
  Restaurant.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all restaurant
restaurantRoute.route('/').get((req, res) => {
  Restaurant.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single restaurant
restaurantRoute.route('/read-restaurant/:id').get((req, res) => {
  Restaurant.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update restaurant
restaurantRoute.route('/update-restaurant/:id').put((req, res, next) => {
  Restaurant.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Restaurant successfully updated!')
    }
  })
})

// Delete restaurant
restaurantRoute.route('/delete-restaurant/:id').delete((req, res, next) => {
  Restaurant.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    } 
  })
})

module.exports = restaurantRoute;