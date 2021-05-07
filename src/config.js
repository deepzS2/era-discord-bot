require("dotenv").config()

const config = {
  TOKEN: process.env.TOKEN,
  PREFIX: "e!",

  /* change these to test locally */

  ERA_DISCORD: process.env.ERA_DISCORD,

  EE_HOST: process.env.EE_HOST,
  EE_USER: process.env.EE_USER,
  EE_PW: process.env.EE_PW,
  EE_DB: process.env.EE_DB,

  EE_BANS_DB: process.env.EE_BANS_DB,
  EE_BANS_USER: process.env.EE_BANS_USER,
  EE_BANS_PW: process.env.EE_BANS_PW,

  STEAM_API: process.env.STEAM_API,
}

module.exports = config
