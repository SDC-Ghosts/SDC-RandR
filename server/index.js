const express = require('express');
const path = require('path');
const router = require('./router');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/fec2/hr-rfp', router);
app.use('/loaderio-c5c53a91204c93fe17f8fa2872123a44.txt', express.static(path.join(__dirname, '../server/loaderio.txt')));

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server listening on ${process.env.PORT || 3000}`);
    console.log('successfully connected');
  }
});
