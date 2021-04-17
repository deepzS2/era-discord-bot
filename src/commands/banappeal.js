module.exports = {
  name: "banappeal",
  description: "ban appeal command.",
  args: [ 
    { name: "`<name>`", value: "*your ingame nickname*", inline: true },
    { name: "`<steamid>`", value: "*your current steam account link*", inline: true, },
    { name: "`<reason>`", value: "*reason on why we should unban you*", inline: true, }
  ],
  usage: "e!banappeal <name> <steamid> <reason>",
  cooldown: 10, //100000000000000
  disabled: true,
  execute(message, args) {
    message.reply("test");
  },
};

/* todo
function cmd_banappeal(msg, args) {
  if (msg.channel.type != "dm") {
    msg.delete();
    msg.author.send("Hi :] Use my commands here. `e!help`");
    return;
  }

  if (args.length < 3) {
    const embed = new Discord.MessageEmbed()
      .setAuthor(
        "ERA DISCORD BOT",
        "https://i.imgur.com/hOuIomW.png",
        "https://steamcommunity.com/groups/EraSurfCommunity"
      )
      .setThumbnail("https://i.imgur.com/vrRImoI.png")
      .setColor("#fc8c03")
      .setTitle(":information_source:  Ban appeal usage  :information_source:")
      .setDescription("```e!banappeal <name> <link> <reason>```")
      .addFields(
        { name: "name", value: "your ingame nickname", inline: true },
        {
          name: "link",
          value: "your current steam account link",
          inline: true,
        },
        {
          name: "reason",
          value: "reason on why we should unban you",
          inline: true,
        }
      )
      .setFooter(
        "USING THIS COMMAND IN A NON SERIOUS WAY WILL RESULT IN A BAN",
        "https://i.imgur.com/cj2KuzF.png"
      );
    msg.author.send(embed);
    return;
  }

  // check if player is banned from mysql
  // check if player alerady has req a ban appeal in the past or one atm

  const playername = args.shift();
  const steamlink = args.shift();
  const reason = args.join(" ");

  const embed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle(":oncoming_police_car: NEW BAN APPEAL :oncoming_police_car:")
    .setTimestamp()
    .setAuthor(
      "ERA DISCORD BOT",
      "https://i.imgur.com/hOuIomW.png",
      "https://steamcommunity.com/groups/EraSurfCommunity"
    )
    .setDescription("Lets decide if we keep this player banned or not.")
    .setThumbnail("https://i.imgur.com/vrRImoI.png")
    .addFields(
      { name: ":user:  Player name:", value: playername },
      { name: ":steam:  Steam link:", value: steamlink },
      { name: ":speech_balloon:  Reason:", value: reason }
    );

  setTimeout(() => {
    const server = client.guilds.cache.get(config.ERA_DISCORD);
    server.channels.create("banappeal-" + playername); // fix permissions for admins only and player that requested!
    setTimeout(() => {
      const channel = server.channels.cache.find(
        (guild) => guild.name === "banappeal-" + playername
      );
      channel.send(embed);
      channel.send("@here ```Unban " + playername + " ?```");
    }, 2000);
  }, 1000);

  //create timer of 2 days or atleast X votes?
} */