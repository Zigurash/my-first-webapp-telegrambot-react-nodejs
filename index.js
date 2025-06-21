
require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = 'https://jolly-biscotti-4d04f2.netlify.app'

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
const app = express();

app.use(express.json());
app.use(cors());


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

app.post('/web-data', async (req, res) => {
    const {queryId, products, totalPrice} = req.body;
    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Успешная покупка!',
            input_message_content: {message_text: 'Поздравляю с покупкой, вы приобрели товраров на сумму' + totalPrice + '\nСписок товаров:\n' + products}
        });    
        return res.status(200).json({});
    } catch (e) {
          await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Не удалось преобрести товар!',
            input_message_content: {message_text: 'Не удалось преобрести товар!'}

    });
    return res.status(500).json({});
    }
});

const PORT = 8000;

app.listen(PORT, () => console.log ('Server started on PORT ' + PORT))