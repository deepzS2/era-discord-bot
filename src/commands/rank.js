const { MessageEmbed } = require("discord.js")
const { EE_DB, EE_PW, EE_HOST, EE_USER } = require("../config")
const mysql = require("mysql")
const { getSteamByURL } = require("../functions")
const steamConverter = require("../utils/steamConverter")

const urlRegex = /https:\/\/steamcommunity.com\/id\/[A-Za-z0-9_.]+/g
const regexId = /^STEAM_[0-5]:[01]:\d+$/g
const regex64 = /^[0-9]{17}$/g

module.exports = {
  name: "rank",
  description: "Rank/stats command.",
  usage: "e!rank <Steam url or id>",
  cooldown: 10,
  footer: "THIS COMMAND SHOWS YOU THE PLAYER ",
  disabled: false,
  async execute(message, args, client) {
    if (args.length !== 1)
      return message.reply(
        "❌  **wrong usage**, please check **`e!help rank`**  😾"
      )

    const steam = args[0]
    let id = ""

    try {
      if (urlRegex.test(steam)) id = await getSteamByURL(steam)

      if (!id && (regexId.test(steam) || regex64.test(steam)))
        id = steamConverter(steam)

      const connection = mysql.createConnection({
        host: EE_HOST,
        user: EE_USER,
        password: EE_PW,
        database: EE_DB,
      })

      connection.connect((err) => {
        if (err) {
          console.error(err)

          return message.reply(
            "**Something went wrong while connecting to database, try again later!**     :pensive: "
          )
        }

        const embed = new MessageEmbed()
          .setColor("#f7790a")
          .setAuthor("🏆 ERAnk 🏆")

        if (!id) {
          return connection.query(
            `SELECT * FROM erank WHERE name = '${steam}'`,
            (error, results, fields) => {
              if (error) {
                console.error(error)

                return message.reply(
                  "**Something went wrong while connecting to database, try again later!**     :pensive: "
                )
              }

              if (results.length > 1) {
                embed.setTitle(`${steam}'s rank! Found multiple values!`)

                results.forEach((player) => {
                  const { desc, url } = beautifyEmbed(player)

                  embed.addField(
                    player.name,
                    `**[Check profile](${url})**\n${desc}`
                  )
                })

                return message.channel.send(embed)
              }

              const player = results[0]

              const { desc, url } = beautifyEmbed(player)

              embed
                .setTitle(`${player.name} rank!`)
                .setURL(url)
                .setDescription(desc)

              connection.end()

              return message.channel.send(embed)
            }
          )
        }

        connection.query(
          `SELECT * FROM erank WHERE steamid = ${id}`,
          (error, results, fields) => {
            if (error)
              return message.reply(
                "**Something went wrong while connecting to database, try again later!**     :pensive: "
              )

            const player = results[0]

            const { desc, url } = beautifyEmbed(player)

            embed
              .setTitle(`${player.name} rank!`)
              .setURL(url)
              .setDescription(desc)

            connection.end()

            return message.channel.send(embed)
          }
        )
      })
    } catch (error) {
      message.reply(error.message)
    }
  },
}

function beautifyEmbed(player) {
  const kd = player.kills / player.deaths
  const desc = `> 🔫 ${player.kills} kills\n> ☠️ ${
    player.deaths
  } deaths\n > 📉 ${kd.toFixed(2)} KD`
  const url = "https://steamcommunity.com/profiles/" + player.steamid

  return { desc, url }
}
