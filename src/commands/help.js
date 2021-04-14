const { PREFIX } = require("../config");
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
  usage: "```yaml\nUsage: e!help (<command>)\n```",
  cooldown: 5,
  footer: "USING ONLY e!help WILL SHOW YOU ALL OUR COMMANDS",

  //run: e!help or e!help <command>
  execute(message, args) {
    // all our bot commands
    const { commands } = message.client;

    // create cool embed with all the commands/individual command info
    const embed = new MessageEmbed()
      .setColor("#fc8c03")
      .setThumbnail("https://i.imgur.com/vrRImoI.png")
      .setAuthor(
        "ERA DISCORD BOT",
        "https://i.imgur.com/hOuIomW.png",
        "https://steamcommunity.com/groups/EraSurfCommunity"
      );

    // if e!help was used
    if (!args.length) {
      embed.setTitle("🔹 Commands");
      commands.forEach((command) => {
        if (command.name)
          embed.addField(`${PREFIX}${command.name}`, command.description);
      });

      return message.author
        .send(embed)
        .then(() => {
          if (message.channel.type === "dm") return;
          message.react("🇩");
          message.react("🇲");
        })
        .catch((error) => {
          console.error(
            "[-] Could not send help DM to " + message.author.tag + ".\n",
            error
          );
          message.reply(
            "It seems like I can't DM you! Do you have DMs disabled?"
          );
        });
    }
    //else, e!help <command> was used so display info about the invidual command

    // get <command>
    const cmd_arg = args[0].toLowerCase();
    const command = commands.get(cmd_arg);

    /* 
    // get aliases maybe? || commands.find(c => c.aliases && c.aliases.includes(name)); 
    */

    if (!command) return message.reply(`That\'s not a valid command :(`);

    embed.setTitle("🔹 " + command.name);
    embed.setDescription(command.description + command.usage);

    if (command.cooldown)
      embed.addField("Cooldown time", `${command.cooldown} seconds`);
    if (command.args) embed.addFields(command.args);
    if (command.footer) embed.setFooter(command.footer);

    // Cooldown for antispam maybe?
    // data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

    message.channel.send(embed);
  },
};

