const express = require('express');

const app = express();

function wakeUpDyno(PORT) {
  app
    .get('/', (req, res) => res.send('Hello'))
    .listen(PORT);
}

module.exports = {
  wakeUpDyno,
};
