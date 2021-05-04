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
}
