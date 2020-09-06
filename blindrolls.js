// Import Stuff
import { registerSettings } from "./settings.js";
import { processSkills, formatForCore, formatForBetterRolls, formatForMess } from "./skills.js";

// Register Game Settings
Hooks.once("init", () => {
  registerSettings();
});

// Catch chat message renders and do things
Hooks.on('renderChatMessage', (app, html, msg) => {

  // If Force Blind Rolls is enabled and we're not a GM, let's hide some stuff!
  if (game.settings.get("blind-roll-skills", "forceBlindRolls") && game.user.isGM === false){

    // Get our replacement text
    let newText = game.settings.get("blind-roll-skills", "hiddenMessage");

    // Get list of skills to roll blindly
    let inputSkills = processSkills();

    // Blind-ify Default 5e Roll Cards
    // 5e stores the names in the card's flavor text, so we check that.
    // If any of the formatted items in the targets array are contained in the flavor text, we replace the roll with our text.
    let default5eTargets = formatForCore(inputSkills);
    let flavorString = msg.message.flavor;
    if(flavorString){
      for (var i=0; i < default5eTargets.length ; i++){
        if(flavorString.includes(default5eTargets[i])){
          $(html).find(".dice-roll").replaceWith("<div>" + newText + "</div>");
        }
      }
    }

    // Blind-ify BetterRolls Roll Cards
    // Better Rolls constructs its own chat cards, with the skill names in the header of the card's content, so we look at content.
    // If any of the formatted items in the targets array match appear in that content, we replace the roll with our text.
    if(game.modules.get("betterrolls5e")?.active){
      let betterRollsTargets = formatForBetterRolls(inputSkills);
      let contentString = msg.message.content;
      for (var i=0; i < betterRollsTargets.length ; i++){
        if(contentString.includes(betterRollsTargets[i])){
          $(html).find(".dice-roll").replaceWith("<div>" + newText + "</div>");
        }
      }
    }

    // Blind-ify MESS Alt Rolls Cards
    // MESS constructs its own chat cards, with the skill names as a label in the card's content, so we look at content.
    // If any of the formatted items in the targets array match appear in that content, we replace the roll with our text.
    if(game.modules.get("mess")?.active){
      let messTargets = formatForMess(inputSkills);
      let contentString = msg.message.content;
      for (var i=0; i < messTargets.length ; i++){
        if(contentString.includes(messTargets[i])){
          $(html).find(".dice-roll").replaceWith("<div>" + newText + "</div>");
        }
      }
    }

  }

});
