// Import Stuff
import { registerSettings } from "./settings.js";
import { processSkills, formatForCore, formatForBetterRolls } from "./skills.js";

// Register Game Settings
Hooks.once("init", () => {
  registerSettings();
});

// Catch chat message creations and make em blind if we need to
Hooks.on('preCreateChatMessage', (msg, options, userId) => {

  // If Force Blind Rolls is enabled, let's hide some stuff!
  if (game.settings.get("blind-roll-skills", "forceBlindRolls")){

    // Get list of skills to roll blindly
    let inputSkills = processSkills();

    // Blind-ify Default 5e Roll Cards
    // 5e stores the names in the card's flavor text, so we check that.
    // If any of the formatted items in the targets array are contained in the flavor text, we replace the roll with our text.
    let default5eTargets = formatForCore(inputSkills);
    let flavorString = msg.flavor;
    if(flavorString){
      for (var i=0; i < default5eTargets.length ; i++){
        if(flavorString.includes(default5eTargets[i])){
          msg.blind = true;
          msg.rollMode = "blindroll";
          msg.whisper = ChatMessage.getWhisperRecipients("GM");
        }
      }
    }

    // Blind-ify BetterRolls5e Roll Cards
    // Better Rolls constructs its own chat cards, with the skill names in the header of the card's content, so we look at content.
    // We have to strip out all the spaces and fun characters from the content to get something reliably readable.
    // If any of the formatted items in the targets array match appear in that content, make it blind.
    if(game.modules.get("betterrolls5e")?.active){
      let betterRollsTargets = formatForBetterRolls(inputSkills);
      let contentString = msg.content.replace(/(\r\n|\n|\r|\s+)/gm, "");
      for (var i=0; i < betterRollsTargets.length ; i++){
        if(contentString.includes(betterRollsTargets[i])){
          msg.blind = true;
          msg.rollMode = "blindroll";
          msg.whisper = ChatMessage.getWhisperRecipients("GM");
        }
      }
    }
  }
});
