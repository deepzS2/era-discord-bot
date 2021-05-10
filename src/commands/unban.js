const { EE_HOST, EE_USER, EE_PW, EE_DB } = require("../config")
const steamConverter = require("../utils/steamConverter")
const { is_admin, is_bans_chat } = require("../functions")

module.exports = {
  name: "unban",
  description: "unban command.",
  args: [{ name: "`<steamid>`", value: "*player's steamid*", inline: false }],
  usage: "e!unban <steamid>",
  cooldown: 5,
  footer: "PLEASE THINK TWICE BEFORE USING THIS COMMAND",
  disabled: false,
  execute(message, args, client) {
    if (message.channel.type != "dm" && !is_admin(message)) {
      return message.reply(
        "hmmm you have no permission to use this command 👨‍🦲"
      )
    }

    if (!is_bans_chat(message)) {
      return message.reply(
        "❌  **wrong usage**, this command is only available on **`#bans`** chat 😾"
      )
    }

    if (args.length != 1) {
      return message.reply(
        "❌  **wrong usage**, please check **`e!help unban`** 😾"
      )
    }

    // maybe check if steamid format string is right

    var mysql = require("mysql")
    var connection = mysql.createConnection({
      host: EE_HOST,
      user: EE_USER,
      password: EE_PW,
      database: EE_DB,
    })

    let steamid = args.shift()
    try {
      steamid = steamConverter(steamid)
      let query_check =
        "SELECT player_steamid, ban_length FROM eraevil_bans WHERE player_steamid = '" +
        steamid +
        "'"

      connection.connect()
      connection.query(query_check, function (error, results, fields) {
        if (error) console.log(error)
        if (!results.length) {
          return message.reply("🚷  user **`" + steamid + "`** is not banned  🚷")
        } else {
          // todo: fix this ban query
          let query_unban =
            "DELETE FROM eraevil_bans WHERE player_steamid ='" + steamid + "'"
          connection.query(query_unban, function (error, results, fields) {
            if (error) {
              console.log(query_ban)
              console.log(error)
            } else {
              message.reply("✅  you have unbanned https://steamcommunity.com/profiles/" + steamid + "  ✅")
            }
          })
        }
        connection.end()
      })
    } catch (error) {
      return message.reply(error.message)
    }
  },
}
