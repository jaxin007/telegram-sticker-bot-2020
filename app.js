const Telegraf = require('telegraf');
const { messageHandler } = require('./src/dependencies');
const { wakeUpDyno } = require('./src/wakeup');

const token = process.env.TOKEN;
const port = process.env.PORT || 3030;

wakeUpDyno(port);

const bot = new Telegraf(token);

bot.start(messageHandler.startCommand);

bot.on('photo', (ctx) => messageHandler.photoHandler(ctx));
bot.on('document', (ctx) => messageHandler.documentHandler(ctx));

bot.on('text', messageHandler.invalidInputHandler);
bot.on('audio', messageHandler.invalidInputHandler);
bot.on('animation', messageHandler.invalidInputHandler);
bot.on('contact', messageHandler.invalidInputHandler);
bot.on('game', messageHandler.invalidInputHandler);
bot.on('passport_data', messageHandler.invalidInputHandler);
bot.on('sticker', messageHandler.invalidInputHandler);
bot.launch();
