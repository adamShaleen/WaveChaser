const express = require('express')
const app = express()
const SeaweedService = require('./service/magicSeaweedService.js')

const seaweedService = new SeaweedService()
app.get('/wavechaser/:spotId', (req, res, next) => {

    const spotId = req.params.spotId
    const response = seaweedService.getDataByLocation(spotId)

    res.send(response)
})

app.listen(3000)
