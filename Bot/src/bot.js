process.env.NTBA_FIX_319 = 1;
const { to_system } = require('./to-number-system');
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '1057493772:AAHwk6iDOUL6CFnUPFFcNAFVT6fWgaDcwYY';

const bot = new TelegramBot(token, { polling: true });
// bot.onText('/start/', (msg) => {
// 	bot.sendMessage(msg.chat.id, 'Send me number you want to convert.');
// });
let number;

bot.on('message', (msg) => {
	number = parseInt(msg.text, 10);
	const id = msg.chat.id;
	bot.sendMessage(id, 'Choose your number system', {
		reply_markup: {
			inline_keyboard: [
				[ { text: '2', callback_data: 2 }, { text: '3', callback_data: 3 }, { text: '8', callback_data: 8 } ]
			]
		}
	});
});

bot.on('callback_query', (query) => {
	const chatId = query.message.chat.id;
	const numSystem = parseInt(query.data, 10);
	if (number > 10000000) {
		bot.sendMessage(chatId);
	} else {
		try {
			switch (query.data) {
				case '2':
					bot.sendMessage(chatId, to_system(number, numSystem));
					break;
				case '3':
					bot.sendMessage(chatId, to_system(number, numSystem));
					break;
				case '8':
					bot.sendMessage(chatId, to_system(number, numSystem));
					break;
				default:
					break;
			}
		} catch (err) {
			console.log(err);
		}
	}
});
