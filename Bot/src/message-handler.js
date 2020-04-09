import { imageToSticker } from './sharp.js';

// const token = process.env.TOKEN;

export function startCommand(ctx) {
  ctx.reply('Hello! Im a sticker bot! Just send me picture you want to convert into a sticker.');
}

export function invalidInputHandler(ctx) {
  ctx.reply('Please, send me only photo format.');
}

export async function photoHandler(ctx) {
  const photosList = ctx.message.photo;
  const lastPhoto = photosList.length - 1;
  const biggestPhoto = photosList[lastPhoto];

  const url = await ctx.telegram.getFileLink(biggestPhoto);

  const stickerSize = 512;
  const photoWidth = biggestPhoto.width;
  const photoHeight = biggestPhoto.height;

  // prettier-ignore
  const biggestSide = photoWidth > photoHeight ?
  	photoWidth :
  	photoHeight;

  const resizeRatio = stickerSize / biggestSide;
  const resizedWidth = Math.floor(photoWidth * resizeRatio);
  const resizedHeight = Math.floor(photoHeight * resizeRatio);

  const image = await imageToSticker(url, resizedWidth, resizedHeight);

  try {
    await ctx.replyWithDocument(
      { source: image, filename: 'sticker.png' },
      { caption: 'Your sticker.' },
    );
  } catch (err) {
    console.error(err);
  }
}
