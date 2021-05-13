const config = require("./config");

const Discord = require("discord.js");
const client = new Discord.Client();

const { handler } = require("./handler");

const Gamedig = require('gamedig');

// To store commands of the bot
client.commands = new Discord.Collection();

// To store each user command cooldown
client.cooldowns = new Discord.Collection();

handler(client);


process.on('uncaughtException', function (err) {
  console.log(err);
})


client.on("ready", () => {
  console.log("Connected as " + client.user.tag);

  set_bot_activity();
  setInterval(() => { set_bot_activity() }, 60000 * 10); // every 10 minuets
});

function set_bot_activity() {
  console.log("Trying to query server...");
  Gamedig.query({
    type: 'csgo',
    host: '148.251.11.171',
    port: '28015',
  }).then((state) => {
    let str = `${state.name.replace('[Ultima CS:GO] ', '')} - (${state.players.length}/${state.maxplayers}) on ${state.map} 🏄‍♂️`;
    console.log("Success! Setting bot activity to: " + str);
    client.user.setActivity(str, { type: "PLAYING" });
    //console.log(state);
  }).catch((error) => {
    console.log("Server is offline / query failed! \n Error: " + error);
  });
}


client.on("message", (msg) => {
  // very dumb way of doing it but ok (this is for the unban voting emojis)
  if (msg.content.includes("Unban") && msg.author == client.user) {
    msg.react("✅");
    msg.react("❌");
  }

  if (!msg.content.startsWith(config.PREFIX) || msg.author.bot) return;

  const args = msg.content.slice(config.PREFIX.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();

  if (!client.commands.has(cmd))  return msg.reply('that command does not exist 👨‍🦲');

  if (client.commands.get(cmd).disabled) return msg.reply('that command is disabled 👨‍🦲');
  
  const { cooldowns } = client;

  // If there is no cooldowns to the command create one
  if (!cooldowns.has(cmd.name)) cooldowns.set(cmd.name, new Discord.Collection());
  
  // The time now in milliseconds
  const now = Date.now();

  // Get the timestamp
  const timestamp = cooldowns.get(cmd.name);

  // Cooldown amount
  const cooldownAmount = (cmd.cooldown || 3) * 1000;

  // If there is a timestamp with the user id
  if (timestamp.has(msg.author.id)) {
    // Calculate expiration time
    const expirationTime = timestamp.get(msg.author.id) + cooldownAmount;

    // didn't expired yet
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return msg.reply(`please wait ${timeLeft.toFixed(1)} second(s) before using the **\`${cmd}\`** command again 😩`);
    }
  }

  // Set the timestamps with user id and the timestamp in milliseconds
  timestamp.set(msg.author.id, now);

  // Timeout to delete after cooldown amount
  setTimeout(() => timestamp.delete(msg.author.id), cooldownAmount);

  try {
    client.commands.get(cmd).execute(msg, args, client);
  } catch (error) {
    console.error(error);
    msg.reply("noooo there was an issue executing the command 😔");
  }
});


client.login(config.TOKEN);