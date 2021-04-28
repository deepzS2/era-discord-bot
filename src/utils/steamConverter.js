const bigInt = require("big-integer")

// Error not being handled the bot should do it

/**
 * Convert the Steam ID to 64 or just return the Steam 64
 * @param {string} steam - The Steam 64 or Steam ID
 */
module.exports = function (steam) {
  const baseNum = bigInt("76561197960265728")
  const regexId = /^STEAM_[0-5]:[01]:\d+$/
  const regex64 = /^[0-9]{17}$/

  if (regex64.test(steam)) return steam

  if (!regexId.test(steam))
    throw new Error("❌  **wrong usage**, please provide a valid Steam ID   😾")

  const split = steam.split(":"),
    x = split[1],
    y = split[2]

  if (x && y)
    return baseNum
      .plus(y * 2)
      .plus(x)
      .toString()

  throw new Error("❌  **Oops**, something went wrong converting Steam ID   😔")
}
