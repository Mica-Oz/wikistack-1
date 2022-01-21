const express = require('express');
const app = express();
app.use(require('morgan'));
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
