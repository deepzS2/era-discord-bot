module.exports = {
  name: "ping",
  description: "ping command.",
  usage: "e!ping",
  cooldown: 4,
  footer: "THIS COMMAND HAS LITERALLY NO UTILITY BUT FEEL FREE TO USE IT",
  disabled: false,
  execute(message, args, client) {
    message.channel.send("Pong!")
  },
}
