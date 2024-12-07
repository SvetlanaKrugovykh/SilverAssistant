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

bot.on('text', async (msg) => {
  if (msg.text.startsWith('platform:')) {
    console.log('Received platform message:', msg.text)
    await menu.commonStartMenu(bot, msg, true)
  }
})

bot.on('callback_query', async (callbackQuery) => {
  await bot.answerCallbackQuery(callbackQuery.id)
  const action = callbackQuery.data
  const msg = callbackQuery.message
  const inlineKeyboard = msg.reply_markup.inline_keyboard
  const text = inlineKeyboard[0][0].text
  const senderIdMatch = text.match(/sender_id:\s(\d+)/)
  const senderId = senderIdMatch ? senderIdMatch[1] : null
  if (!senderId) {
    console.log('sender_id not found:', text)
    return
  }

  console.log('Callback query received:', action)

  if (action === 'reply') {
    await bot.sendMessage(
      msg.chat.id,
      `✅ Reply message for: \nplatform: Facebook\nsender_id: 8886314851424435`
    )
  } else if (action === 'decline') {
    await bot.sendMessage(
      msg.chat.id,
      `❌ Decline message for: \nplatform: Facebook\nsender_id: 8886314851424435`
    )
  } else {
    console.log('Unknown action:', action)
  }
})

module.exports = { bot }
