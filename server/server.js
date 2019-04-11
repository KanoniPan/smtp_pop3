'use strict';

var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var nodemailer = require('nodemailer');

var port = process.env.PORT || 5000;

app.use(express.static('./src/client/'));
app.use(express.static('./'));
app.use(express.static('./.tmp'));
app.use('/*', express.static('./src/client/index.html'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/sendMail', function(req, res) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lab3pr@gmail.com',
      pass: 'qwerty1!Q'
    }
  });
  var data = JSON.parse(req.body);
  console.log('asfdfsa',data)
  // console.log(req)
  var mailOptions = {
    from: 'lab3pr@gmail.com',
    to: data.to,
    subject: data.title,
    text: data.message
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return console.log('err',error);
    }
    console.log('Message sent: ' + info.response);
    console.log('Data:' + data.contactName);
  });
  res.json(data);
});

app.listen(port, function () {
  console.log('Express app listening on port: ' + port);
  console.log(__dirname);
});