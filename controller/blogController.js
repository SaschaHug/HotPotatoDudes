var blog = require('../src/data/blog.json');
var fs = require('fs');

/*BLOG Funktionen
TODO:

1. Editieren eines Blogartikels PUT /api/V1/blog/:id
Input : JWT - neue Daten (Als Key Value Pair im Request Body)
Output : 200 - erfolgreich geupdatet - Im Response Body soll der Artikel nochmal als Objekt
zurückgegeben werden.
Wenn die Route ohne JWT aufgerufen wird und der Artikel als hidden-value allerdings ein true
beinhaltet, soll ein 401 Statuscode übersendet werden.

2. Anlegen eines Blogartikels POST /api/V1/blog
Input : JWT
Output : 201- erfolgreich angelegt und eine neue ID des Artikels.
Ein Blog Artikel kann nur angelegt werden, wenn der User einen JWT übergeben hat.
Hierbei soll der neue Blog Artikel exakt dieselben Attribute haben wie die vorigen.
Das muss überprüft werden.*/


exports.list = function(req, res) {
	/* AUTHENTIFIZIERUNG Checken*/
  if (res.locals.authenticated) {
    res.json(blog);
	/* Alle Blogartikel als JSON-Array.
	   Wenn die Route ohne JWT aufgerufen wird, sollen nur die Blogartikel übertragen werden, die
	   als Attribut hidden als false haben */
  } else {
    res.json(blog.filter((element) => {
      return !element.hidden;
    }));
  }
}

exports.show = function(req, res) {
  if (!res.locals.authenticated && blog[req.params.id].hidden) {
    res.status(401).send();
    return;
	/* Wenn die Route ohne JWT aufgerufen wird und der Artikel als hidden-value allerdings ein true
	   beinhaltet, soll ein 401 Statuscode übersendet werden.*/
  }
  if (!blog[req.params.id]) {
    res.status(404).send();
    return;
  }
  res.json(blog[req.params.id]);
}

exports.delete = function(req, res) {
	if (!blog[req.params.id]) {
	  res.status(500).json({error: err});
    } /*Wenn die Route ohne JWT aufgerufen wird und der Artikel als hidden-value allerdings ein true
		beinhaltet, soll ein 401 Statuscode übersendet werden.*/
	if(!res.locals.authenticated && blog[req.params.id].hidden) {
    res.status(401).send();
		return;
	}


    fs.writeFile('./src/data/blog.json', JSON.stringify(blog), 'utf-8', (err) => {
    if (err) {
      res.status(500).json({error: err});
    } else {
      res.status(200).send(
        {
        success: true,
        message: 'Erfolgreich gelöscht!'
        });
    }
  });
}


exports.edit = function (req, res, next) {
   if (res.locals.authenticated) {
     res.status(200).send(
       {
       success: true,
       message: 'Erfolgreich editiert!'
       });
   } else {
     res.status(401).json({error: err});
   }

}
