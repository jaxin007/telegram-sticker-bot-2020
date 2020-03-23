const sharp = require('sharp');
const axios = require('axios');

async function imageToSticker(URL, WIDTH, HEIGHT) {
	const input = (await axios({ url: URL, responseType: 'arraybuffer' })).data;

	const output = await sharp(input)
		.resize({ width: WIDTH, height: HEIGHT })
		.jpeg({ quality: 100 })
		.toBuffer()
		.catch((err) => {
			console.error(err);
		});

	const imageBuffer = Buffer.from(output);

	return imageBuffer;
}

module.exports = { imageToSticker };
