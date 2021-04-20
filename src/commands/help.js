<<<<<<< HEAD
const { PREFIX } = require("../config");
=======
const { prefix } = require("../config");
>>>>>>> 90a25f2... feature: embeds ✨
const { MessageEmbed } = require("discord.js");

module.exports = {
  //fields
  name: "help",
  description: "displays all of our commands or specific command info.",
  args: [
    {
      name: "<command>",
      value: "*command that you want to know about*",
      inline: false,
    },
  ],
  usage: "e!help (<command>)",
  cooldown: 3,
  footer: "USING ONLY e!help WILL SHOW YOU ALL OUR COMMANDS; NOTE: < > = REQUIRED , [ ] = OPTIONAL",
  disabled: false,

  //run: e!help or e!help <command>
  execute(message, args) {
<<<<<<< HEAD
    // all our bot commands
    const { commands } = message.client;

    // create cool embed with all the commands/individual command info
    const embed = new MessageEmbed()
      .setColor("#fc8c03")
      .setThumbnail("https://i.imgur.com/vrRImoI.png")
      //.setAuthor("ERA DISCORD BOT", "https://i.imgur.com/hOuIomW.png", "https://steamcommunity.com/groups/EraSurfCommunity");

    // if e!help was used
    if (!args.length) {
      embed.setTitle("🔹 Commands").setFooter('FOR SPECIFIC COMMAND USAGE, TRY e!help <command>');
      commands.forEach((command) => {
        if (command.name) embed.addField(`${PREFIX}${command.name}`, command.description);
      });
=======
    // The client.commands collection
    const { commands } = message.client;

    // The embed
    const embed = new MessageEmbed()
      .setColor("#fc8c03")
      .setAuthor(
        "ERA DISCORD BOT",
        "https://i.imgur.com/hOuIomW.png",
        "https://steamcommunity.com/groups/EraSurfCommunity"
      )
      .setThumbnail("https://i.imgur.com/vrRImoI.png");

    // If display all commands
    if (!args.length) {
      embed.setTitle("Commands");

      commands.forEach((command) => {
        embed.addField(`${prefix}${commandName}`, command.description);
      });

      return message.author
        .send(embed)
        .then(() => {
          if (message.channel.type === "dm") return;

          message.reply(`I\'ve sent you a DM with all my commands!`);
        })
        .catch((error) => {
          console.error(
            `Could not send help DM to ${message.author.tag}.\n`,
            error
          );
          message.reply(
            `It seems like I can\'t DM you! Do you have DMs disabled?`
          );
        });
    }
>>>>>>> 90a25f2... feature: embeds ✨

      return message.reply(embed);
    }
    //else, e!help <command> was used so display info about the invidual command

    // get <command>
    const cmd_arg = args[0].toLowerCase();
    const command = commands.get(cmd_arg);

    /* 
    // get aliases maybe? || commands.find(c => c.aliases && c.aliases.includes(name)); 
    */

<<<<<<< HEAD
    if (!command) return message.reply(`that\'s not a valid command  😔`);

    embed.setTitle("🔹 " + command.name);
    embed.setDescription(command.description + '```yaml\nUsage: ' + command.usage + '\n```');
=======
    embed.setTitle(command.name);

    if (command.description);
    embed.setDescription(command.description);

    // if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
    // if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
>>>>>>> 90a25f2... feature: embeds ✨

    //if (command.cooldown) embed.addField("Cooldown time", `${command.cooldown} seconds`);
    if (command.args)     embed.addFields(command.args);
    if (command.footer)   embed.setFooter(command.footer);

    message.channel.send(embed);
  },
};

