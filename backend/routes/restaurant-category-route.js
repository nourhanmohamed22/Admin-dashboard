const express = require('express');
const RestaurantCategoryRoute = express.Router();
let RestaurantCategory = require('../model/Restaurant-category')

//Get restaurant categories
RestaurantCategoryRoute.route('/').get((req, res) => { 
    RestaurantCategory.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
  
  module.exports = RestaurantCategoryRoute;