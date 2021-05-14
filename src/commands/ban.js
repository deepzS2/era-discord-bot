const { EE_HOST, EE_USER, EE_PW, EE_DB } = require("../config")

const { is_admin, is_bans_chat } = require("../functions")
const steamConverter = require("../utils/steamConverter")

module.exports = {
  name: "ban",
  description: "ban command.",
  args: [
    { name: "`<name>`", value: "*player's name*", inline: false },
    { name: "`<steamid>`", value: "*player's steamid*", inline: false },
    {
      name: "`<time>`",
      value: "*ban time in minutes (0 = permanent)*",
      inline: false,
    },
    { name: "`<reason>`", value: "*ban reason*", inline: false },
  ],
  usage: "e!ban <name> <steamid> <time> <reason>",
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
      //era eu and sa
      return message.reply(
        "❌  **wrong usage**, this command is only available on **`#bans`** chat 😾"
      )
    }

    if (args.length < 3) {
      return message.reply(
        "❌  **wrong usage**, please check **`e!help ban`** 😾"
      )
    }

    var mysql = require("mysql")
    var connection = mysql.createConnection({
      host: EE_HOST,
      user: EE_USER,
      password: EE_PW,
      database: EE_DB,
    })

    const name = args.shift()
    let steamid = args.shift()
    const time = args.shift()
    const reason = args.join(" ")

    try {
      steamid = steamConverter(steamid)
      // Better using typeof (typeof name !== "string")
      if (isNaN(time)) {
        return message.reply(
          "❌  **error! `<time>`** argument needs to be number, please check **``e!help ban``** ❌"
        )
      }

      let query_check =
        "SELECT player_steamid, ban_length FROM eraevil_bans WHERE player_steamid = '" +
        steamid +
        "'"

      connection.connect()
      connection.query(query_check, function (error, results, fields) {
        if (error) console.log(error)
        if (results.length) {
          return message.reply(
            "🚷  user **`" + steamid + "`** is already banned  🚷"
          )
        } else {
          // todo: fix this ban query (get admin name that banned)
          let query_ban =
            "REPLACE INTO eraevil_bans (player_name, player_steamid, ban_length, ban_reason, admin_name, timestamp) VALUES ( '" +
            name +
            "', '" +
            steamid +
            "', '" +
            time +
            "', '" +
            reason +
            "', '" +
            message.member.user.tag +
            "', CURRENT_TIMESTAMP())"
          connection.query(query_ban, function (error, results, fields) {
            if (error) {
              console.log(query_ban)
              console.log(error)
            } else {
              let bantime = time == 0 ? "permanently" : time + " minutes"
              message.reply(
                "❌  you have banned " + name + " (https://steamcommunity.com/profiles/" + steamid + ") (" +
                  bantime +
                  ")  ❌"
              )
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
