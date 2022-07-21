const express = require('express');
const app = express();
const connect = require('./config/db');
const morgan = require('morgan');
var myParser = require('body-parser');
const cors = require('cors');
const pdf = require('html-pdf');
const pdf1 = require('./pdf/index');

connect.connectDbMain();

app.use(cors());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept,x-www-form-urlencoded'
  );

  next();
});

app.use(morgan('dev'));
app.use(myParser.urlencoded({extended: true}));
app.use(myParser.json());
app.use(myParser.raw());

/************************************ API END POINTS*************************************/

app.post('/create-pdf', async (req, res) => {
  pdf.create(pdf1(req.body), {}).toFile('report.pdf', (err) => {
    if (err) {
      console.log(err);
    } else {
      res.sendFile(`${__dirname}/report.pdf`);
    }
  });
});

app.use('/api/v1/user', require('./routes/userAuth'));
app.use('/api/v1/skill', require('./routes/skills'));
app.use('/api/v1/project', require('./routes/project'));

module.exports = app;
