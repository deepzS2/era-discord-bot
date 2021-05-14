const Gamedig = require('gamedig');
const Discord = require('discord.js');
const logger = require("../logger")
const { get_map_picture, get_map_color } = require("../map_functions");

module.exports = {
  name: "players",
  description: "shows current server state (players + map).",
  //args:
  usage: "e!players",
  cooldown: 5,
  disabled: false,
  execute(message, args, client) {
    // TODO: ADD support to ERA SA! (passing it by argument, for exmaple, e!players eu | e!players sa)

    if (args.length > 1) {
      return message.reply(
        "❌  **wrong usage**, please check **`e!help players`** 😾"
      )
    }

    Gamedig.query({
      type: 'csgo',
      host: '148.251.11.171',
      port: '28015',
    }).then((state) => {

      console.log(state);
      let title = state.name.replace('[Ultima CS:GO] ', '[EU] ');
      let descr = '\n🏄‍♂️ **IP:** `connect '+state.connect+'` \n\n' + '🗺️ **Map:** `'+ state.map+'` \n\n👥 **Players online:**```\n';

      const embed = new Discord.MessageEmbed()
        .setColor(get_map_color(state.map))
        .setTitle(title + ' <:era:734586744602624010> <:evil:803358676110016523>' )
        .setDescription(descr + state.players.map(player => player.name).join("\n") + '\n```')
        .setImage(get_map_picture(state.map)) 
        .setTimestamp();

      
      message.reply(embed);
    }).catch((error) => {
      logger({ error, client, author: message.author.username, command: "players" });
      return message.reply("owo something went wrong! server offline or query failed 😔");
    });

  },
}

