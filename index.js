var express = require('express');
var application = express();

var cors = require('cors');

var items = require('./data').items;

var _ = require('lodash');

application.use(cors());

application.get('/', function(req, res) {
  res.json(items);
});

application.get('/posts/:id', function(req, res) {
  var item = _.find(items, function(i) { return i.id == req.params.id; });
  res.json(item);
});

application.listen(3001, function() {
  console.log('Server on 3001');
})
