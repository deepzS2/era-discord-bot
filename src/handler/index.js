const path = require('path');
const fs = require("fs");

exports.handler = function(client) {
  const commandFiles = fs
    .readdirSync(path.join(__dirname, "..", "commands"))
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require('../commands/'+file);
    client.commands.set(command.name, command);
  }
};