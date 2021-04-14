module.exports = {
  name: "ping",
  description: "ping command.",
  usage: '```yaml\nUsage: e!ping\n```',
  execute(message, args) {
    message.channel.send("Pong!");
  }
};