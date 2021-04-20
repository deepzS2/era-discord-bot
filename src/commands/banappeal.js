const { ERA_DISCORD } = require("../config");
const { MessageEmbed } = require("discord.js");

const Discord = require("discord.js");
const client = new Discord.Client();

// needs fixxx

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

    if (message.channel.type != "dm") {
      message.delete();
      message.author.send("hi, use that commands here, check **`e!help banappeal`**");
      return;
    }

    // check if player is banned from mysql
    // check if player alerady has req a ban appeal in the past or one atm

    const playername = args.shift();
    const steamlink = args.shift();
    const reason = args.join(" ");

    const embed = new MessageEmbed()
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
      const server = client.guilds.cache.get(ERA_DISCORD);
      console.log(ERA_DISCORD);
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

  },
};

/* todo
function cmd_banappeal(msg, args) {
  

  
} */