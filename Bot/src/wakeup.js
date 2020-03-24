var https = require('https');
function wakeUpDyno() {
  setInterval(() => {
    https.get('https://intense-crag-83953.herokuapp.com');
  }, 1200000);
}

module.exports = {
  wakeUpDyno,
};
