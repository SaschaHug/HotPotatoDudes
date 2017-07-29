var express = require('express');
var router = express.Router();
var blogController = require('../controller/blogController.js');

router.get('/', blogController.list);

router.route('/:id([0-9]+)')
  .get(blogController.show)


module.exports = router;