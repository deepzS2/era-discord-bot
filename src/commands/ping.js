module.exports = {
  // The command name (we can have aliases too)
  name: "ping",

  // Description for help command (we can have usage too, etc.)
  description: "Ping command",

  // What the command will do
  execute(message, args) {
    message.channel.send("Pong!");
  },
};
