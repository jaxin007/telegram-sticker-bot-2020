import Telegraf from 'telegraf';
import { invalidInputHandler, photoHandler, startCommand } from './src/message-handler.js';
import { wakeUpDyno } from './src/wakeup.js';

const token = process.env.TOKEN;
const port = process.env.PORT || 3030;

wakeUpDyno(port);

export const bot = new Telegraf(token);

bot.start(startCommand);

bot.on('photo', photoHandler);

bot.on('text', invalidInputHandler);
bot.on('document', invalidInputHandler);
bot.on('audio', invalidInputHandler);
bot.on('animation', invalidInputHandler);
bot.on('contact', invalidInputHandler);
bot.on('game', invalidInputHandler);
bot.on('passport_data', invalidInputHandler);
bot.on('sticker', invalidInputHandler);

bot.launch();
