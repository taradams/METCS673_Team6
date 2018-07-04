var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');


//routes directory
var indexRouter = require('./routes/index');

//define app using express
const app = express();

//set port
const port = process.env.PORT || 5000;

// configure app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));



//use sessions for tracking logins
app.use(session({
  secret: 'guglielmo maccheroni',
  resave: true,
  saveUninitialized: false
}));

//use router
app.use('/api', indexRouter);

//test api
app.get('/', (req, res) => {
  res.send('API working!');
});




//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://elmodev_user:1h7f5KLPEhVn@ds123151.mlab.com:23151/elmodb_dev';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// catch 404
app.use((req, res, next) => {
  res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});


//start server
app.listen(port, () => console.log(`Listening on port ${port}`));


