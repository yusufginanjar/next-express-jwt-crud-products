const createError = require('http-errors');
const express = require('express');
const path = require('path');
const apiAuth = require('./routes/auth')
const apiRouter = require('./routes/api');
const passport = require('./lib/passport');
const restrict = require('./middlewares/restrict');
const cors = require('cors');

const app = express();
app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', apiAuth);
app.use('/api/v1', restrict ,apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

module.exports = app;
