module.exports = {
  apps: [
    {
      name: 'Visario',
      script: './src/server/server.js',
      watch: true,
      env: {
        NODE_ENV: 'development',
        TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
        DOWNLOAD_APP_PATH: process.env.DOWNLOAD_APP_PATH,
        API_VERSION: process.env.API_VERSION,
        APP_ID: process.env.APP_ID,
        FACEBOOK_PAGE_ACCESS_TOKEN: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
        INSTAGRAM_ACCESS_TOKEN: process.env.INSTAGRAM_ACCESS_TOKEN,
        WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER,
      },
      env_production: {
        NODE_ENV: 'production',
        TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
        DOWNLOAD_APP_PATH: process.env.DOWNLOAD_APP_PATH,
        API_VERSION: process.env.API_VERSION,
        APP_ID: process.env.APP_ID,
        FACEBOOK_PAGE_ACCESS_TOKEN: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
        INSTAGRAM_ACCESS_TOKEN: process.env.INSTAGRAM_ACCESS_TOKEN,
        WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER,
      },
    },
  ],
}