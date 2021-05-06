require("dotenv").config()

const config = {
  TOKEN: process.env.TOKEN,
  PREFIX: "e!",

  /* change these to test locally */

  ERA_DISCORD: process.env.ERA_DISCORD,

  EE_HOST: process.env.EE_HOST,
  EE_USER: process.env.EE_USER,
  EE_PW: process.env.EE_PW,

  EE_BANS_DB: process.env.EE_BANS_DB,
  EE_TOPSPEED_DB: process.env.EE_TOPSPEED_DB,
  EE_RANK_DB: process.env.EE_RANK_DB,

  STEAM_API: process.env.STEAM_API,
}

module.exports = config
