const { Message } = require("discord.js")
const SteamAPI = require("steamapi")

const { STEAM_API } = require("./config")
const steam = new SteamAPI(STEAM_API)

module.exports = {
  /**
   * Check if the message author is admin
   * @param {Message} message - The discord message instance
   */
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

  /**
   * Returns true if we are on #bans chnanel, false otherwise.
   * @param {Message} message - The discord message instance
   */
  is_bans_chat(message) {
    return (message.channel.id === "825754706390286386" || message.channel.id === "648501239587405829");
  },

  /**
   * Get user by URL
   * @param {string} url - The steam custom url
   */
  getSteamByURL: async function (url) {
    try {
      return await steam.resolve(url)
    } catch (error) {
      throw new Error(
        "**Something went wrong while trying to getting Steam ID, try again later!**     :pensive: "
      )
    }
  },
  /**
   * Get user summary with Steam ID
   * @param {string} id - Steam 64
   */
  getUserSummary: async function (id) {
    try {
      return await steam.getUserSummary(id)
    } catch (error) {
      throw new Error(
        "**Something went wrong while trying to getting steam summary, try again later!**     :pensive: "
      )
    }
  },
}
