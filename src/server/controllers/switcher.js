const { buttonsConfig } = require('../modules/keyboard')
const menu = require('../modules/common_menu')
const { textInput } = require('../modules/common_functions')
const { globalBuffer, selectedByUser } = require('../globalBuffer')
const fs = require('fs')
const path = require('path')
const validDataValues = [
  'ru_en', 'ru_de', 'ru_es', 'ru_fr',
  'en_ru', 'de_ru', 'es_ru', 'pl_ru', 'fr_ru'
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
  if (!data) return

  if (!selectedByUser[chatId]) selectedByUser[chatId] = getFromUserFile(chatId)

  if (!globalBuffer[chatId]) globalBuffer[chatId] = {}
  let lang = selectedByUser[chatId]?.language || 'en'

  if (validDataValues.includes(data)) {
    const dataExt = data
    pinTranslateDirection(dataExt, msg)
  }

  console.log('The choice is:', data)
  switch (data) {
    case '0_1':
      await textInput(bot, msg, data, selectedByUser[chatId])
      await menu.commonStartMenu(bot, msg, true)
      break
    case '0_2':
      await menu.notTextScene(bot, msg)
      break
    case '0_3':
      await menu.settingsMenu(bot, msg, lang)
      break
    case '0_5':
      await menu.translation(bot, msg, data)
      break
    case '0_7':
    case '0_9':
      pinNativeLanguage(data, msg)
      break
    case '1_1':
      await menu.chooseTranslateDirectionMenu(bot, msg)
      break
    case '1_2':
      await menu.chooseNativeLanguageMenu(bot, msg)
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
    pinToUserFile(chatId)
  }
}

function pinNativeLanguage(menuItem, msg) {
  try {
    const chatId = msg?.chat?.id
    let lang = 'en'
    if (menuItem === '0_9') lang = 'ru'

    if (chatId && lang) {
      if (!selectedByUser[chatId]) selectedByUser[chatId] = {}
      selectedByUser[chatId].nativeLanguage = lang
      console.log(selectedByUser[chatId])
      pinToUserFile(chatId)
    }
  } catch (err) {
    console.log(err)
    return
  }
}

function pinToUserFile(chatId) {
  try {
    if (!selectedByUser[chatId]) return
    const dirPath = path.join(__dirname, '../../../users/settings')
    const filePath = path.join(dirPath, `${chatId}.json`)

    fs.mkdirSync(dirPath, { recursive: true })
    fs.writeFileSync(filePath, JSON.stringify(selectedByUser[chatId], null, 2))
  } catch (error) {
    console.log('Error pinning to user file:', error)
  }
}

function getFromUserFile(chatId) {
  try {
    const filePath = path.join(__dirname, '../../../users/settings', `${chatId}.json`)
    return JSON.parse(fs.readFileSync(filePath))
  } catch (error) {
    console.log(`./users/settings/${chatId} not found`)
    return {}
  }
}

module.exports = { handler }