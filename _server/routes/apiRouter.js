const express = require('express');
const router = express.Router();

//import controller

const accountController = require('../controllers/accountController');
const weatherController = require('../controllers/weatherController');
const trainController = require('../controllers/trainController');

// check if the username/email is taken, if not, hash password, create user document with the hashed pwd
router.post('/signup', accountController.createUser, (req, res) =>  {
    if(res.locals.newAccount) {
        res.status(200).send({result: 'redirect', url: '/dashboard' })
    } else {
        res.status(403).send({ error: 'User already exists', url: '/' })
    }
});

// check if the username exists, check if pwd matches, if so, redirect them to logged in page
router.post('/login', accountController.verifyUser,  (req, res) =>  {
    if (!res.locals.failedLogin) {
        res.status(200).send({result: 'redirect', url: '/dashboard' })
    } else {
        res.status(401).send({ error: 'Failed login, please try again', url: '/' })
    }
});

//weather api
router.get('/weather', weatherController.getForecast, (req, res) => {
    res.status(200).send(res.locals.weather)
})

//mta api -- get the users saved lines on DB, query the API for the data, parse and return to frontend
router.get('/trains', trainController.fetchLatest, trainController.extractArrivals, (req, res) => {
    res.status(200).send(res.locals.arrivalRefresh);
})

// AUTHORIZED ROUTES

module.exports = router;
