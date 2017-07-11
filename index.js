var express = require('express');
var application = express();

var cors = require('cors');

var items = require('./data').items;
var maxItems = items.length

var _ = require('lodash');

application.use(cors({
  exposedHeaders:['MAX-POSTS'],
}));

application.get('/', function(req, res) {
  var posts = items;

  if (req.query.query) {
    posts = _.filter(items, function(i) { return i['title'].includes(req.query.query); });
    maxItems = posts.length;
  }

  res.set({
    'MAX-POSTS': maxItems
  });

  var step = parseInt(req.query.step);
  var page = parseInt(req.query.page) - 1;
  var arr_of_items = _.chunk(posts, step);
  var res_items = arr_of_items[page];

  res.json(res_items);
});

application.get('/posts/:id', function(req, res) {
  var item = _.find(items, function(i) { return i.id == req.params.id; });
  res.json(item);
});

application.listen(3001, function() {
  console.log('Server on 3001');
})
