const { to_system } = require('./to-number-system');
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '1057493772:AAG1Fr5xtAcynOLIKdQHOjyb8zJBsn9QKps';

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
						callback_data: 'Convert your number to 2 system'
					},
					{
						text: '3',
						callback_data: 'Convert your number to 3 system'
					},
					{
						text: '8',
						callback_data: 'Convert your number to 8 system'
					},
					{
						text: '10',
						callback_data: 'Convert your number to 10 system'
					}
				]
			]
		}
	});
});
bot.on('callback_query', (query) => {
	const id = query.message.chat.id;
	bot.on('polling_error', (err) => console.log(err));
	console.log(query);
	bot.sendMessage(id, to_system(10, 10), { parse_mode: 'Markdown' });
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
