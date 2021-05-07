const SteamAPI = require("steamapi")

const { STEAM_API } = require("./config")
const steam = new SteamAPI(STEAM_API)

module.exports = {
  is_admin(message) {
    if (
      message.member.roles.cache.some(
        (role) => role.name === "Server Admins"
      ) ||
      message.member.roles.cache.some((role) => role.name === "Owners") ||
      message.member.roles.cache.some((role) => role.name === "Owner") ||
      message.member.roles.cache.some((role) => role.name === "Admin+")
    ) {
      return 1
    } else {
      return 0
    }
  },
  getSteamByURL: async function (url) {
    try {
      return await steam.resolve(url)
    } catch (error) {
      throw new Error(
        "**Something went wrong while trying to getting Steam ID, try again later!**     :pensive: "
      )
    }
  },
}
