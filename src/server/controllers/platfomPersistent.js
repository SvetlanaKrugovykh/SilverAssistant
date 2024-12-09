const axios = require('axios')
const menu = require('../data/consts')

module.exports.setPersistentMenuFB = async function () {
  const PAGE_ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN
  const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER

  const url = `https://graph.facebook.com/${process.env.API_VERSION}/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`

  const data = {
    get_started: {
      payload: "GET_STARTED_PAYLOAD"
    },
    persistent_menu: [
      {
        locale: "default",
        composer_input_disabled: false,
        call_to_actions: [
          {
            type: "web_url",
            title: "Goto WhatsApp",
            url: `https://wa.me/${WHATSAPP_NUMBER}?text=Hi!`,
            webview_height_ratio: "full"
          },
          {
            type: "web_url",
            title: "Load Presentation",
            url: process.env.PRESENTATION_URL,
            webview_height_ratio: "full"
          },
          {
            type: "web_url",
            title: "About Us",
            url: process.env.ABOUT_US_URL,
            webview_height_ratio: "full"
          },
          {
            type: "web_url",
            title: "Our Contacts",
            url: process.env.CONTACTS_URL,
            webview_height_ratio: "full"
          }
        ]
      }
    ]
  }

  try {
    const response = await axios.post(url, data, {
      headers: { 'Content-Type': 'application/json' }
    })

    console.log('Persistent Menu created:', response.data)
  } catch (error) {
    console.error('Error creating Persistent Menu:', error.response ? error.response.data : error.message)
  }
}

module.exports.sendWelcomeMessage = async function (recipientId) {
  const PAGE_ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN
  const url = `https://graph.facebook.com/${process.env.API_VERSION}/me/messages?access_token=${PAGE_ACCESS_TOKEN}`

  const lang = 'en'
  const quickReplies = Object.entries(menu.startMenu[lang])
    .slice(0, 13)
    .map(([key, value]) => ({
      content_type: "text",
      title: value.description,
      payload: key
    }))

  const messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "Welcome! Press the button ♒ to change the options.",
      quick_replies: quickReplies
    }
  }

  try {
    const response = await axios.post(url, messageData, {
      headers: { 'Content-Type': 'application/json' }
    })
    console.log('Welcome message sent:', response.data)
  } catch (error) {
    console.error('Error sending welcome message:', error.response ? error.response.data : error.message)
  }
}

module.exports.sendMultipleChoice = async function (recipientId) {
  const PAGE_ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN
  const url = `https://graph.facebook.com/${process.env.API_VERSION}/me/messages?access_token=${PAGE_ACCESS_TOKEN}`

  const lang = 'en'
  const elements = Object.entries(menu.menuItems[lang]).map(([key, value]) => ({
    title: value.description,
    image_url: value.image_url,
    buttons: [
      {
        type: "postback",
        title: "Select",
        payload: key
      }
    ]
  }))

  const sendElements = async (elementsChunk) => {
    const messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: elementsChunk
          }
        }
      }
    }

    try {
      const response = await axios.post(url, messageData, {
        headers: { 'Content-Type': 'application/json' }
      })
      console.log('Multiple choice message sent:', response.data)
    } catch (error) {
      console.error('Error sending multiple choice message:', error.response ? error.response.data : error.message)
    }
  }
  for (let i = 0; i < elements.length; i += 10) {
    const elementsChunk = elements.slice(i, i + 10)
    await sendElements(elementsChunk)
  }
}