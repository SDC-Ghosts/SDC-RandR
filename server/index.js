const express = require('express');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const router = require('./router');
require('dotenv').config();

// basic server setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// logger
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });
app.use(morgan('tiny', { stream: accessLogStream }));

// loaderio testing
app.use('/loaderio-92bb7174e20fe1de1142814ca2b76e78.txt', express.static(path.join(__dirname, '../server/loaderio.txt')));

// router
app.use('/api/fec2/hr-rfp', router);
app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server listening on ${process.env.PORT || 3000}`);
    console.log('successfully connected');
  }
});
