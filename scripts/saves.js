export function getBrSaveNames() {
  let saves = [];
  if(game.settings.get("blind-roll-skills", "hideSaves")){
    saves.push(CONFIG.DND5E.abilities["str"] + " " + game.i18n.localize("br5e.chat.save"));
    saves.push(CONFIG.DND5E.abilities["dex"] + " " + game.i18n.localize("br5e.chat.save"));
    saves.push(CONFIG.DND5E.abilities["con"] + " " + game.i18n.localize("br5e.chat.save"));
    saves.push(CONFIG.DND5E.abilities["int"] + " " + game.i18n.localize("br5e.chat.save"));
    saves.push(CONFIG.DND5E.abilities["wis"] + " " + game.i18n.localize("br5e.chat.save"));
    saves.push(CONFIG.DND5E.abilities["cha"] + " " + game.i18n.localize("br5e.chat.save"));
  }
  return saves;
}
