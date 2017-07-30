//var login = require('../src/data/user.json');
var fs = require('fs');
const jwt = require('jsonwebtoken');
let User = require('../src/data/user.json');


exports.login = function(req, res) {
  authenticate(User, res, req);
};


exports.passwordRecovery = function (req, res) {
  console.log('startet change password');
  //function passwordRecovery(req, res){
  if (!res.locals.authenticated) {
    return res.status(401).send({
      //message: res.message
      message: 'not authenticated'
    });
  }

    var User = require('../src/data/user.json');
    if (User.password === req.body.password) {
      User.password = req.body.newPassword;
      let token = jwt.sign(User, 'MegaUltraHiddenSuperSecret');

      fs.writeFile('./src/data/user.json', JSON.stringify(User), 'utf-8', (err) => {
        if (err) {
          res.status(500).json({error: err});
        } else {
          res.status(200).send(
            {
              'status': 'password was successfully changed',
              'token': token
            });



      //res.status(200).json({'token': token});
    }
  });


}
else {
  res.status(401).send({
    message: 'wrong password, please try again'
  });


}
};


function authenticate(User, res, req){
   if(User.username === req.body.username && User.password === req.body.password){
     let token = jwt.sign(User, 'MegaUltraHiddenSuperSecret');
     res.status(200).json({'token': token});
   } else {
     res.status(401).json({'token': ''});
   }
}


exports.checkIfAuthorised = function (req, res, next) {
  var encodedToken = req.headers["token"];
  if(!req.headers["token"]){
    encodedToken = req.body.token;
  }
    decodedToken = verify(encodedToken);
  if (decodedToken.password === User.password) {
    res.locals.authenticated = true;
    next();
    //passwordRecovery(req, res);
  } else {
    res.status(401).send('Not Authorized!');
  }
}

function verify(token) {
  var decoded = false;
  try {
    decoded = jwt.verify(token, 'MegaUltraHiddenSuperSecret');
  } catch (e) {
    decoded = false; // still false
  }
  return decoded;
}
