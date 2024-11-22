const buttonsConfig = {
  starterButtons: {
    title: {
      en: 'Please select an action',
      ru: 'Оберіть, будь ласка, дію'
    },
    options: [{ resize_keyboard: true }],
    buttons: {
      en: [
        [{ text: '🟣   Input phrase for translate', callback_data: '0_1' }],
        [{ text: '🔵   Get translation', callback_data: '0_5' }],
        [{ text: '🖊️🎤 Ask something', callback_data: '0_2' }],
        [{ text: '⚙️   Settings', callback_data: '0_3' }],
        [{ text: '🏠', callback_data: '0_4' }]
      ],
      ru: [
        [{ text: '🟣   Введите текст для перевода', callback_data: '0_1' }],
        [{ text: '🔵   Получить перевод', callback_data: '0_5' }],
        [{ text: '🖊️🎤 Задайте вопрос', callback_data: '0_2' }],
        [{ text: '⚙️   Установки', callback_data: '0_3' }],
        [{ text: '🏠', callback_data: '0_4' }]
      ]
    }
  },
  settingsButtons: {
    title: {
      en: 'Please select an action',
      ru: 'Оберіть, будь ласка, дію'
    },
    options: [{ resize_keyboard: true }],
    buttons: {
      en: [
        [{ text: '🥢 Translate direction', callback_data: '1_1' }],
        [{ text: '🏠', callback_data: '0_4' }]
      ],
      ru: [
        [{ text: '🥢  Направление перевода ', callback_data: '1_1' }],
        [{ text: '🏠', callback_data: '0_4' }]
      ]
    }
  },
  chooseTranslateDirection: {
    title: {
      en: 'Выберете направление перевода',
      ru: 'Choose translate direction'
    },
    options: [{ resize_keyboard: true }],
    buttons: {
      en: [
        [{ text: '🇬🇧 ru - en', callback_data: 'ru_en' }],
        [{ text: '🇩🇪 ru - de', callback_data: 'ru_de' }],
        [{ text: '🇪🇸 ru - es', callback_data: 'ru_es' }],
        [{ text: '🇵🇱 ru - pl', callback_data: 'ru_pl' }],
        [{ text: '🇫🇷 ru - fr', callback_data: 'ru_fr' }],
        [{ text: '🇮🇹 ru - it', callback_data: 'ru_it' }],
        [{ text: '🇬🇧 en - ru', callback_data: 'en_ru' }],
        [{ text: '🇩🇪 de - ru', callback_data: 'de_ru' }],
        [{ text: '🇪🇸 es - ru', callback_data: 'es_ru' }],
        [{ text: '🇵🇱 pl - ru', callback_data: 'pl_ru' }],
        [{ text: '🇫🇷 fr - ru', callback_data: 'fr_ru' }],
        [{ text: '🇮🇹 it - ru', callback_data: 'it_ru' }],
        [{ text: '↩️', callback_data: '0_3' }],
        [{ text: '🏠', callback_data: '0_4' }]
      ],
      ru: [
        [{ text: '🇬🇧 ru - en', callback_data: 'ru_en' }],
        [{ text: '🇩🇪 ru - de', callback_data: 'ru_de' }],
        [{ text: '🇪🇸 ru - es', callback_data: 'ru_es' }],
        [{ text: '🇵🇱 ru - pl', callback_data: 'ru_pl' }],
        [{ text: '🇫🇷 ru - fr', callback_data: 'ru_fr' }],
        [{ text: '🇮🇹 ru - it', callback_data: 'ru_it' }],
        [{ text: '🇬🇧 en - ru', callback_data: 'en_ru' }],
        [{ text: '🇩🇪 de - ru', callback_data: 'de_ru' }],
        [{ text: '🇪🇸 es - ru', callback_data: 'es_ru' }],
        [{ text: '🇵🇱 pl - ru', callback_data: 'pl_ru' }],
        [{ text: '🇫🇷 fr - ru', callback_data: 'fr_ru' }],
        [{ text: '🇮🇹 it - ru', callback_data: 'it_ru' }],
        [{ text: '↩️', callback_data: '0_3' }],
        [{ text: '🏠', callback_data: '0_4' }]
      ]
    }
  }
}


const texts = {
  en: {
    'welcome': 'is here to welcome you,',
    'block': 'Sorry, but you cannot use this bot',
    '0_0': 'We are open \n <b>Monday - Friday 8:00 - 17:00 </b>\n <b>Saturday 9:00-15:00</b>',
    '0_1': 'Sorry, there was an error sending the file.',
    '0_2': 'Leave a text message below.',
    '0_3': 'You have not left a meaningful message. Please try again',
    '0_4': 'Thank you! Your message has been sent.\n Wait for a response within 30 minutes',
    '0_5': 'There was an error processing your request.',
    '0_6': 'Sorry, you are too far from our café to place an order.',
    '0_7': 'Added:',
    '0_8': 'Removed:',
    '0_9': 'No products selected',
    '0_10': 'Selected products',
    '0_11': 'Send Order',
    '0_12': 'Cancel Order',
    '0_13': 'To send the message, select the products',
    '0_14': 'Time of order obtaining',
    '0_15': 'Your order has been accepted. Wait for the order to be ready for pickup. Total amount:',
  },
  ru: {
    'welcome': 'тут, щоб привітати вас,',
    'block': 'Вибачте, але Ви не можете використовувати цей бот',
    '0_0': 'Ми працюємо \n <b>Понеділок - П\'ятниця 8:00 - 17:00</b> \n <b>Субота 9:00-15:00</b>',
    '0_1': 'Вибачте, сталася помилка під час відправлення файлу.',
    '0_2': 'Залиште текстове повідомлення нижче.',
    '0_3': 'Ви не залишили змістовного повідомлення. Будь ласка, спробуйте ще раз',
    '0_4': 'Дякуємо! Ваше повідомлення відправлено.\n Очікуйте відповіді протягом 30 хвилин',
    '0_5': 'Під час обробки вашого запиту сталася помилка.',
    '0_6': "Вибачте, ви занадто далеко від нашої кав'ярні, щоб зробити замовлення.",
    '0_7': 'Додано:',
    '0_8': 'Видалено:',
    '0_9': 'Продукти не вибрані',
    '0_10': 'Вибрані продукти',
    '0_11': 'Відправити замовлення',
    '0_12': 'Скасувати замовлення',
    '0_13': 'Для відправлення повідомлення виберіть продукти',
    '0_14': 'Час отримання замовлення',
    '0_15': 'Ваше замовлення прийнято. Очікуйте готовності замовлення для видачі. Загальна сума:',
  }
}
module.exports = { buttonsConfig, texts }
