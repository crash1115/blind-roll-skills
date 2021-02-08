// Import Stuff
import { registerSettings } from "./settings.js";
import { processSkills, processNonSkills, formatForCore, formatForBetterRolls, formatForMars } from "./skills.js";

// Register Game Settings
Hooks.once("init", () => {
  registerSettings();
});

// Set up a var for the user's original roll mode
let oldRollMode;

// Set up a flag so we know when a blind roll has been made. Only used with BR right now.
let blindRollMade = false;


// Blind-ify BetterRolls5e Roll Cards
// Better Rolls constructs its own chat cards, with the skill names in the header of the card's content, so we look at content.
// We have to strip out all the spaces and fun characters from the content to get something reliably readable.
// If any of the formatted items in the targets array match appear in that content, make it blind.

// If we're using DSN, it's not enough for us to just alter the chat message.
// We also have to set the roll mode to blind so the 3d dice don't roll.
// We save the old roll mode first so we can reset it later.
Hooks.on("messageBetterRolls", (_, chatData) => {
  if (game.settings.get("blind-roll-skills", "forceBlindRolls")){
    let inputSkills = processSkills();
    let nonSkills = processNonSkills();
    let betterRollsTargets = formatForBetterRolls(inputSkills);
    betterRollsTargets = betterRollsTargets.concat(nonSkills);
    let contentString = chatData.content.replace(/(\r\n|\n|\r|\s+)/gm, "");
    for (var i=0; i < betterRollsTargets.length ; i++){
      if(contentString.includes(betterRollsTargets[i])){
        chatData.blind = true;
        chatData.rollMode = "blindroll";
        chatData.whisper = ChatMessage.getWhisperRecipients("GM");
        if(game.dice3d){
          blindRollMade = true;
          oldRollMode = game.settings.get("core", "rollMode");
          game.settings.set("core", "rollMode", "blindroll");
        }
      }
    }
  }
});


// Catch chat message creations and make em blind if we need to
Hooks.on('preCreateChatMessage', (msg, options, userId) => {

  // If Force Blind Rolls is enabled, let's hide some stuff!
  if (game.settings.get("blind-roll-skills", "forceBlindRolls")){

    // Get list of skills to roll blindly
    let inputSkills = processSkills();
    let nonSkills = processNonSkills();

    // Blind-ify Default 5e Roll Cards
    // 5e stores the names in the card's flavor text, so we check that.
    // If any of the formatted items in the targets array are contained in the flavor text, we replace the roll with our text.
    let default5eTargets = formatForCore(inputSkills);
    default5eTargets = default5eTargets.concat(nonSkills);
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
    // We already used the BR hook to take care of whether or not things are blind.
    // Here all we wanna do is see if DSN is active, and reset the roll mode since we changed it earlier
    if(game.modules.get("betterrolls5e")?.active){
      if(game.dice3d && blindRollMade){
        game.settings.set("core", "rollMode", oldRollMode);
        blindRollMade = false;
      }
    }

    // Blind-ify MARS 5e Roll Cards
    // MARS constructs its own chat cards, with the skill names in a label div in card's content, so we look at content.
    // We have to strip out all the spaces and fun characters from the content to get something reliably readable.
    // If any of the formatted items in the targets array match appear in that content, make it blind.
    if(game.modules.get("mars-5e")?.active){
      let marsTargets = formatForMars(inputSkills);
      marsTargets = marsTargets.concat(nonSkills);
      let contentString = msg.content.replace(/(\r\n|\n|\r|\s+)/gm, "");
      for (var i=0; i < marsTargets.length ; i++){
        if(contentString.includes(marsTargets[i])){
          msg.blind = true;
          msg.rollMode = "blindroll";
          msg.whisper = ChatMessage.getWhisperRecipients("GM");
        }
      }
    }

  }
});
