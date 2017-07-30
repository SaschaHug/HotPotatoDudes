//var login = require('../src/data/user.json');
//var fs = require('fs');


exports.login = function(req, res) {
  let User = require('../src/data/user.json');
  authenticate(User, res, req);
};


function authenticate(User, res, req){
   if(User.username === req.body.username && User.password === req.body.password){
     let token = jwt.sign(User, 'MegaUltraHiddenSuperSecretForWorldDomination');
     res.status(200).json({'token': token});
   } else {
     res.status(401).json({'token': ''});
   }
}
