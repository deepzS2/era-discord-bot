require("dotenv").config();

const config = {
  TOKEN: process.env.TOKEN,
  PREFIX: "e!",
  ERA_DISCORD: process.env.ERA_DISCORD,
};

module.exports = config;
