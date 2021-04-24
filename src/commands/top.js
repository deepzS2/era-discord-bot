const { MessageEmbed } = require("discord.js")
const {
  EE_HOST,
  EE_USER,
  EE_PW,
  EE_DB,
} = require("../config")

module.exports = {
    name: "top",
    description: "shows top players from ERAnk.",
    usage: "e!top [count]",
    args: [
      {
        name: "`[count]`",
        value: "*how many players? (1 = shows only TOP 1) (max = 5)*",
        inline: false,
      },
    ],
    //footer: "",
    disabled: false,
    execute(message, args, client) {
      
      let count = 1
  
      if (args.length) {
        count = args[0]
        if (isNaN(count)) {
          return message.reply(
            "❌  **error! `<count>`** argument needs to be number, please check **``e!help top``** ❌"
          )
        } else if (count > 5) {
          return message.reply(
            "❌  **error! `<count>`** argument needs to be less than 5 ❌"
          )
        }
      }

      var mysql = require("mysql")
      var connection = mysql.createConnection({
        host: EE_HOST,
        user: EE_USER,
        password: EE_PW,
        database: EE_DB,
      })

      let query_top = "SELECT steamid, name, kills, deaths FROM erank ORDER BY kills DESC LIMIT "+count+""
      console.log(query_top)

      var TodayDate = new Date();
      var m = TodayDate.getMonth();
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

      connection.connect()
      connection.query(query_top, function (error, results, fields) {
      if (error) console.log(error);
      if (results.length) {
        const top_embed = new MessageEmbed()
          .setColor("#f7790a")
          .setTitle("🏆 ERAnk 🏆")
          .setDescription(months[m] + ' top players 🏄‍♂️')
          //.setImage("https://i.imgur.com/vrRImoI.png") // get image from his steam url and use it :P
          //.setAuthor("ERA DISCORD BOT", "https://i.imgur.com/vrRImoI.png", "https://steamcommunity.com/groups/EraSurfCommunity");

        const medals = [" 🥇", " 🥈", " 🥉", ""]
        let i = 1
        results.forEach((player) => {
          let kd = player.kills / player.deaths;
          let profile = 'https://steamcommunity.com/profiles/'+player.steamid;
          desc = '> 🔫 '+player.kills + ' kills  \n > ☠️ '+ player.deaths + " deaths  \n > 📉 "+kd.toFixed(2)+" KD"; 
          top_embed.addField(medals[i >= 4 ? 3 : i - 1] + " " + i++ + ". " + player.name, desc, false);
        })

        connection.end()
        return message.reply(top_embed)
      } else {
        console.log("[-] no top data was found")
        connection.end()
        return message.reply(`no data found 😔`)
      }
    })


    },
  }