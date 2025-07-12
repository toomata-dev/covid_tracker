import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

// Dynamic date variable
var currentDate = new Date();
var prevDate = new Date(currentDate.getTime()); 
prevDate.setDate(currentDate.getDate() - 2);

// Formatting
var prevDateAPIString = prevDate.toISOString().slice(0, 10) + 'T00:00:00.000Z';

var state = "Maryland";

// Description - Retrieves the state covid data
// POST /api/states/getState
router.route('/getState').get( (req, res) => {
    fetch(`https://webhooks.mongodb-stitch.com/api/client/v2.0/app/covid-19-qppza/service/REST-API/incoming_webhook/us_only?state=${state}&min_date=2021-12-01T00:00:00.000Z&max_date=2021-12-01T00:00:00.000Z`)
    .then(res => res.json()) // return a promise containing the response data
    .then(json => res.json(json)) // sends the json object to the client
    .catch(function(err) {
        console.log(err); 

        res.status(401);
    })
});

export default router;