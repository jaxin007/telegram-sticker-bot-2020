const sharp = require('sharp');
const axios = require('axios');

async function imager(URL) {
	const input = (await axios({ url: URL, responseType: 'arraybuffer' })).data;

	const output = await sharp(input).resize(512, 512).jpeg({ quality: 100 }).toBuffer().catch((err) => {
		console.error(err);
	});

	const imageBuffer = Buffer.from(output);

	return imageBuffer;
}

module.exports = { imager };
