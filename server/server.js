/*jshint esversion:6*/
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const {insertDB} = require('./DB/dbConnect');

const publicPath = path.join(__dirname, '../public');
const views = path.join(__dirname, '../views');
const port = 3000;
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(views + '/index.html')
})

app.post('/form', (req, res) => {
  console.log(req.body);
  insertDB(req.body);
  res.sendFile(views + '/form.html');
})

app.listen(port, () => {
  console.log(`server up on port ${port}.`);
});
