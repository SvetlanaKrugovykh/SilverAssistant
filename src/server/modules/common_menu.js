const fs = require('fs')
const path = require('path')
const axios = require('axios')
const { menuStarter } = require('../controllers/clientsAdmin')
require('dotenv').config()
const { buttonsConfig, texts } = require('./keyboard')
const { users } = require('../users/users.model')
const { callTranslate } = require('../services/translation')
const { callSpeechToTxt } = require('../services/speechToTxt')

module.exports.commonStartMenu = async function (bot, msg, home = false) {
  console.log(`/start at ${new Date()} tg_user_id: ${msg.chat.id}`)
  const adminUser = users.find(user => user.id === msg.chat.id)
  if (adminUser) {
    await menuStarter(bot, msg, buttonsConfig["starterButtons"])
  } else {
    await blockMenu(bot, msg)
  }
}

module.exports.settingsMenu = async function (bot, msg, lang = "en") {
  await bot.sendMessage(msg.chat.id, buttonsConfig["settingsButtons"].title[lang], {
    reply_markup: {
      keyboard: buttonsConfig["settingsButtons"].buttons[lang],
      resize_keyboard: true
    }
  })
}

module.exports.chooseTranslateDirectionMenu = async function (bot, msg, lang = "en") {
  await bot.sendMessage(msg.chat.id, buttonsConfig["chooseTranslateDirection"].title[lang], {
    reply_markup: {
      keyboard: buttonsConfig["chooseTranslateDirection"].buttons[lang],
      resize_keyboard: true
    }
  })
}

module.exports.chooseNativeLanguageMenu = async function (bot, msg, lang = "en") {
  await bot.sendMessage(msg.chat.id, buttonsConfig["chooseNativeLanguage"].title[lang], {
    reply_markup: {
      keyboard: buttonsConfig["chooseNativeLanguage"].buttons[lang],
      resize_keyboard: true
    }
  })
}

module.exports.notTextScene = async function (bot, msg, lang = "en") {
  const GROUP_ID = process.env.GROUP_ID
  try {
    const chatId = msg.chat.id
    await bot.sendMessage(chatId, `<i>${texts[lang]['0_2']}\n</i>`, { parse_mode: "HTML" })

    const collectedMessages = []

    const handleMessage = async (message) => {
      if (message.text) {
        collectedMessages.push({ type: 'text', content: message.text })
      } else if (message.photo) {
        const fileId = message.photo[message.photo.length - 1].file_id
        collectedMessages.push({ type: 'photo', fileId })
      } else if (message.document) {
        const fileId = message.document.file_id
        collectedMessages.push({ type: 'document', fileId })
      } else if (message.audio) {
        const fileId = message.audio.file_id
        collectedMessages.push({ type: 'audio', fileId })
      } else if (message.voice) {
        const fileId = message.voice.file_id
        collectedMessages.push({ type: 'voice', fileId })
      }
    }

    bot.on('message', async (message) => {
      if (message.chat.id === chatId) {
        await handleMessage(message)
      }
    })

    await new Promise((resolve) => setTimeout(resolve, 30000))

    for (const message of collectedMessages) {
      if (message.type === 'text') {
        await bot.sendMessage(GROUP_ID, `Message from ${msg.chat.first_name} ${msg.chat.last_name} (ID: ${msg.chat.id}):\n${message.content}`, { parse_mode: "HTML" })
      } else {
        await bot.sendMessage(GROUP_ID, `Message from ${msg.chat.first_name} ${msg.chat.last_name} (ID: ${msg.chat.id}):`, { parse_mode: "HTML" })
        if (message.type === 'photo') {
          await bot.sendPhoto(GROUP_ID, message.fileId)
        } else if (message.type === 'document') {
          await bot.sendDocument(GROUP_ID, message.fileId)
        } else if (message.type === 'audio') {
          await bot.sendAudio(GROUP_ID, message.fileId)
        } else if (message.type === 'voice') {
          const dirPath = path.join(__dirname, '../../../users/downloads')
          fs.mkdirSync(dirPath, { recursive: true })
          const filePath = path.join(dirPath, `${message.fileId}.ogg`)
          await downloadFile(bot, message.fileId, filePath)
          await callSpeechToTxt(bot, msg, { file: { buffer: fs.readFileSync(filePath), originalname: `${message.fileId}.ogg` } })
          await bot.sendVoice(GROUP_ID, message.fileId)
          console.log(`Voice file saved to ${filePath}`)
        }
      }
    }

    await bot.sendMessage(chatId, texts[lang]['0_4'], { parse_mode: "HTML" })

  } catch (err) {
    console.log(err)
    await bot.sendMessage(msg.chat.id, texts[lang]['0_5'])
  }
}

async function blockMenu(bot, msg, lang = "en") {
  await bot.sendMessage(msg.chat.id, texts[lang]['0block'], {})
}

module.exports.translation = async function (bot, msg, data) {
  const chatId = msg?.chat?.id
  if (!chatId || !msg?.text) return

  await callTranslate(bot, msg, data)
}

async function downloadFile(bot, fileId, dest) {
  const file = await bot.getFile(fileId)
  const url = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${file.file_path}`
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  return new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(dest)
    response.data.pipe(writer)
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}