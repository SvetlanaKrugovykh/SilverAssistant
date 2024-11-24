const { handler } = require('./controllers/switcher')
const { isThisGroupId } = require('./modules/bot')
const { bot } = require('./globalBuffer')
const menu = require('./modules/common_menu')

bot.on('message', async (msg) => {

  if (await isThisGroupId(bot, msg.chat.id, msg)) return

  if (msg.text === '/start') {
    console.log(new Date())
    console.log(msg.chat)
    await menu.commonStartMenu(bot, msg, true)
  } else {
    await handler(bot, msg, undefined)
  }
})

module.exports = { bot }
