const { to_system } = require('./to-number-system');
const TelegramBot = require('node-telegram-bot-api');

process.env.NTBA_FIX_319 = 1;

// replace the value below with the Telegram token you receive from @BotFather
const token = '1057493772:AAFPJqLO6MAZtpWtgEIGarTGGoLLhqL13ps';

const bot = new TelegramBot(token, { polling: true });

// bot.onText(/\/number/, (msg, match) => {
// 	const chatId = msg.chat.id;
// 	const resp = match[1];

// 	bot.sendMessage(chatId, 'Choose your number system', {
// 		reply_markup: {
// 			inline_keyboard: [
// 				[
// 					{
// 						text: '2',
// 						callback_data: 'Convert your number to 2 system'
// 					},
// 					{
// 						text: '3',
// 						callback_data: 'Convert your number to 3 system'
// 					},
// 					{
// 						text: '8',
// 						callback_data: 'Convert your number to 8 system'
// 					},
// 					{
// 						text: '10',
// 						callback_data: 'Convert your number to 10 system'
// 					}
// 				]
// 			]
// 		}
// 	});
// });
bot.on('text', (message, err) => {
	const id = message.chat.id;
	if (err && typeof message.text != Number) {
		bot.sendMessage(id, err);
	}
	bot.on('polling_error', (err) => console.log(err));
	console.log(message);
	bot.sendMessage(id, to_system(message.text, 2), { parse_mode: 'Markdown' });
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
