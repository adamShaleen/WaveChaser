const request = require('sync-request')
const keys = require('../keys.js')

const MAGIC_SEAWEED_URL = 'http://magicseaweed.com/api/' + keys.Key + '/forecast/?spot_id='

const SeaweedService = function() {}

SeaweedService.prototype.getDataByLocation = function(spotId) {

    const response = request('GET', MAGIC_SEAWEED_URL + spotId)
    const body = JSON.parse(response.body.toString('utf-8'));
    return formatResponse(body);
}

function formatResponse(body) {
    let output = "";
    for (let index in body) {
        output += 'timestamp: ' + body[index].timestamp + ' || swell.minBreakingHeight: ' + body[index].swell.minBreakingHeight + ' ' + body[index].swell.unit + ' || swell.maxBreakingHeight: ' + body[index].swell.maxBreakingHeight
        + ' ' + body[index].swell.unit + ' || swell.components.combined.compassDirection: ' + body[index].swell.components.combined.compassDirection + ' || wind.speed: ' + body[index].wind.speed + ' ' + body[index].wind.unit + ' || wind.compassDirection: ' + body[index].wind.compassDirection
        + ' || condition.temperature: ' + body[index].condition.temperature + ' ' + body[index].condition.unit + ' END TimeStamp // ';
    }

    console.log(output);
    return body; // change to output when finished formatting
}

module.exports = SeaweedService

// Data worth returning: timestamp, swell.minBreakingheight, swell.maxBreakingHeight,
// swell.components.compassDirection, wind.speed, wind.compassDirection, condition.temperature,
// add image charts.swell 

// Coos Bay spot 320
// Gold Beach spot 321
