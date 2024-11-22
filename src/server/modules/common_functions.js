const { inputLineScene } = require('../controllers/inputLine')
const { globalBuffer, selectedByUser } = require('../globalBuffer')

module.exports.textInput = async function (bot, msg) {
  try {
    let inputLength = 15
    const txtCommand = await inputLineScene(bot, msg)

    if (!txtCommand || txtCommand.length < inputLength) {
      await bot.sendMessage(msg.chat.id, 'that`s not enough\n', { parse_mode: 'HTML' })
    }
    selectedByUser[msg.chat.id].text = txtCommand
    console.log('Text:', txtCommand)
  } catch (err) {
    console.log(err)
  }
}