module.exports = {
  name: "ping",
  description: "ping command.",
  cooldown: 4,
  usage: "```yaml\nUsage: e!ping\n```",
  execute(message, args) {
    message.channel.send("Pong!");
  },
};

