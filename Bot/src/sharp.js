const sharp = require('sharp');

async function imager(img) {
	await sharp(img).resize({ width: 512, height: 512 }).toBuffer().catch((err) => {
		console.error(err);
	});
}

module.exports = { imager };
