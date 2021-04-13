require("dotenv").config();

const config = {
  token: process.env.TOKEN,
  prefix: "e!",
  eraID: process.env.ERA_DISCORD,
};

module.exports = config;
