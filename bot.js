const { Telegraf } = require("telegraf");
const { message } = require('telegraf/filters');
const chatClient = require("./chat.js");
const { BOT_TOKEN } = require("./config.js");
const bot = new Telegraf(BOT_TOKEN);
bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.catch((err, ctx) => {
    console.log(err);

});
bot.command("chat_text", async ctx => {
    const cmdRegexp = new RegExp("^/chat_text(@(\\w+))?(\\s|$)(.+)?", "i");
    const text = ctx.message.text;
    const result = cmdRegexp.exec(text);
    if (!result || !result[4]) {
        return;
    }
    const response = await chatClient.createChatCompletion({
        model: "gpt-3.5-turbo",
        "messages": [{ role: "user", content: result[4] }]

    });
    if (!response.data || !response.data.choices) {
        return;
    }
    return ctx.reply(response.data.choices[0].message.content);
});

bot.command("chat_image", async (ctx) => {
    const cmdRegexp = new RegExp("^/chat_image(@(\\w+))?(\\s|$)(.+)?", "i");
    const text = ctx.message.text;
    const result = cmdRegexp.exec(text);
    if (!result || !result[4]) {
        return;
    }
    const response = await chatClient.createImage({
        prompt: result[4],
        n: 1,
        size: "1024x1024"
    });

    if (!response.data || response.data.data.length === 0) {
        return;
    }
    return ctx.sendPhoto(response.data.data[0].url);
})
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
module.exports = bot;