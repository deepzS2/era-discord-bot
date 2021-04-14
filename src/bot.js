const config = require("./config");

const Discord = require("discord.js");
const client = new Discord.Client();


const { handler } = require("./handler");

// To store commands of the bot
client.commands = new Discord.Collection();

handler(client);

client.on("ready", () => {
  console.log("Connected as " + client.user.tag);
  client.user.setActivity("ON ERA/EVIL CSURF SERVERS", { type: "PLAYING" });
});

client.on("message", (msg) => {
  // very dumb way of doing it but ok (this is for the unban voting emojis)
  if (msg.content.includes("Unban") && msg.author == client.user) {
    msg.react("✅");
    msg.react("❌");
  }

  if (!msg.content.startsWith(config.PREFIX) || msg.author.bot) return;

  const args = msg.content.slice(config.PREFIX.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();

  if (!client.commands.has(cmd)) return;

  try {
    client.commands.get(cmd).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply('There was an issue executing that command :(');
  }
});

/*
function process_command(msg) {
  const args = msg.content.slice(config.PREFIX.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();

  switch (cmd) {
    case "help": {
      cmd_help(msg);
      break;
    }
    case "banappeal": {
      cmd_banappeal(msg, args);
      break;
    }
    //case 'delete': { cmd_delete(msg, args); break; }
    default: {
      msg.author.send("Command not found :[ Try ``e!help``");
      break;
    }
  }
}

function cmd_help(msg) {
  const embed = new Discord.MessageEmbed()
    .setAuthor(
      "ERA DISCORD BOT",
      "https://i.imgur.com/hOuIomW.png",
      "https://steamcommunity.com/groups/EraSurfCommunity"
    )
    .setColor("#fc8c03")
    .setTitle("Commands")
    .setThumbnail("https://i.imgur.com/vrRImoI.png")
    .addFields(
      { name: "e!help", value: "displays all of our commands" },
      {
        name: "e!banappeal",
        value: "appeal a ban for our admins to discuss it",
      }
    );
  if (msg.channel.type != "dm") msg.channel.send(embed);
  else msg.author.send(embed);
  return;
}

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
}

/*
function cmd_delete(msg, arg) {
    if (arg.length != 1 || isNaN(arg)) {
        const embed = new Discord.MessageEmbed()
            .setAuthor('ERA DISCORD BOT', 'https://i.imgur.com/hOuIomW.png', 'https://steamcommunity.com/groups/EraSurfCommunity')
            .setThumbnail('https://i.imgur.com/vrRImoI.png').setColor('#fc8c03')
            .setTitle(':information_source: Delete messages usage :information_source:').setDescription('```e!delete <n>```')
            .addFields({ name: 'n', value: 'number of messages to be deleted', inline: true })
        msg.author.send(embed);
    }

    msg.delete(1000);
    msg.channel.bulkDelete(arg);
}
*/

client.login(config.TOKEN);
