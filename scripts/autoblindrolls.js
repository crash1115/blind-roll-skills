// Import Stuff
import { libWrapper } from './libwrapper-shim.js'
import { registerSettings } from "./settings.js";
import { getSkillAbbreviations } from "./skills.js";


// Register Game Settings & Listeners
Hooks.once("init", () => {
  registerSettings();

  $(document).on(
    "click",
    ".crash-blind-roll-skills-help-card-toggle-btn",
    (ev) => {
      ev.preventDefault();
      game.settings.set("blind-roll-skills", "showHelpCards", false);
      ui.notifications.notify(
        "Crash's Automatic Blind Rolls (5e): " +
          game.i18n.localize("BLINDROLLSKILLS.HelpCardsDisabled")
      );
    }
  );

  async function skillCheckOverride(originalRoll, config, dialog ={}, message={}) {

    // Fix: Get pre dnd v4.1 style roll syntax to work
    // Old syntax will have config coming in as a string, but dnd v4.1.2 expects an object
    // TODO: Remove after dnd5e v4.5 when the old syntax will no longer be supported
    if ( foundry.utils.getType(config) !== "Object" ){
      console.warn(game.i18n.localize("BLINDROLLSKILLS.SyntaxCompatibilityWarning"));
      const newConfig = {
        skill: config
      }
      config = newConfig;
    }

    if( AutoBlindRolls.makeSkillBlind(config.skill) ){ 
      createAlertMsg();
      message.rollMode = "blindroll";
    }
    
    let result = await originalRoll(config, dialog, message);
    return result;
  }

  // Register libwrapper overrides
  libWrapper.register("blind-roll-skills", `CONFIG.Actor.documentClass.prototype.rollSkill`, skillCheckOverride, "WRAPPER");
});

// Overrides the default roll mode for the death save dialog
Hooks.on("dnd5e.preRollDeathSaveV2", (config, dialog ={}, message={}) => {
  if( AutoBlindRolls.makeDeathSaveBlind() ){ 
    message.rollMode = "blindroll";
    createAlertMsg();
  }
});

// Make API available to others
Hooks.on(`ready`, () => {
  globalThis.AutoBlindRolls = autoBlindRolls();
});

// Creates a chat message that explains to the user why the roll was made blindly.
// Does not display if the Show Help Cards client setting is disabled.
function createAlertMsg() {
  if (game.settings.get("blind-roll-skills", "showHelpCards")) {
    renderTemplate(
      "modules/blind-roll-skills/templates/helpCard.html",
      {}
    ).then((html) => {
      let options = {
        whisper: [game.user.id],
        speaker: {
          alias: game.i18n.localize("BLINDROLLSKILLS.ChatCardSpeaker"),
        },
        content: html,
      };
      ChatMessage.create(options);
    });
  }
}

// Open up for other people to use
export function autoBlindRolls() {
  // skill is a string, abbreviation for the skill. Ex: 'acr', 'ste', etc
  function makeSkillBlind(skill) {
    if (!skill) {
      console.error(
        "Crash's Automatic Blind Rolls (5e): No skill abbreviation provided to AutoBlindRolls.makeSkillBlind"
      );
      return false;
    }
    let skillsToBlind = getSkillAbbreviations();
    return skillsToBlind.includes(skill);
  }


  // Deprecated
  function makeSaveBlind() {
    return false;
  }

  function makeDeathSaveBlind() {
    return game.settings.get("blind-roll-skills", "hideDeathSaves");
  }

  function makeInitiativeBlind() {
    return game.settings.get("blind-roll-skills", "hideInitiative");
  }

  // Deprecated
  function makeAttackBlind() {
    return false;
  }

  return {
    makeSkillBlind: makeSkillBlind,
    makeSaveBlind: makeSaveBlind,
    makeDeathSaveBlind: makeDeathSaveBlind,
    makeInitiativeBlind: makeInitiativeBlind,
    makeAttackBlind: makeAttackBlind,
  };
}
