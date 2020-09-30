// Import Stuff
import { registerSettings } from "./settings.js";
import { processSkills, formatForCore, formatForBetterRolls, formatForMess } from "./skills.js";

// Register Game Settings
Hooks.once("init", () => {
  registerSettings();
});

// Catch chat message creations and make em blind if we need to
Hooks.on('preCreateChatMessage', (msg, options, userId) => {

  // If Force Blind Rolls is enabled and we're not a GM, let's hide some stuff!
  if (game.settings.get("blind-roll-skills", "forceBlindRolls")){

    //Hide Dice So Nice Rolls if they're enabled
    if(game.modules.get("dice-so-nice")?.active){
      let oldDsn = game.dice3d.messageHookDisabled;
      game.dice3d.messageHookDisabled = false;
    }

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

    //Handle BetterRolls5e
    // Better Rolls constructs its own chat cards, with the skill names in the header of the card's content, so we look at content.
    // If any of the formatted items in the targets array match appear in that content, make it blind.
    if(game.modules.get("betterrolls5e")?.active){
      let betterRollsTargets = formatForBetterRolls(inputSkills);
      let contentString = msg.content;
      for (var i=0; i < betterRollsTargets.length ; i++){
        if(contentString.includes(betterRollsTargets[i])){
          msg.blind = true;
          msg.rollMode = "blindroll";
          msg.whisper = ChatMessage.getWhisperRecipients("GM");
        }
      }
    }

    // Blind-ify MESS Alt Rolls Cards
    // MESS constructs its own chat cards, with the skill names as a label in the card's content, so we look at content.
    // If any of the formatted items in the targets array match appear in that content, make it blind
    // NOTE: Currently a bug in MESS that makes blind rolls display to the roller: https://github.com/Moerill/Mess/issues/91
    if(game.modules.get("mess")?.active){
      let messTargets = formatForMess(inputSkills);
      let contentString = msg.content;
      for (var i=0; i < messTargets.length ; i++){
        if(contentString.includes(messTargets[i])){
          msg.blind = true;
          msg.rollMode = "blindroll";
          msg.whisper = ChatMessage.getWhisperRecipients("GM");
        }
      }
    }

    // Reset DSN
    if(game.modules.get("dice-so-nice")?.active){
      game.dice3d.messageHookDisabled = oldDsn;
    }

  }
});
