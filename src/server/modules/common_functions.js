const { inputLineScene } = require("../controllers/inputLine")

module.exports.textInput = async function (bot, msg, menuItem, selectedByUser) {
  try {
    let inputLength = 15
    const txtCommand = await inputLineScene(bot, msg)

    if (!txtCommand || txtCommand.length < inputLength) {
      await bot.sendMessage(msg.chat.id, 'that`s not enough\n', { parse_mode: 'HTML' })
      const { sendstarterButtons } = require('../controllers/clientsAdmin')
      await sendstarterButtons(bot, msg, 'en')
      return selectedByUser
    }
    if (menuItem === '5_1') {
      selectedByUser = { ...selectedByUser, ticketTitle: txtCommand }
    } else if (menuItem === '5_2') {
      selectedByUser = { ...selectedByUser, ticketBody: txtCommand }
    }
    const { sendstarterButtons } = require('../controllers/clientsAdmin')
    await sendstarterButtons(bot, msg, 'en')
    return selectedByUser
  } catch (err) {
    console.log(err)
    const { sendstarterButtons } = require('../controllers/clientsAdmin')
    await sendstarterButtons(bot, msg, 'en')
    return selectedByUser
  }
}