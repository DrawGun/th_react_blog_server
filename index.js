var express = require('express');
var application = express();

var cors = require('cors');
var moment = require('moment');

var _ = require('lodash');

var Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  storage: 'database/posts.sqlite'
});


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


const Post = sequelize.define('post', {
  title: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.JSON
  },
  meta: {
    type: Sequelize.JSON
  }
});

Post.sync({force: true}).then(() => {
  return _.forEach(require('./data').items, function(value) {
    Post.create(value)
  });
});

application.use(cors({
  exposedHeaders:['MAX-POSTS'],
}));

application.get('/', function(req, res) {
  Post.findAll().then(items => {
    var posts = items;

    var maxItems = posts.length;

    if (req.query.query) {
      posts = _.filter(items, function(i) { return i['title'].includes(req.query.query); });
      maxItems = posts.length;
    }

    res.set({
      'MAX-POSTS': maxItems
    });

    if (req.query.step) {
      var step = parseInt(req.query.step);
    } else {
      step = 2;
    }

    if (req.query.step) {
      var page = parseInt(req.query.page) - 1;
    } else {
      page = 0;
    }

    var arr_of_items = _.chunk(posts, step);
    var res_items = arr_of_items[page];

    res.json(res_items);
  })
});

application.get('/posts/:id', function(req, res) {
  Post.findOne({ where: {id: req.params.id} }).then(post => {
    res.json(post);
  })
});

application.post('/posts/:id/like', function(req, res) {
  Post.findOne({ where: {id: req.params.id} }).then(post => {
    var meta = post.meta;
    var likes = post.meta.likes;
    meta.likes = likes + 1;

    post.update({
      meta: meta
    }).then(() => {
      res.json(post);
    })
  })
});

application.listen(3001, function() {
  console.log('Server on 3001');
})
