require("dotenv").config()

const config = {
  TOKEN: process.env.TOKEN,
  PREFIX: "e!",

  /* change these to test locally */
  ERA_DISCORD: process.env.ERA_DISCORD,
  DISCORD_ERROR_CHANNEL: process.env.DISCORD_ERROR_CHANNEL,

  EE_HOST: process.env.EE_HOST,
  EE_USER: process.env.EE_USER,
  EE_PW: process.env.EE_PW,
  EE_DB: process.env.EE_DB,

  STEAM_API: process.env.STEAM_API,
}

module.exports = config
