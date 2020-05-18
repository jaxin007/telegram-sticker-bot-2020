const sharp = require('sharp');
const axios = require('axios');

class Imager {
  async imageToJpeg(url, width, height) {
    const input = (await axios({ url, responseType: 'arraybuffer' })).data;

    const output = await sharp(input)
      .resize({ width, height })
      .jpeg({ quality: 100 })
      .toBuffer()
      .catch((err) => {
        console.error(err);
      });

    const imageBuffer = Buffer.from(output);

    return imageBuffer;
  }

  async imageToPng(url, width, height) {
    const input = (await axios({ url, responseType: 'arraybuffer' })).data;

    const output = await sharp(input)
      .resize({ width, height })
      .png({ quality: 100 })
      .toBuffer()
      .catch((err) => {
        console.error(err);
      });

    const imageBuffer = Buffer.from(output);

    return imageBuffer;
  }
}


module.exports = {
  Imager,
};
