var express = require('express');
var app = express();

function wakeUpDyno(PORT) {
	console.log('START!');
	app
		.get('/', (req, res) => {
			return res.send('Hello');
		})
		.listen(PORT);
}

wakeUpDyno(3030);
module.exports = { wakeUpDyno };
