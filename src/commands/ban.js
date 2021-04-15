module.exports = {
    name: "ban",
    description: "ban command.",
    args: [ 
        { name: "`<steamid>`", value: "*player's steamid*", inline: false },
        { name: "`<time>`", value: "*ban time in minutes (0 = permanent)*", inline: false, },
        { name: "`<reason>`", value: "*ban reason*", inline: false, }
    ],
    usage: "e!ban <steamid> <time> <reason>",
    cooldown: 5,
    footer: "PLEASE THINK TWICE BEFORE USING THIS COMMAND",
    execute(message, args) {

        if (args.length < 3) {
            return message.reply('❌  **wrong usage**, please check **`e!help ban`**  😾');
        }

        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'eraevil_bans'
        });

        const steamid = args.shift();
        const time = args.shift();
        const reason = args.join(" ");

        if (isNaN(time)) {
            return message.reply('❌  **error! `<time>`** argument needs to be number, please check **``e!help ban``**  ❌');
        } else if (!isNaN(steamid)) {
            return message.reply('❌  **error! `<steamid>`** argument invalid, please check **``e!help ban``**  ❌');
        } else if (!isNaN(reason)) {
            return message.reply('❌  **error! `<reason>`** argument invalid, please check **``e!help ban``**  ❌');
        }

        let query_check = 'SELECT steam_id, ban_length FROM eraevil_bans WHERE steam_id = \''+steamid+'\'';
        
        connection.connect();

        connection.query(query_check, function (error, results, fields) {
            if (error) throw error;
            if (results.length) {
               return message.reply('🚷  user **`'+steamid+'`** is already banned  🚷');
            } else {
                // todo: fix this ban query
                let query_ban = `REPLACE INTO eraevil_bans VALUES (player_name, steam_id, ban_length, ban_reason, banned_by, timestamp)`;
                connection.query(query_ban, function (error, results, fields) {
                    if (error) throw error;
                    else {
                        let bantime = time==0?'permanently':time+' minutes';
                        message.reply('❌  you have banned **`'+steamid+'`** ('+bantime+')  ❌');
                    }
                });
            }
            connection.end();
          });
           
          

    },
  };