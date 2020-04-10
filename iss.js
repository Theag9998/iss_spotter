const request = require('request'); //request the library

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }


    const ip = JSON.parse(body).ip; //turn body object into a string
    // console.log(typeof ip) make sure ip is a string not object
    callback(null, ip);
	
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body).data;
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
		
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
	
    const timepasses = JSON.parse(body).response;
    callback(null, timepasses);
  });
};

const nextISSTimesForMyLocation = function(callback) {
	fetchMyIP((error, ip) => {
		  if (error) {
		    return callback(error, null)
			}
		fetchCoordsByIP(ip, (error, coords) => {
				if  (error) {
		    	return callback(error, null)
				}
			fetchISSFlyOverTimes(coords, (error, passTimes) => {
				if  (error) {
		    	return callback(error, null)
				}
				callback(null, passTimes);

			})
		})
	})
}


module.exports = { nextISSTimesForMyLocation, fetchISSFlyOverTimes, fetchCoordsByIP, fetchMyIP };