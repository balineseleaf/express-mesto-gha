const express = require('express');
const mongoose = require('mongoose');
// const helmet = require('helmet');
const router = require('./routes');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
}).then(() => console.log('Connected to mongodb'));

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64e7a420ba09e6a9890ed3cd',
  };
  next();
});

app.use(router);
// app.use(helmet());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
