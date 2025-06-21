const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '7365341531:AAH5LDCX-EGpOkAwAhHzcUDz2qSDTwIqu4s';
const webAppUrl = 'https://jolly-biscotti-4d04f2.netlify.app'

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});


bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    await bot.sendMessage(chatId, "Готов к заказу?", {
        reply_markup: {
            keyboard: [
                [{text: 'Заполнить форму', web_app: {url: webAppUrl + '/form'}}],
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

  if (msg?.web_app_data?.data) {
    try {
        const data = JSON.parse(msg?.web_app_data?.data)

        await bot.sendMessage(chatId, `Спасибо за обратную связь!\nВаша страна: ${data?.country}\nВаш город: ${data?.city}\nВаша улица: ${data.street}`)

        setTimeout( async () => {
            await bot.sendMessage(chatId,'Еще разок спасибо, ништяк збс');
        }, 3000)
  } catch (e) {
    console.log(e);
  }}
});

