module.exports = {
  name: "banappeal",
  description: "ban appeal command.",
  args: [ 
    { name: "`<name>`", value: "your ingame nickname", inline: true },
    { name: "`<steamid>`", value: "your current steam account link", inline: true, },
    { name: "`<reason>`", value: "reason on why we should unban you", inline: true, }
  ],
  usage: "e!banappeal <name> <steamid> <reason>",
  cooldown: 10, //100000000000000
  execute(message, args) {
    // todo (code on bot js lol)
  },
};