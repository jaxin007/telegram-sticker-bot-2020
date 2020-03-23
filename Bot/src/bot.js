process.env.NTBA_FIX_319 = 1;
process.env['NTBA_FIX_350'] = 1;
// const fsp = require('fs').promises;
const { imageToSticker } = require('./sharp');
const { wakeUpTimer } = require('./wakeup');
const TelegramBot = require('node-telegram-bot-api');

var express = require('express');
var app = express();
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;
const port = process.env.PORT || 3030;

app.listen(port);
console.log('START!');
wakeUpTimer(1200000);

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
	const id = msg.chat.id;
	bot.sendMessage(id, 'Hello! Im a sticker bot! Just send me picture you want to convert into a sticker.');
});

const invalidInputHandler = (msg) => {
	if (msg.text != '/start') {
		bot.sendMessage(msg.chat.id, 'Please, send me only photo format.');
	}
};

bot.on('text', invalidInputHandler);
bot.on('document', invalidInputHandler);
bot.on('audio', invalidInputHandler);
bot.on('animation', invalidInputHandler);

bot.on('photo', async (msg) => {
	bot.on('polling_error', (err) => {
		console.log(err);
	});

	const id = msg.chat.id;
	const fileId = msg.photo[0].file_id;

	const photoWidth = msg.photo[0].width;
	const photoHeight = msg.photo[0].height;

	const file = await bot.getFile(fileId).catch(() => {
		throw new Error(`error with getFile function!`);
	});

	const url = `https://api.telegram.org/file/bot${token}/${file.file_path}`;

	const stickerSize = 512;
	// prettier-ignore
	const biggestSide = photoWidth > photoHeight ? 
		photoWidth : 
		photoHeight;

	const resizeRatio = stickerSize / biggestSide;
	const resizedWidth = Math.floor(photoWidth * resizeRatio);
	const resizedHeight = Math.floor(photoHeight * resizeRatio);

	const image = await imageToSticker(url, resizedWidth, resizedHeight);

	const fileOptions = {
		// Explicitly specify the file name.
		filename: 'sticker.png',
		// Explicitly specify the MIME type.
		contentType: 'image/png'
	};

	try {
		await bot.sendDocument(id, image, { caption: 'Your sticker.' }, fileOptions);
	} catch (err) {
		throw new Error(err);
	}
});
