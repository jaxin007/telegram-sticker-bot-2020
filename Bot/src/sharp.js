const sharp = require('sharp');
const axios = require('axios');

async function imager(URL) {
	const input = (await axios({ url: URL, responseType: 'arraybuffer' })).data;

	const output = await sharp(input).resize(512, 512).png({ quality: 5 }).toBuffer().catch((err) => {
		console.error(err);
	});

	const imageBuffer = Buffer.from(output, 'utf-8');

	return imageBuffer;
}

module.exports = { imager };
