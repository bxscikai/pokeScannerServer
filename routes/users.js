var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  if (req.query.username == null)
  {
    res.send(500, "User query name should not be empty")
  }
  else {

    var mockUserObject = {"username": req.query.username,
                          "level": 15,
                          "upvotes": ["e43e591e-93fb-48f7-9487-3b7b2aa170b7", "eed5e05d-be40-4001-8917-498c4c5b7f01"]
                        }
    res.send(200, mockUserObject);
  }

});

module.exports = router;
