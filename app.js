const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');// обработчик ошибок celebrate
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
}).then(() => console.log('Connected to mongodb'));

const app = express();

app.use(express.json());
app.use(router);
app.use(helmet());
app.use(errors()); // обработчик ошибок celebrate
// errors() будет обрабатывать только ошибки, которые сгенерировал celebrate.
// Все остальные ошибки он передаст дальше, где их перехватит централизованный обработчик.
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
