process.env.NTBA_FIX_319 = 1;
// const fsp = require('fs').promises;
const { imager } = require('./sharp');
const TelegramBot = require('node-telegram-bot-api');
const { axiosClient } = require('./clientAxios');
// replace the value below with the Telegram token you receive from @BotFather
const token = '1057493772:AAHwk6iDOUL6CFnUPFFcNAFVT6fWgaDcwYY';

const bot = new TelegramBot(token, { polling: true });

bot.on('photo', async (message) => {
  bot.on('polling_error', (err) => {
    console.log(err);
  });
  const id = message.chat.id;
  const fileId = message.photo[0].file_id;

  const file = await bot.getFile(fileId).catch(() => {
    throw new Error(`error with getFile function!`);
  });

  const url = `https://api.telegram.org/file/bot${token}/${file.file_path}`;

  const image = axiosClient(1000, url);

  bot.sendPhoto(id, image).catch((err) => {
    throw new Error(`Error with sendPhoto function!`, err);
  });
});

//--------------------------------------
// let number;

// bot.on('message', (msg) => {
// 	number = parseInt(msg.text, 10);
// 	const id = msg.chat.id;
// 	bot.sendMessage(id, 'Choose your number system', {
// 		reply_markup: {
// 			inline_keyboard: [
// 				[ { text: '2', callback_data: 2 }, { text: '3', callback_data: 3 }, { text: '8', callback_data: 8 } ]
// 			]
// 		}
// 	});
// });

// bot.on('callback_query', (query) => {
// 	const chatId = query.message.chat.id;
// 	const numSystem = parseInt(query.data, 10);
// 	if (number > 10000000) {
// 		bot.sendMessage(chatId);
// 	} else {
// 		try {
// 			switch (query.data) {
// 				case '2':
// 					bot.sendMessage(chatId, to_system(number, numSystem));
// 					break;
// 				case '3':
// 					bot.sendMessage(chatId, to_system(number, numSystem));
// 					break;
// 				case '8':
// 					bot.sendMessage(chatId, to_system(number, numSystem));
// 					break;
// 				default:
// 					break;
// 			}
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	}
// })
