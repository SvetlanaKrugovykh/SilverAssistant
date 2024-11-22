const { handler } = require('./controllers/switcher')
const { isThisGroupId } = require('./modules/bot')
const { bot } = require('./globalBuffer')

bot.on('message', async (msg) => {

  const chatId = msg.chat.id
  if (await isThisGroupId(bot, chatId, msg)) return

  await handler(bot, msg, undefined)
})

module.exports = { bot }
