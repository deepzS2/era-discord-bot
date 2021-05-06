const { MessageEmbed } = require("discord.js")
const { EE_RANK_DB, EE_PW, EE_HOST, EE_USER } = require("../config")
const mysql = require("mysql")
const { getSteamByURL } = require("../functions")
const steamConverter = require("../utils/steamConverter")

const urlRegex = /https:\/\/steamcommunity.com\/id\/[A-Za-z0-9_.]+/g

module.exports = {
  name: "rank",
  description: "Rank/stats command.",
  usage: "e!rank <Steam url or id>",
  cooldown: 10,
  footer: "THIS COMMAND SHOWS YOU THE PLAYER ",
  disabled: false,
  execute(message, args, client) {
    if (args.length !== 1)
      return message.reply(
        "❌  **wrong usage**, please check **`e!help rank`**  😾"
      )

    const steam = args[0]
    let id = 0

    try {
      if (urlRegex.test(steam)) id = getSteamByURL(steam)

      if (!id) id = steamConverter(steam)

      const connection = mysql.createConnection({
        host: EE_HOST,
        user: EE_USER,
        password: EE_PW,
        database: EE_RANK_DB,
      })

      connection.connect((err) => {
        if (err)
          return message.reply(
            "**Something went wrong while connecting to database, try again later!**     :pensive: "
          )

        connection.query(
          `SELECT * FROM erank WHERE steamid = ${id}`,
          (error, player) => {
            if (error)
              return message.reply(
                "**Something went wrong while connecting to database, try again later!**     :pensive: "
              )

            let kd = player.kills / player.deaths

            const embed = new MessageEmbed()
              .setColor("#f7790a")
              .setTitle("🏆 ERAnk 🏆")
              .setAuthor(player.name)
              .setURL("https://steamcommunity.com/profiles/" + player.steamid)
              .setDescription(
                `${results.name} rank! :man_surfing:\n> 🔫 ${
                  player.kills
                } kills\n> ☠️ ${player.deaths} deaths\n > 📉 ${kd.toFixed(
                  2
                )} KD`
              )

            return message.channel.send(embed)
          }
        )
      })
    } catch (error) {
      message.reply(error.message)
    }
  },
}
