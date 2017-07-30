var express = require('express');

/* BLOG Router */
var router = express.Router();
var blogController = require('../controller/blogController.js');
var loginController = require('../controller/loginController.js');


/* Alle Blogartikel als JSON-Array.
   Wenn die Route ohne JWT aufgerufen wird, sollen nur die Blogartikel übertragen werden, die
   als Attribut hidden als false haben */


/* list in blogController definiert*/
router.get('/', blogController.list);

/*Ein spezifischer Blogartikel GET /api/V1/blog/:id*/
router.route('/:id([0-9a-z]+)')
	/* BLOG anzeigen */
  .get(blogController.show)
    /* BLOGEINTRAG löschen*/
  .delete(blogController.delete)
  /* Blogeintrag editieren*/
  .put(loginController.checkIfAuthorised, blogController.edit)



module.exports = router;
