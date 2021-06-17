// Import Stuff
import { registerSettings } from "./settings.js";
import { getSkillNames, getSkillAbbreviations } from "./skills.js";

// Register Game Settings
Hooks.once("init", () => {
  registerSettings();
});

// Set up a var for the user's original roll mode
let oldRollMode;

// Set up a flag so we know when a blind roll has been made. Only used with BR/DSN right now.
let blindRollMade = false;

// Blind-ify BetterRolls5e Roll Cards
// Better Rolls constructs its own chat cards, with the skill names in the header field.
// We compare a list of formatted skill names to that header. If there's a match, we make it blind.

// If we're using DSN, it's not enough for us to just alter the chatData.
// We also have to set Foundry's roll mode to blind so the 3d dice don't roll.
// We save the old roll mode first so we can reset it later.
Hooks.on("messageBetterRolls", (_, chatData) => {
  if (game.settings.get("blind-roll-skills", "forceBlindRolls")){
    let skillsToBlind = getSkillNames();
    let cardTitle = getBrCardTitle(chatData);
    if(skillsToBlind.includes(cardTitle)){
      chatData.rollMode = "blindroll";
      createAlertMsg();
      if(game.dice3d){
        blindRollMade = true;
        oldRollMode = game.settings.get("core", "rollMode");
        game.settings.set("core", "rollMode", "blindroll");
      }
    }
  }
});

// Catch chat message creations and make em blind if we need to
Hooks.on('preCreateChatMessage', (msg, options, userId) => {

  // If Force Blind Rolls is enabled, let's hide some stuff!
  if (game.settings.get("blind-roll-skills", "forceBlindRolls")){
    let makeRollBlind = false;
    let skillsToBlind = getSkillAbbreviations();

    // Blind-ify Default 5e & MARS 5e Roll Cards
    // We check the dnd5e flags in the msg to see if it contains any of the skills,
    // or is a death save, or is an initiative roll, and hide accordingly
    if(msg.data.flags){
      if(skillsToBlind.includes(msg.data.flags.dnd5e?.roll?.skillId)) { makeRollBlind = true; }
      if(game.settings.get("blind-roll-skills", "hideDeathSaves") && (msg.data.flags.dnd5e?.roll?.type === "death")) { makeRollBlind = true; }
      if(game.settings.get("blind-roll-skills", "hideInitiative") && msg.data.flags.core?.initiativeRoll) { makeRollBlind = true; }
    }

    // // If we need to make the roll blindly, do it.
    if(makeRollBlind){
      let gmUsers = ChatMessage.getWhisperRecipients("GM");
      let gmUserIds = gmUsers.map(u => u.data._id);
      let updates = {
        blind: true,
        whisper: gmUserIds
      }
      msg.data.update(updates);

      createAlertMsg();
    }

    // Reset DSN (used in conjunction with with BR)
    // We already used the BR hook to take care of whether or not things are blind.
    // Here all we wanna do is see if DSN is active, and reset the roll mode since we changed it earlier
    if(game.modules.get("betterrolls5e")?.active){
      if(game.dice3d && blindRollMade){
        game.settings.set("core", "rollMode", oldRollMode);
        blindRollMade = false;
      }
    }

  }

});

// Digs through the BR chatData flags to find the header field, then gets the title
function getBrCardTitle(card){
  let title = null;
  if(card.flags?.betterrolls5e?.fields){
    let fields = card.flags.betterrolls5e.fields;
    for(var i = 0; i< fields.length; i++){
      if(fields[i][0] == "header"){
        title = fields[i][1].title;
        break;
      }
    }
  }
  return title;
}

// Creates a chat message that explains to the user why the roll was made blindly.
// Does not display if the Show Help Cards client setting is disabled.
function createAlertMsg(){
  if (game.settings.get("blind-roll-skills", "showHelpCards")){
    ChatMessage.create({
            content: `<div class="automatic-blind-rolls-helptext">${game.i18n.localize("BLINDROLLSKILLS.ChatCardHelpText")}</div><div class="automatic-blind-rolls-helptext">${game.i18n.localize("BLINDROLLSKILLS.ChatCardDisableText")}</div><hr><div class="automatic-blind-rolls-footer">Crash's Automatic Blind Rolls (5e)</div>`,
            speaker: {alias: game.i18n.localize("BLINDROLLSKILLS.ChatCardSpeaker")},
            whisper:  [game.user.id]
    });
  }
};
