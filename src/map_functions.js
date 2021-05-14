module.exports = {
  /**
   * returns map's image
   * @param {string} mapname - map's name
   */
  get_map_picture(mapname) {
    const aliasFound = aliases.find((map) => map.includes(mapname))
    if (!aliasFound) {
      return 0
    } else {
      return aliasFound[PICTURE_INDEX]
    }
  },

  /**
   * returns map's hex color
   * @param {string} mapname - map's name
   */
  get_map_color(mapname) {
    const aliasFound = aliases.find((map) => map.includes(mapname))
    if (!aliasFound) {
      return 0
    } else {
      return aliasFound[COLOR_INDEX]
    }
  },

  /**
   * returns map's full name
   * @param {string} mapalias - map's alias (example: ski, xdr, buzz...)
   */
  get_map_by_aliases(mapalias) {
    const aliasFound = aliases.find((map) => map.includes(mapalias))
    if (!aliasFound) {
      return 0
    } else {
      return aliasFound[MAPNAME_INDEX]
    }
  },
}

/*  IMPORTANT: structure:
[
  "hex color"
  "imgur image"
  "original map full name"
  "alias1..."
  "alias2..."
  "alias3..."
  "..."
]
*/

/* TY to umicycle fofo for helping getting all the hexcolors and pictures  */

const aliases = [
  [
    "#2c5b9c",
    "https://i.imgur.com/5IjozjO.png",
    "surf_greatriver_xdre4m_era",
    "xdr",
    "xdream",
    "xdre4m",
    "greatriver_xdream",
    "greatriver_xdre4m",
  ],
  [
    "#9dc4fa",
    "https://i.imgur.com/9dElAnJ.png",
    "surf_greatriver_evil_v2",
    "evil",
    "greatriver_evil",
  ],
  [
    "#d19c38",
    "https://i.imgur.com/Gg9xStx.png",
    "surf_ski_2_inf_v1e",
    "ski_2_go",
    "ski_2",
    "ski2",
  ],
  [
    "#e0c082",
    "https://i.imgur.com/MUk8iIm.png",
    "surf_ski_3_nova_inf_v1e",
    "ski3",
    "ski_3",
  ],
  [
    "#9c7c40",
    "https://i.imgur.com/1YaERQc.png",
    "surf_banocanyon_e",
    "bano",
    "banocanyon",
  ],
  [
    "#f5edd7",
    "https://i.imgur.com/V33qqGb.png",
    "surf_buckwild2_so_v4",
    "buckwild",
    "buckwild2",
    "buckwild_2",
    "buck-wild",
    "buck_wild_2",
  ],
  [
    "#070a07",
    "https://i.imgur.com/uly6GaP.jpg",
    "surf_colos2",
    "colos",
    "colos2",
  ],
  [
    "#d6d4ce",
    "https://i.imgur.com/y8py8s1.png",
    "surf_greatriver_csgofix_e",
    "greatriver_classic",
    "classic",
    "csgofix",
  ],
  ["#3ba182", "https://i.imgur.com/hs5vys2.png", "surf_quadpipe", "quadpipe"],
  [
    "#c4aa68",
    "https://i.imgur.com/C537Bgs.png",
    "surf_pyramidduel_e",
    "pyramid",
    "pyra",
    "pyramidduel",
    "pyramid-duel",
    "pyraduel",
  ],
  [
    "#8a7f63",
    "https://i.imgur.com/yEFWM9I.png",
    "surf_home_sweet_home_v4",
    "hsh",
    "homesweethome",
    "home-sweet-home",
    "home_sweet_home",
  ],
  [
    "#c7bf93",
    "https://i.imgur.com/kQ1Dfij.jpg",
    "surf_skyscraper_v5",
    "skyscraper",
    "skyscr",
  ],
  ["#f5cb71", "https://i.imgur.com/6omdrnb.jpg", "surf_japan_ptad_v5", "japan"],
  [
    "#f5b771",
    "https://i.imgur.com/BFOO26U.jpg",
    "surf_ny_bigloop_nf_e",
    "bigloop",
    "big_loop",
    "big-loop",
  ],
  [
    "#ebd4a9",
    "https://i.imgur.com/C9yTfaQ.png",
    "surf_buzzkill2_zavv",
    "buzz",
    "buzzkill",
    "buzzkill2",
    "buzz2",
  ],
  [
    "#d6b26f",
    "https://i.imgur.com/qvO4yBI.png",
    "surf_dust2_2015",
    "dust",
    "dust2",
    "dust2015",
    "dust2_2015",
    "dust_2015",
  ],
  [
    "#9c6424",
    "https://i.imgur.com/sYpC9qk.png",
    "surf_skyworld_nf_v2e",
    "skyworld",
  ],
  [
    "#ffd500",
    "https://i.imgur.com/d0uoOkw.png", // TODO xd
    "surf_monster_dust2_era",
    "monster",
    "monster_dust2",
    "monster_dust_2",
    "monsterdust2",
  ],
  ["#ebd598", "https://i.imgur.com/KlAmkD1.png", "surf_4fun", "4fun"],
  ["#a16b33", "https://i.imgur.com/dekiOBd.jpg", "surf_xiv_csgo_rfix", "xiv"],
  ["#f5bd82", "https://i.imgur.com/WPE1U7v.jpg", "surf_aspaya", "aspaya"],
  [
    "#ffbb00",
    "https://i.imgur.com/9oKakT7.jpg",
    "surf_10x_reloaded_nf_v2",
    "10x",
    "10x_reloaded",
    "10xreloaded",
  ],
]

const COLOR_INDEX = 0,
  PICTURE_INDEX = 1,
  MAPNAME_INDEX = 2

