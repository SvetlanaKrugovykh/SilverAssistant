const { buttonsConfig } = require('../modules/keyboard')
const { users } = require('../users/users.model')
const menu = require('../modules/common_menu')
const { textInput } = require('../modules/common_functions')
const { isThisGroupId } = require('../modules/bot')
const { globalBuffer, selectedByUser } = require('../globalBuffer')
const { commonStartMenu } = require('../modules/common_menu')
const validDataValues = [
  'ru_en', 'ru_de', 'ru_es', 'ru_pl', 'ru_fr', 'ru_it',
  'en_ru', 'de_ru', 'es_ru', 'pl_ru', 'fr_ru', 'it_ru'
]

function getCallbackData(text) {
  try {
    for (const buttonSet of Object.values(buttonsConfig)) {
      for (const langButtons of Object.values(buttonSet.buttons)) {
        for (const buttonRow of langButtons) {
          for (const button of buttonRow) {
            if (button.text === text) {
              return button.callback_data
            }
          }
        }
      }
    }
    return null
  } catch (error) { console.log(error) }
}

async function handler(bot, msg) {
  const chatId = msg?.chat?.id
  if (!chatId || !msg?.text) return

  const data = getCallbackData(msg.text)

  let selected_ = null
  if (!selectedByUser[chatId]) selectedByUser[chatId] = {}
  if (!globalBuffer[chatId]) globalBuffer[chatId] = {}
  let lang = selectedByUser[chatId]?.language || 'en'

  if (validDataValues.includes(data)) {
    const dataExt = data
    pinTranslateDirection(dataExt, msg)
    return
  }

  console.log('The choice is:', data)
  switch (data) {
    case '0_1':
      selected_ = await textInput(bot, msg, data, selectedByUser[chatId])
      if (selected_) selectedByUser[chatId] = selected_
      break
    case '0_2':
      await menu.notTextScene(bot, msg, false)
      break
    case '0_3':
      await menu.settingsMenu(bot, msg, lang)
      break
    case '1_1':
      await menu.chooseTranslateDirectionMenu(bot, msg)
      break
    default:
      await menu.commonStartMenu(bot, msg, true)
  }
}


function pinTranslateDirection(dataExt, msg) {
  const chatId = msg?.chat?.id
  const lang = dataExt.split('_')[0]
  const direction = dataExt.split('_')[1]

  if (chatId && lang && direction) {
    if (!selectedByUser[chatId]) selectedByUser[chatId] = {}
    selectedByUser[chatId].language = lang
    selectedByUser[chatId].direction = direction
    console.log(selectedByUser[chatId])
  }
}

module.exports = { handler }