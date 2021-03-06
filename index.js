const { nextISSTimesForMyLocation, fetchISSFlyOverTimes, fetchCoordsByIP, fetchMyIP } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log(typeof ip);
//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('184.64.34.22', (error, coords) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   //console.log(typeof coords);
//   console.log('It worked! Returned geo coordinates:' , coords);
// });

// const geoCoords = { latitude: '51.13870', longitude: '-114.20150' };

// fetchISSFlyOverTimes(geoCoords, (error, times) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   //console.log(typeof coords);
//   console.log('It worked! Returned flyover times:' , times);
// });

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  for (const eachtime of passTimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(eachtime.risetime);
    const duration = eachtime.duration;
    console.log(`Next pass at ${dateTime} for ${duration} seconds!`);
  }
});