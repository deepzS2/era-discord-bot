module.exports = {
    name: "unban",
    description: "unban command.",
    args: [ 
        { name: "`<steamid>`", value: "*player's steamid*", inline: false },
    ],
    usage: "e!unban <steamid>",
    cooldown: 5,
    footer: "PLEASE THINK TWICE BEFORE USING THIS COMMAND",
    execute(message, args) {

        if (args.length != 1) {
            return message.reply('❌  **wrong usage**, please check **`e!help unban`**  😾');
        }

        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'eraevil_bans'
        });

        const steamid = args.shift();

        if (!isNaN(steamid)) {
            return message.reply('❌  **error! `<steamid>`** argument invalid, please check **``e!help unban``**  ❌');
        }

        let query_check = 'SELECT steam_id, ban_length FROM eraevil_bans WHERE steam_id = \''+steamid+'\'';
        
        connection.connect();

        connection.query(query_check, function (error, results, fields) {
            if (error) throw error;
            if (!results.length) {
               return message.reply('🚷  user **`'+steamid+'`** is not banned  🚷');
            } else {
                // todo: fix this ban query
                let query_unban = 'DELETE FROM eraevil_bans WHERE steam_id =\''+steamid+'\'';
                connection.query(query_unban, function (error, results, fields) {
                    if (error) throw error;
                    else {
                        message.reply('✅  you have unbanned **`'+steamid+'`**  ✅');
                    }
                });
            }
            connection.end();
        });
    },
};