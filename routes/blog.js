var express = require('express');

var router = express.Router();
var blogController = require('../controller/blogController.js');
var loginController = require('../controller/loginController.js');


/* Alle Blogartikel */
router.get('/',loginController.checkIfAuthorised, blogController.list);

/*Ein spezifischer Blogartikel anhand einer ID*/
router.route('/:id([0-9]+)')
  /* GET Blogartikel */
  .get(loginController.checkIfAuthorised, blogController.show)

  /* DELETE Blogartikel */
  .delete(loginController.checkIfAuthorised, blogController.delete)

  /* PUT Blogartikel */
  .put(loginController.checkIfAuthorised, blogController.edit)


/* POST Blogartikel */
router.post('/',loginController.checkIfAuthorised, blogController.post);

module.exports = router;
