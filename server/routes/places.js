var express = require('express');
var axios = require('axios');
var router = express.Router();

const API_KEY = process.env.APIKEY;

/** 
 * Uses lat/long values passed via post to make request to Google
 * Maps API then returns the data
 * This avoids CORS issues that occurr when requesting the data
 * via the client
 */
router.post('/', function(req, res, next) {
	const API_URL =
		'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
		req.body.lat +
		',' +
		req.body.lon +
		'&radius=1000&types=lodging&keyword=surf' +
		'&key=' +
		API_KEY;
	axios.get(API_URL).then(response => {
		res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
		res.status(200).send(JSON.stringify(response.data));
	}).catch(error => {
		console.log(error);
		res.err(404);
	});
});

module.exports = router;
