const express = require('express');
const app = express();
const trigger = require('./trigger');

app.use('/api', trigger);

module.exports = app;
