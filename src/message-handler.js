class MessageHandler {
  constructor(imager) {
    this.imager = imager;
  }

  startCommand(ctx) {
    ctx.reply('Hello! Im a sticker bot! Just send me picture you want to convert into a sticker.');
  }

  invalidInputHandler(ctx) {
    ctx.reply('Please, send me only photo format.');
  }

  async photoHandler(ctx) {
    const photosList = ctx.message.photo;
    const lastPhoto = photosList.length - 1;
    const biggestPhoto = photosList[lastPhoto];
    const url = await ctx.telegram.getFileLink(biggestPhoto);
    const stickerSize = 512;
    const photoWidth = biggestPhoto.width;
    const photoHeight = biggestPhoto.height;

    const biggestSide = photoWidth > photoHeight ? photoWidth : photoHeight;

    const resizeRatio = stickerSize / biggestSide;
    const resizedWidth = Math.round(photoWidth * resizeRatio);
    const resizedHeight = Math.round(photoHeight * resizeRatio);

    try {
      const image = await this.imager.imageToJpeg(url, resizedWidth, resizedHeight);
      await ctx.telegram.sendChatAction(ctx.update.message.chat.id, 'upload_document');
      await ctx.replyWithDocument({ source: image, filename: 'sticker.png' }, { caption: 'Your sticker.' });
    } catch (err) {
      console.error(err);
    }
  }

  async documentHandler(ctx) {
    try {
      const biggestPhotoId = ctx.update.message.document.file_id;
      const photoSize = ctx.update.message.document.thumb;
      const url = await ctx.telegram.getFileLink(biggestPhotoId);

      const stickerSize = 512;
      const photoWidth = photoSize.width;
      const photoHeight = photoSize.height;

      const biggestSide = photoWidth > photoHeight ? photoWidth : photoHeight;

      const resizeRatio = stickerSize / biggestSide;
      const resizedWidth = Math.round(photoWidth * resizeRatio);
      const resizedHeight = Math.round(photoHeight * resizeRatio);


      const image = await this.imager.imageToPng(url, resizedWidth, resizedHeight);

      await ctx.telegram.sendChatAction(ctx.update.message.chat.id, 'upload_document');
      await ctx.replyWithDocument({
        source: image,
        filename: 'sticker.png',
      }, { caption: 'Your sticker.' });
    } catch (err) {
      ctx.reply('Error');
      console.error(err);
    }
  }
}


module.exports = {
  MessageHandler,
};
