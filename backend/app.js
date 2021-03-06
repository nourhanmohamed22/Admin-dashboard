let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  dataBaseConfig = require('./database/db');

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
  useNewUrlParser: true,
  useFindAndModify: false
}).then(() => {
    console.log('Database connected sucessfully ')
  },
  error => {
    console.log('Could not connected to database : ' + error)
  }
)

// Set up express js port
const restaurantRoute = require('./routes/restaurant.route')
const userRoute = require('./routes/user.route');
const hotelCategory = require('./routes/hotel-category.route')
const restaurantCategory= require('./routes/restaurant-category-route')
const hotelRoute = require('./routes/hotel.route')
const cruiseRoute=require('./routes/cruise.route')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

app.use("/images", express.static(path.join("images")));

// Setting up static directory
app.use(express.static(path.join(__dirname, 'public')));


// RESTful API root
    
app.use('/api/restaurant', restaurantRoute)
app.use('/api/hotel', hotelRoute)
app.use('/api/user', userRoute)
app.use('/api/hotelCategory', hotelCategory)
app.use('/api/restaurantCategory', restaurantCategory)
app.use('/api/cruise', cruiseRoute) 
/* // PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('Connected to port ' + port)
}) */

// Find 404 and hand over to error handler
/* app.use((req, res, next) => {
  next(createError(404));
});
 */
// Index Route
/* app.get('/', (req, res) => {
  res.send('invaild endpoint');
}); */

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','index.html'));
});


// error handler 
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});


module.exports=app;