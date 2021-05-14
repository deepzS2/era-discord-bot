const { DISCORD_ERROR_CHANNEL, ERA_DISCORD } = require("./config")
const { Client, MessageEmbed } = require("discord.js")

/**
 * Log error to the channel
 * @param {Object} args - The object with error, client and command name
 * @param {Error} args.error - The error
 * @param {Client} args.client - The discord instance
 * @param {string} args.command - Command name
 * @param {string} args.author - The user who tried to use the command
 */
module.exports = function (args) {
  const { error, client, command, author } = args

  const guild = client.guilds.cache.find((guild) => guild.id === ERA_DISCORD)

  if (guild) {
    const channel = guild.channels.cache.find((channel) => channel.id === DISCORD_ERROR_CHANNEL)

    if (channel) {
      const embed = new MessageEmbed()
        .setTitle(`${command} error!`)
        .setAuthor(`Command executed by ${author}`)
        .setColor("#ff3333")
        .setDescription(error.message)

      channel.send(embed)
    }
  }
}
