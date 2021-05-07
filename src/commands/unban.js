const { EE_HOST, EE_BANS_USER, EE_BANS_PW, EE_BANS_DB } = require("../config")

const { is_admin } = require("../functions")

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
        "hmmm you have no permission to use this command  👨‍🦲"
      )
    }

    if (message.channel.id != "825754706390286386") {
      return message.reply(
        "❌  **wrong usage**, this command is only available on **`#bans`** chat  😾"
      )
    }

    if (args.length != 1) {
      return message.reply(
        "❌  **wrong usage**, please check **`e!help unban`**  😾"
      )
    }

    // maybe check if steamid format string is right

    var mysql = require("mysql")
    var connection = mysql.createConnection({
      host: EE_HOST,
      user: EE_BANS_USER,
      password: EE_BANS_PW,
      database: EE_BANS_DB,
    })

    const steamid = args.shift()

    if (!isNaN(steamid)) {
      return message.reply(
        "❌  **error! `<steamid>`** argument invalid, please check **``e!help unban``**  ❌"
      )
    }

    let query_check =
      "SELECT steam_id, ban_length FROM eraevil_bans WHERE steam_id = '" +
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
          "DELETE FROM eraevil_bans WHERE steam_id ='" + steamid + "'"
        connection.query(query_unban, function (error, results, fields) {
          if (error) {
            console.log(query_ban)
            console.log(error)
          } else {
            message.reply("✅  you have unbanned **`" + steamid + "`**  ✅")
          }
        })
      }
      connection.end()
    })
  },
}
