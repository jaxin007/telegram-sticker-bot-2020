import express from 'express';
const app = express();

export function wakeUpDyno(PORT) {
  app
    .get('/', (req, res) => {
      return res.send('Hello');
    })
    .listen(PORT);
}
