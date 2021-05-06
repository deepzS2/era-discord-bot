const SteamAPI = require("steamapi")

const { STEAM_KEY } = require("./config")
const steam = new SteamAPI(STEAM_KEY)

module.exports = {
  is_admin(message) {
    if (
      message.member.roles.cache.some(
        (role) => role.name === "Server Admins"
      ) ||
      message.member.roles.cache.some((role) => role.name === "Owners")
    ) {
      return 1
    } else {
      return 0
    }
  },
  async getSteamByURL(url) {
    try {
      return await steam.resolve(url)
    } catch (error) {
      throw new Error(
        "**Something went wrong while trying to getting Steam ID, try again later!**     :pensive: "
      )
    }
  },
}
