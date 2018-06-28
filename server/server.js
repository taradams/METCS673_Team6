const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));


//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://elmodev_user:1h7f5KLPEhVn@ds121331.mlab.com:21331/elmodb_dev';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));