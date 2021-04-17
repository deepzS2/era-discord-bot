require("dotenv").config();

const config = {
  TOKEN: process.env.TOKEN,
  PREFIX: "e!",

  /* change these to test locally */

  ERA_DISCORD: process.env.ERA_DISCORD,

  EE_BANS_HOST: process.env.EE_BANS_HOST,
  EE_BANS_DB: process.env.EE_BANS_DB,
  EE_BANS_USER: process.env.EE_BANS_USER,
  EE_BANS_PW: process.env.EE_BANS_PW,

  EE_TOPSPEED_HOST: process.env.EE_TOPSPEED_HOST,
  EE_TOPSPEED_DB: process.env.EE_TOPSPEED_DB,
  EE_TOPSPEED_USER: process.env.EE_TOPSPEED_USER,
  EE_TOPSPEED_PW: process.env.EE_TOPSPEED_PW,
};

module.exports = config;
