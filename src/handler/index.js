// Maybe could be changed on the future to handle more things :D
const fs = require("fs");

module.exports = function (client) {
  const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
  }
};
