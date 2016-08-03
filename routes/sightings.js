var express = require('express');
var uuid = require('node-uuid');
var Random = require('random-js');
var router = express.Router();

/* API for sightings. */

// Fetch sighting with given latitude and longtitude locations
router.get('/', function(req, res, next) {
    var latitude = req.query.latitude;
    var longtitude = req.query.longitude;

    if (latitude == null || longtitude == null)
    {
      res.send(500, "longitude or latitude parameter missing, cannot fetch pokemon sightings")
    }
    else
    {
      // Return a random number of pokemons (5-25)
      var engine = Random.engines.mt19937().autoSeed();
      var randomNumberOfPokemons = Random.integer(5, 25)(engine);
      var pokemonsSightings = [];
      var currentUnixTime = Math.round(new Date().getTime()/1000);
      var mockLocationVariance = 0.0001;

      for (i=0; i<randomNumberOfPokemons; i++)
      {
        var newpokemonSighting = {};
        newpokemonSighting["sightingGuid"] = uuid.v4();
        newpokemonSighting["pokemonId"] = Random.integer(1, 151)(engine);
        newpokemonSighting["mostRecentReporting"] = Random.integer(currentUnixTime - 10000, currentUnixTime)(engine);
        newpokemonSighting["numberOfUpvotes"] = Random.integer(1, 100)(engine);
        newpokemonSighting["lowestTrainerLevel"] = Random.integer(1, 25)(engine);
        newpokemonSighting["coordinate"] = {};
        newpokemonSighting["coordinate"]["longitude"] = Random.real(req.query.longitude * (1 - mockLocationVariance), req.query.longitude * (1 + mockLocationVariance))(engine);
        newpokemonSighting["coordinate"]["latitude"] = Random.real(req.query.latitude * (1 - mockLocationVariance), req.query.latitude * (1 + mockLocationVariance))(engine);
        newpokemonSighting["submittedBy"] = "anonymous";
        pokemonsSightings.push(newpokemonSighting);
      }

      res.send(200, pokemonsSightings);
    }
});

router.post('/upvote', function(req, res, next) {
  if (req.body.username == null || req.body.sightingId == null)
  {
    res.status(500).send("Missing username or sightingId");
  }
  else
  {
    res.send(200);
  }
});

// Adding a new sighting
router.post('/', function(req, res, next) {
    if (req.body.username == null || req.body.pokemonId == null || req.body.latitude == null || req.body.longitude == null)
    {
      res.status(500).send("Missing username, pokemonId, or location information in request");
    }
    else
    {
      res.send(200);
    }
});

module.exports = router;
