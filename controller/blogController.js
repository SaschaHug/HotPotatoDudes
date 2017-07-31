var blog = require('../src/data/blog.json');
var fs = require('fs');
var objectid = require('objectid');

exports.list = function(req, res) {
  if (res.locals.authenticated){
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

exports.post = function (req,res){

    let newId = 1;
    while (blog.filter((element) => {
        return element.index === newId
    }).length > 0) {
        newId += 1;
    }
    let newPost = {
        _id: objectid(),
        index: newId,
        title: req.body.title || "",
        picture: req.body.picture || "",
        author: req.body.author || "",
        about: req.body.about || "",
        released: req.body.released || "",
        hidden: req.body.hidden || false,
        tags: req.body.tags || []
    };
    blog.push(newPost);

    fs.writeFile('./src/data/blog.json', JSON.stringify(blog), 'utf-8', (err) => {
        if (err) {
            res.status(500).json({error: err});
        } else {
            res.status(201).json(blog[newId]);
}
});



}
exports.edit = function (req, res, next) {
   if (res.locals.authenticated) {
     if (!blog[req.params.id]) {
       res.status(404).send();
       return;
     }

     if (!res.locals.authenticated && blog[id].hidden) {
       return res.status(401).send({
       message: res.message
    });
    }



     blog[req.params.id].title = req.body.title       || blog[req.params.id].title;
     blog[req.params.id].picture = req.body.picture   || blog[req.params.id].picture;
     blog[req.params.id].author = req.body.author     || blog[req.params.id].author;
     blog[req.params.id].about = req.body.about       || blog[req.params.id].about;
     blog[req.params.id].released = req.body.released || blog[req.params.id].released;
     blog[req.params.id].hidden = req.body.hidden     || blog[req.params.id].hidden;
     blog[req.params.id].tags = req.body.tags         || blog[req.params.id].tags;

     fs.writeFile('./src/data/blog.json', JSON.stringify(blog), 'utf-8', (err) => {
       if (err) {
         res.status(500).json({error: err});
       } else {
         res.status(200).json(blog[req.params.id]);
   }
 });

}
}
