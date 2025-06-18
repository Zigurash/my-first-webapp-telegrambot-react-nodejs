const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '7365341531:AAH5LDCX-EGpOkAwAhHzcUDz2qSDTwIqu4s';
const webAppUrl = 'https://www.google.com/'

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});


bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    await bot.sendMessage(chatId, "Переходи в наш интернет магаз!", {
        reply_markup: {
            keyboard: [
                [{text: 'Перейти в шоп!', web_app: {url: webAppUrl}}],
            ]
        }
    })
    await bot.sendMessage(chatId, "Чтобы продолжить, нажмите кнопку ниже", {
        reply_markup: {
            inline_keyboard: [
                [{text: 'Перейти в шоп!', web_app: {url: webAppUrl}}],
            ]
        }
    })

  }
});

