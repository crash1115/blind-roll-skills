export function processSkills() {
  let hiddenSkills = [];
  if(game.settings.get("blind-roll-skills", "hideAcrobatics")){ hiddenSkills.push("acr");}
  if(game.settings.get("blind-roll-skills", "hideAnimalHandling")){ hiddenSkills.push("ani");}
  if(game.settings.get("blind-roll-skills", "hideArcana")){ hiddenSkills.push("arc");}
  if(game.settings.get("blind-roll-skills", "hideAthletics")){ hiddenSkills.push("ath");}
  if(game.settings.get("blind-roll-skills", "hideDeception")){ hiddenSkills.push("dec");}
  if(game.settings.get("blind-roll-skills", "hideHistory")){ hiddenSkills.push("his");}
  if(game.settings.get("blind-roll-skills", "hideInsight")){ hiddenSkills.push("ins");}
  if(game.settings.get("blind-roll-skills", "hideIntimidation")){ hiddenSkills.push("itm");}
  if(game.settings.get("blind-roll-skills", "hideInvestigation")){ hiddenSkills.push("inv");}
  if(game.settings.get("blind-roll-skills", "hideMedicine")){ hiddenSkills.push("med");}
  if(game.settings.get("blind-roll-skills", "hideNature")){ hiddenSkills.push("nat");}
  if(game.settings.get("blind-roll-skills", "hidePerception")){ hiddenSkills.push("prc");}
  if(game.settings.get("blind-roll-skills", "hidePerformance")){ hiddenSkills.push("prf");}
  if(game.settings.get("blind-roll-skills", "hidePersuasion")){ hiddenSkills.push("per");}
  if(game.settings.get("blind-roll-skills", "hideReligion")){ hiddenSkills.push("rel");}
  if(game.settings.get("blind-roll-skills", "hideSleightOfHand")){ hiddenSkills.push("slt");}
  if(game.settings.get("blind-roll-skills", "hideStealth")){ hiddenSkills.push("ste");}
  if(game.settings.get("blind-roll-skills", "hideSurvival")){ hiddenSkills.push("sur");}
  return hiddenSkills;
}

// Default 5e rolls put the skill check name in the flavor attribute in this format: Skillname Skill Check
// Here we use localization to get that string for whatever language the user is using.
export function formatForCore(abbreviations) {
  let formattedSkills = [];
  for (var i = 0; i < abbreviations.length; i++){
    let abbr = abbreviations[i];
    formattedSkills.push(game.i18n.format("DND5E.SkillPromptTitle", {skill: CONFIG.DND5E.skills[abbr]}));
  }
  return formattedSkills;
}

// BetterRolls chat cards put skill names in the header in this format: <h3 class="item-name">Skill Name</h3>
// We have to strip all the special spacing out of the msg content tho, so it becomes: <h3class="item-name">SkillName</h3>
// Here we fetch the skills name right out of the dnd5e config files, since that should produce the translated skill name for us
export function formatForBetterRolls(abbreviations) {
  let formattedSkills = [];
  for (var i = 0; i < abbreviations.length; i++){
    let abbr = abbreviations[i];
    let skillString = '<h3 class="item-name">' + CONFIG.DND5E.skills[abbr] + '</h3>';
    skillString = skillString.replace(/(\s+)/gm, "");
    formattedSkills.push(skillString);
  }
  return formattedSkills;
}
