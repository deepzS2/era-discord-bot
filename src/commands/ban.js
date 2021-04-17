const { EE_BANS_HOST } = require("../config");
const { EE_BANS_DB } = require("../config");
const { EE_BANS_USER } = require("../config");
const { EE_BANS_PW } = require("../config");

function is_admin(message) {
    if (    message.member.roles.cache.some(role => role.name === 'Server Admins')
        ||  message.member.roles.cache.some(role => role.name === 'Owner')) {
        return 1
    }
    else {
        return 0;
    }
}

module.exports = {
    name: "ban",
    description: "ban command.",
    args: [ 
        { name: "`<name>`", value: "*player's name*", inline: false },
        { name: "`<steamid>`", value: "*player's steamid*", inline: false },
        { name: "`<time>`", value: "*ban time in minutes (0 = permanent)*", inline: false, },
        { name: "`<reason>`", value: "*ban reason*", inline: false, }
    ],
    usage: "e!ban <steamid> <time> <reason>",
    cooldown: 5,
    footer: "PLEASE THINK TWICE BEFORE USING THIS COMMAND",
    disabled: false,
    execute(message, args) {

        if (message.channel.type != "dm" && !is_admin(message)) {
            return message.reply('hmmm you have no permission to use this command  👨‍🦲');
        }

        if (message.channel.id != '825754706390286386') {
            return message.reply('❌  **wrong usage**, this command is only available on **`#bans`** chat  😾');
        }

        if (args.length < 3) {
            return message.reply('❌  **wrong usage**, please check **`e!help ban`**  😾');
        }

        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: config.EE_BANS_HOST, 
            user: config.EE_BANS_USER, 
            password: config.EE_BANS_PW, 
            database: config.EE_BANS_DB
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