process.env.NTBA_FIX_319 = 1;
const { to_system } = require('./to-number-system');
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '1057493772:AAHwk6iDOUL6CFnUPFFcNAFVT6fWgaDcwYY';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/number/, (msg, match) => {
	const chatId = msg.chat.id;
	const resp = match[1];

	bot.sendMessage(chatId, 'Choose your number system', {
		reply_markup: {
			inline_keyboard: [
				[
					{
						text: '2',
						callback_data: '2'
					},
					{
						text: '3',
						callback_data: '3'
					},
					{
						text: '8',
						callback_data: '8'
					},
					{
						text: '10',
						callback_data: '10'
					}
				]
			]
		}
	});
});
bot.on('callback_query', (query) => {
	console.log(query);
	bot.on('message', (msg) => {
		const id = msg.chat.id;
		const data = msg.text;
		const dataInNumber = parseInt(data, 10);
		console.log(msg);
		if (dataInNumber == NaN) {
			console.error('Error');
			bot.sendMessage(id, 'Error, try again');
		}
		console.log(typeof data, typeof dataInNumber);
		bot.sendMessage(id, dataInNumber.toString(2)).catch((error) => {
			console.log(error.code);
		});
		// bot.on('polling_error', (err) => console.log(err));
	});
});

//-------------------------------------------------------------------
// // Listen for any kind of message. There are different kinds of
// // messages.
// bot.on('message', (msg) => {
// 	const chatId = msg.chat.id;

// 	// send a message to the chat acknowledging receipt of their message
// 	bot.sendMessage(chatId, 'Received your message');
// });
//-------------------------------------------------------------------
