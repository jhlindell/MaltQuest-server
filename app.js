require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./router');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(dbConfig.url)
    .then(() => {
      console.log('Successfully connected to the database');
    }).catch((err) => {
      console.log(`Could not connect to the database. Exiting now... ${err}`);
      process.exit();
    });
}

router(app);

module.exports = app;

