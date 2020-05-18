const { Imager } = require('./sharp');
const { MessageHandler } = require('./message-handler');

const imager = new Imager();
const messageHandler = new MessageHandler(imager);

module.exports = {
  imager,
  messageHandler,
};
