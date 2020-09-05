// Register Game Settings
Hooks.once("init", () => {

  game.settings.register("blind-roll-skills", "forceBlindRolls", {
    name: game.i18n.localize("BLINDROLLSKILLS.ForceBlindRollsSetting"),
    hint: game.i18n.localize("BLINDROLLSKILLS.ForceBlindRollsSettingHint"),
    scope: "world",
    config: true,
    default: true,
    type: Boolean
  });

  game.settings.register("blind-roll-skills", "skillNames", {
    name: game.i18n.localize("BLINDROLLSKILLS.SkillNamesSetting"),
    hint: game.i18n.localize("BLINDROLLSKILLS.SkillNamesSettingHint"),
    scope: "world",
    config: true,
    default: "Insight,Perception",
    type: String
  });
});

// Catch chat message renders and do things
Hooks.on('renderChatMessage', (app, html, msg) => {

  // If Force Blind Rolls is enabled, let's do some stuff!
  if (game.settings.get("blind-roll-skills", "forceBlindRolls") && game.user.isGM === false){

    // Get list of skills to roll blindly
    let inputSkills = game.settings.get("blind-roll-skills", "skillNames");

    // Set up arrays for targets we're using for each type of roll card
    let betterRollsTargets = [];
    let default5eTargets = [];

    // Turn the original user input list into an array
    inputSkills = inputSkills.split(',');

    // Loop through the array of input and do the following:
    //  - Trim all leading/trailing whitespace to handle inputs like "Skill A, Skill B, Skill C"
    //  - Format the skill name for each type of targeted roll card and add it to the target array
    for (var i = 0; i < inputSkills.length; i++){
      let trimmedSkillName = inputSkills[i].trim();

      // Default 5e rolls put the skill check name in the flavor attribute in this format: Skillname Skill Check
      default5eTargets[i] = trimmedSkillName + ` Skill Check`;

      // BetterRolls chat cards put skill names in the header in this format: <h3 class="item-name">Skill Name</h3>
      betterRollsTargets[i] = `<h3 class="item-name">` + trimmedSkillName + `</h3>`;

      // Add more target arrays here...
    }

    // Blind-ify Default 5e Rolls
    // 5e stores the names in the card's flavor text, so we check that.
    let flavorString = msg.message.flavor;

    // If any of the formatted items in the targets array are contained in the flavor text, we set the roll to blind.
    if(flavorString){
      for (var i=0; i < default5eTargets.length ; i++){
        if(flavorString.includes(default5eTargets[i])){
          $(html).find(".dice-roll").replaceWith("<div>"+game.i18n.localize("BLINDROLLSKILLS.HiddenRollMessage")+"</div>");
        }
      }
    }

    // Blind-ify BetterRolls Rolls
    // Better Rolls constructs its own chat cards, with the skill names in the header of the card's content, so we look at content.
    let contentString = msg.message.content;

    // If any of the formatted items in the targets array match appear in that content, we set the roll to blind.
    for (var i=0; i < betterRollsTargets.length ; i++){
      if(contentString.includes(betterRollsTargets[i])){
        $(html).find(".dice-roll").replaceWith("<div>"+game.i18n.localize("BLINDROLLSKILLS.HiddenRollMessage")+"</div>");
      }
    }
  }

});
