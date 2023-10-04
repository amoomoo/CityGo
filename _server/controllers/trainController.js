const protobuf = require('protobufjs')
const path = require('path')
const axios = require('axios')
const trainController = {};
const util = require('util')

trainController.fetchLatest = async (req, res, next) => {
    console.log('entering the findTrains middleware')
    try {
        const protoFile = path.resolve(__dirname, './gtfs-realtime.proto')
        const root = await protobuf.load(protoFile)
        const FeedMessage = root.lookupType("transit_realtime.FeedMessage")
        console.log('successfully loaded')
        const response = await axios.get('https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-l', {
            responseType: 'arraybuffer',
            headers: { "x-api-key": 'VBF5puc7dc9iaVXxndiN72GaOsFZ6l8e20rhUy7E'}
        })
        const buffer = response.data
        const trainData = FeedMessage.decode(buffer)
        res.locals.trainData = trainData;
        return next()
    }
    catch(err) {
        err = {
            log: 'Error caught in the trainController.fetchLatest middleware function',
            status: 500,
            message: { error: 'There was an error fetching latest train times' } 
        }
        return next(err)
    }
}

//trainData.entity[0].tripUpdate.stopTimeUpdate[0].arrival
trainController.extractArrivals = (req, res, next) => {
    try {
        const arrivals = {}
        for (const entity of res.locals.trainData.entity) {
            if (entity.tripUpdate) {
                const tripUpdate = entity.tripUpdate;
                for (const arrivalUpdate of tripUpdate.stopTimeUpdate) {
                    const stopID = arrivalUpdate.stopId;
                    const arrivalTime = parseInt(arrivalUpdate.arrival?.time)

                    if (!arrivals[stopID]) {
                        arrivals[stopID] = [];
                    }
                    if (!isNaN(arrivalTime)) {
                        const humanTime = new Date(arrivalTime * 1000).toString()
                        arrivals[stopID].push(humanTime)
                    }
                }
            }
        }
        res.locals.arrivalRefresh = arrivals
        return next()
    }
    catch(err) {
        err = {
            log: 'Error caught in the trainController.extractArrivals middleware function' + err,
            status: 500,
            message: { err: 'There was an error extracting the latest train times'}
        }
        return next(err)
    }
}

module.exports = trainController;
