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
        output += formatDate(body[index].localTimestamp) + ' breaking ' + body[index].swell.minBreakingHeight
        +  '-' + body[index].swell.maxBreakingHeight + body[index].swell.unit + ', swell out of the '
        + body[index].swell.components.combined.compassDirection + ' at ' + body[index].wind.speed  + body[index].wind.unit
        + ', wind out of the ' + body[index].wind.compassDirection + ', temp:' + body[index].condition.temperature
        + body[index].condition.unit + "\n";
    }

    console.log(output);
    return body; // change to output when finished formatting
}

function formatDate(timestamp) {
    const date = new Date(timestamp*1000);
    const days = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
    const day = days[date.getDay()];
    const hour = date.getHours();

    return day + ' at ' + hour + ':00';
}

module.exports = SeaweedService

// add image charts.swell

// Coos Bay spot 320
// Gold Beach spot 321
