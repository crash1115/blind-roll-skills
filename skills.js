export function getSkillAbbreviations() {
  let skills = [];
  if(game.settings.get("blind-roll-skills", "hideAcrobatics")){ skills.push("acr");}
  if(game.settings.get("blind-roll-skills", "hideAnimalHandling")){ skills.push("ani");}
  if(game.settings.get("blind-roll-skills", "hideArcana")){ skills.push("arc");}
  if(game.settings.get("blind-roll-skills", "hideAthletics")){ skills.push("ath");}
  if(game.settings.get("blind-roll-skills", "hideDeception")){ skills.push("dec");}
  if(game.settings.get("blind-roll-skills", "hideHistory")){ skills.push("his");}
  if(game.settings.get("blind-roll-skills", "hideInsight")){ skills.push("ins");}
  if(game.settings.get("blind-roll-skills", "hideIntimidation")){ skills.push("itm");}
  if(game.settings.get("blind-roll-skills", "hideInvestigation")){ skills.push("inv");}
  if(game.settings.get("blind-roll-skills", "hideMedicine")){ skills.push("med");}
  if(game.settings.get("blind-roll-skills", "hideNature")){ skills.push("nat");}
  if(game.settings.get("blind-roll-skills", "hidePerception")){ skills.push("prc");}
  if(game.settings.get("blind-roll-skills", "hidePerformance")){ skills.push("prf");}
  if(game.settings.get("blind-roll-skills", "hidePersuasion")){ skills.push("per");}
  if(game.settings.get("blind-roll-skills", "hideReligion")){ skills.push("rel");}
  if(game.settings.get("blind-roll-skills", "hideSleightOfHand")){ skills.push("slt");}
  if(game.settings.get("blind-roll-skills", "hideStealth")){ skills.push("ste");}
  if(game.settings.get("blind-roll-skills", "hideSurvival")){ skills.push("sur");}
  return skills;
}

export function getSkillNames() {
  let skills = [];
  if(game.settings.get("blind-roll-skills", "hideAcrobatics")){ skills.push(CONFIG.DND5E.skills["acr"]);}
  if(game.settings.get("blind-roll-skills", "hideAnimalHandling")){ skills.push(CONFIG.DND5E.skills["ani"]);}
  if(game.settings.get("blind-roll-skills", "hideArcana")){ skills.push(CONFIG.DND5E.skills["arc"]);}
  if(game.settings.get("blind-roll-skills", "hideAthletics")){ skills.push(CONFIG.DND5E.skills["ath"]);}
  if(game.settings.get("blind-roll-skills", "hideDeception")){ skills.push(CONFIG.DND5E.skills["dec"]);}
  if(game.settings.get("blind-roll-skills", "hideHistory")){ skills.push(CONFIG.DND5E.skills["his"]);}
  if(game.settings.get("blind-roll-skills", "hideInsight")){ skills.push(CONFIG.DND5E.skills["ins"]);}
  if(game.settings.get("blind-roll-skills", "hideIntimidation")){ skills.push(CONFIG.DND5E.skills["itm"]);}
  if(game.settings.get("blind-roll-skills", "hideInvestigation")){ skills.push(CONFIG.DND5E.skills["inv"]);}
  if(game.settings.get("blind-roll-skills", "hideMedicine")){ skills.push(CONFIG.DND5E.skills["med"]);}
  if(game.settings.get("blind-roll-skills", "hideNature")){ skills.push(CONFIG.DND5E.skills["nat"]);}
  if(game.settings.get("blind-roll-skills", "hidePerception")){ skills.push(CONFIG.DND5E.skills["prc"]);}
  if(game.settings.get("blind-roll-skills", "hidePerformance")){ skills.push(CONFIG.DND5E.skills["prf"]);}
  if(game.settings.get("blind-roll-skills", "hidePersuasion")){ skills.push(CONFIG.DND5E.skills["per"]);}
  if(game.settings.get("blind-roll-skills", "hideReligion")){ skills.push(CONFIG.DND5E.skills["rel"]);}
  if(game.settings.get("blind-roll-skills", "hideSleightOfHand")){ skills.push(CONFIG.DND5E.skills["slt"]);}
  if(game.settings.get("blind-roll-skills", "hideStealth")){ skills.push(CONFIG.DND5E.skills["ste"]);}
  if(game.settings.get("blind-roll-skills", "hideSurvival")){ skills.push(CONFIG.DND5E.skills["sur"]);}
  return skills;
}
