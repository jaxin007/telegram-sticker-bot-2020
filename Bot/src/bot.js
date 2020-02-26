process.env.NTBA_FIX_319 = 1;
const { to_system } = require('./to-number-system');
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '1057493772:AAHwk6iDOUL6CFnUPFFcNAFVT6fWgaDcwYY';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
	const id = msg.chat.id;
	bot.sendMessage(id, 'Choose your number system', {
		reply_markup: {
			keyboard: [ [ '2', '3' ], [ '8', '10' ], [ 'Close' ] ]
		}
	});

	bot.on('message', (msg) => {
		const data = msg.text;

		if (data === 'Close') {
			bot.sendMessage(id, 'Closing keyboard', {
				reply_markup: {
					remove_keyboard: true
				}
			});
		} else if (data === '2') {
			bot.sendMessage(id, 'Send me your number.', {
				reply_markup: {
					remove_keyboard: true
				}
			});
		} else {
			bot.sendMessage(id, 'Choose your number system', {
				reply_markup: {
					keyboard: [ [ '2', '3' ], [ '8', '10' ], [ 'Close' ] ]
				}
			});
		}
		// const numberSystemOnButton = parseInt(msg.text, 10);
		// console.log(numberSystemOnButton);
		// if (dataInNumSystem === 'NaN') {
		// 	console.error('Error');
		// 	bot.sendMessage(id, 'Error, try again');
		// } else if (dataInNumber < 2 && dataInNumber > 16) {
		// 	bot.sendMessage(id, 'Please, choose number system only from 2 to 16! Try again.');
		// } else {
		// 	bot.sendMessage(id, dataInNumber.toString(numberSystemOnButton));
		// }

		// bot.on('polling_error', (err) => console.log(err));
	});
});
