const express = require('express');
const multer = require("multer");
const app = express();
const restaurantRoute = express.Router();

// Restaurant model
let Restaurant = require('../model/Restaurant');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "./images"); 
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
}); 

///multer({ storage: storage }).single("imageUrls"),
   
// POST Restaurant
restaurantRoute.post('/add-restaurant', (req, res, next) => {
  // const url = req.protocol + '://' + req.get('host')
  const restaurant = new Restaurant({
    //_id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    address:req.body.address,
    contact:req.body.contact,
    descripation:req.body.descripation,
    features:req.body.features,
    Establishment:req.body.Establishment,
    meals:req.body.meals,
    Pricerange:req.body.Pricerange,
    cuisine:req.body.cuisine,
dishes:req.body.dishes,
DietaryRestrictions:req.body.DietaryRestrictions,
goodFor:req.body.goodFor,
imageUrls:req.body.imageUrls
    // imageUrls: url + '/images/' + req.file.filename,
  

  });
  restaurant.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "data saved successfully!",
        id: result._id
      
    })   
  })
})
//Add Restaurant
// restaurantRoute.route('/add-restaurant')
// .post(multer({ storage: storage }).single("image_path"), (req, res, next) => {
 
//   Restaurant.create(req.body, (error, data) => {
//     if (error) {
//       //return next(error) ;
//       console.log(`upload.single error: ${error}`);
//       return res.sendStatus(500);
//     } else { 
//       res.json(data) 
//     }       
//   })     
// });

// Get all restaurant
// restaurantRoute.get("/", (req, res, next) => {
//   Restaurant.find().then(data => {
//     res.status(200).json({
//       message: "Users retrieved successfully!",
//       restaurants: data
//     });
//   });
// });
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
