const { MessageEmbed } = require("discord.js");
const { EE_HOST, EE_USER, EE_PW, EE_DB } = require("../config");
const { get_map_picture, get_map_color, get_map_by_aliases } = require("../map_functions");

/*
feel free to optimize this command xD
*/

module.exports = {
  name: "topspeed",
  description: "check top speed from a specific map.",
  args: [
    {
      name: "`<map>`",
      value: "*map that you wanna know the top speed of*",
      inline: false,
    },
    {
      name: "`[count]`",
      value: "*how many players? (1 = shows only TOP 1)*",
      inline: false,
    },
  ],
  usage: "e!topspeed <map> [count]",
  cooldown: 10,
  disabled: false,
  //footer: "IN CASE YOU DONT KNOW MAP NAMES, USE e!maplist OR e!mappool", // todo (easy tho)
  execute(message, args, client) {
    if (args.length < 1 || args.length > 2) {
      return message.reply(
        "❌  **wrong usage**, please check **`e!help topspeed`** 😾"
      )
    }

    let map = args[0]
    let count = 1 // default value, check later if user is using it as argument

    if (!isNaN(map)) {
      return message.reply(
        "❌  **error! `<map>`** argument needs to be map name, please check **``e!help topspeed``** ❌"
      )
    }

    if (args.length == 2) {
      count = args[1]
      if (isNaN(count)) {
        return message.reply(
          "❌  **error! `<count>`** argument needs to be number, please check **``e!help topspeed``** ❌"
        )
      } else if (count > 10) {
        return message.reply(
          "❌  **error! `<count>`** argument needs to be less than 10 ❌"
        )
      }
    }

    let mapname = get_map_by_aliases(map)
    if (!mapname) {
      return message.reply("map not found 😔")
    }

    map = mapname

    var mysql = require("mysql")
    var connection = mysql.createConnection({
      host: EE_HOST,
      user: EE_USER,
      password: EE_PW,
      database: EE_DB,
    })

    let query_topspeed =
      "SELECT name, speed  FROM topspeed WHERE map = '" +
      map +
      "' ORDER BY speed DESC LIMIT " +
      count +
      ""
    console.log(query_topspeed)

    connection.connect()
    connection.query(query_topspeed, function (error, results, fields) {
      if (error) console.log(error);
      if (results.length) {
        const topspeedmap_embed = new MessageEmbed()
          .setColor(get_map_color(map))
          .setTitle("Top speed on `" + map + "`  🏄‍♂️")
          .setImage(get_map_picture(map))
        //.setAuthor("ERA DISCORD BOT", "https://i.imgur.com/vrRImoI.png", "https://steamcommunity.com/groups/EraSurfCommunity");

        const medals = [" 🥇", " 🥈", " 🥉", " 🎖️"]
        let i = 1
        results.forEach((player) => {
          topspeedmap_embed.addField(
            medals[i >= 4 ? 3 : i - 1] + " " + i++ + ". " + player.name,
            player.speed + " u/s"
          )
        })

        connection.end()
        return message.reply(topspeedmap_embed)
      } else {
        console.log("[-] no data was found on map " + map)
        connection.end()
        return message.reply(`no data found  😔`)
      }
    })
  },
}
