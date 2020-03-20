process.env.NTBA_FIX_319 = 1;
process.env['NTBA_FIX_350'] = 1;
// const fsp = require('fs').promises;
const { imager } = require('./sharp');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
// replace the value below with the Telegram token you receive from @BotFather
const token = '1127840537:AAHhCP4Rz1W0O4J65Qo3zbvH7HnbPURTK_4';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const id = msg.chat.id;
  bot.sendMessage(
    id,
    'Hello! Im a sticker bot! Just send me picture you want to convert into a sticker.',
  );
});

const invalidInputHandler = (message) => {
  bot.sendMessage(message.chat.id, 'Please, send me only photo format.');
};

bot.on('text', invalidInputHandler);
bot.on('document', invalidInputHandler);
bot.on('audio', invalidInputHandler);
bot.on('animation', invalidInputHandler);

bot.on('photo', async (message) => {
  bot.on('polling_error', (err) => {
    console.log(err);
  });
  const id = message.chat.id;

  const fileId = message.photo[1].file_id;

  const file = await bot.getFile(fileId).catch(() => {
    throw new Error(`error with getFile function!`);
  });

  const url = `https://api.telegram.org/file/bot${token}/${file.file_path}`;

  const image = await imager(url);

  const fileOptions = {
    // Explicitly specify the file name.
    filename: 'sticker.png',
    // Explicitly specify the MIME type.
    contentType: 'image/png',
  };

  try {
    await bot.sendDocument(id, image, { caption: 'Your sticker' }, fileOptions);
  } catch (err) {
    throw new Error(err);
  }
});
