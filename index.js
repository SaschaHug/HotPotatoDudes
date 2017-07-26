var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var User = require('./src/data/user')

/*  ​
 Login
 ​Input​: Es wird ein Passwort und Username gesendet
 Output​: Ein JSON-WebToken
​ ​*/
app.put('/api/V1/login', function (req, res) {
 if(!req.body.username){
    res.status(400).send('username required');
    return;}

  if(!req.body.password){
    res.status(400).send('password required');
    return;}

    var token = jwt.sign('src/data/user.json', 'megaSecret', {
    });
    res.status(200).json({'token': token});

});
	


/*  ​
 Passwort ändern
​ ​Input​: Ein JSON-WebToken, neues Passwort, altes Passwort
 Output: ​Success oder Fail Meldung und ein neuer JSON-WebToken
​ ​*/
app.put('/api/V1/passwordRecovery', function (req, res) {
});



/*  ​
 Alle Blogartikel
​​ Input​: JWT
 Output​: Alle Blogartikel als JSON-Array.
 Wenn die Route ohne JWT aufgerufen wird, sollen nur die Blogartikel übertragen werden, die
 als Attribut ​hidden​ als ​false​ haben
​ ​*/
app.get('/api/V1/blog', function (req, res) {

});




/*  ​
 Ein spezifischer Blogartikel
​​​ Input​: JWT
 Output​: Blogartikel mit der spezifischen Id
 Wenn die Route ohne JWT aufgerufen wird und der Artikel als ​hidden-value ​allerdings ein ​true
 beinhaltet, soll ein 401 Statuscode übersendet werden.
​ ​*/
app.get('/api/V1/blog:id', function (req, res) {
});



/*  ​
 Einen spezifischen Blogartikel löschen
​​​ ​Input​: JWT
 Output​: 200- erfolgreich gelöscht
 Wenn die Route ohne JWT aufgerufen wird und der Artikel als ​hidden-value ​allerdings ein ​true
 beinhaltet, soll ein 401 Statuscode übersendet werden.
​ ​*/
app.delete('/api/V1/blog:id', function (req, res) {
});




/*  ​
 Editieren eines Blogartikels
​​​ ​Input​: JWT - neue Daten (Als Key Value Pair im Request Body)
 Output​: 200 - erfolgreich geupdatet - Im Response Body soll der Artikel nochmal als Objekt
 zurückgegeben werden.
 Wenn die Route ohne JWT aufgerufen wird und der Artikel als ​hidden-value ​allerdings ein ​true
 beinhaltet, soll ein 401 Statuscode übersendet werden.
​ ​*/
app.put('/api/V1/blog:id', function (req, res) {
});



/*  ​
 Anlegen eines Blogartikels
​ Input​: JWT
 Output​: 201- erfolgreich angelegt und eine neue ID des Artikels.
 Ein Blog Artikel kann nur angelegt werden, wenn der User einen JWT übergeben hat.
 Hierbei soll der neue Blog Artikel exakt dieselben Attribute haben wie die vorigen.
 Das muss überprüft werden.
​ ​*/
app.put('/api/V1/blog:id', function (req, res) {
});


/* Test */
app.get('/', function (req, res) {
  //res.send('Hello World!');
  res.send(200);
});


/* Server starten */
app.listen(3000, function () {
  console.log('Server running at: 127.0.0.1:3000!');
});
