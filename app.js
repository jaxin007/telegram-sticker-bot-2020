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

bot.on(['text', 'audio', 'animation', 'contact', 'game', 'passport_data', 'sticker'], messageHandler.invalidInputHandler);
bot.launch();
