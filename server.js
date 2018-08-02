var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var cors = require('cors')
const socketIO = require('socket.io');

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
app.use(cors());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client','build')));



//use sessions for tracking logins 
app.use(session({
  secret: 'guglielmo maccheroni',
  resave: false,
  saveUninitialized: false
}));

//use router
app.use('/api', indexRouter);

//test api

app.get('/api', (req, res) => {
  res.send('API working!');
}); 




//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://elmodb_user:b6pS3sgLJYh1@ds235461.mlab.com:35461/elmodb';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// catch 404
app.use((req, res, next) => {
  res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});

app.use(function (req, res, next) {
  
          // Website you wish to allow to connect
          res.setHeader('Access-Control-Allow-Origin', '*');
  
          // Request methods you wish to allow
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
          // Request headers you wish to allow
          res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
          // Set to true if you need the website to include cookies in the requests sent
          // to the API (e.g. in case you use sessions)
          res.setHeader('Access-Control-Allow-Credentials', true);
  
          // Pass to next layer of middleware
          next();
      });

app.get("*", (req, res) => {  
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
      });      

//start server

var server = http.createServer(app);

const io = socketIO.listen(server);
console.log('Socket listening');

io.on('connection', (client) => {
  console.log('client connected');
  client.on('onUpdate', (interval) => {
    client.broadcast.emit('receiveUpdate');
  });

});

server.listen(port, () => console.log(`Listening on port ${port}`));

