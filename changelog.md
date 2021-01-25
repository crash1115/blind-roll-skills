### Version 0.5.2
- Fixed a bug where module would incorrectly override roll mode when using Better Rolls 5e.

### Version 0.5.1
- Now properly hides 3d dice when using Better Rolls Alpha in conjunction with DSN

### Version 0.5.0
- Compatibility for Foundry v0.7.9 and dnd5e 1.2.0
- Compatibility for MARS 5e

### Version 0.4.5
- Compatibility for Foundry v0.7.6 and dnd5e 1.1.0

### Version 0.4.4
- Compatible with Foundry v0.7.5, dnd5e v0.98, and Better Rolls 5e v1.1.17
- Partially compatible with Dice So Nice. Works with vanilla dnd5e (no roll altering mods installed), but not with Better Rolls.
- Fixed an issue where skills wouldn't roll blindly when using Better Rolls.
- Removed support for MESS alt rolls. Moerill has stated he's going to be removing the roll functionality and possibly deprecating MESS in the near future. I'll look into supporting whatever the replacement for MESS alt rolls is, if and when it becomes a thing.

### Version 0.4.3
FIXES:
- Fixed an issue where having Dice So Nice installed would break everything. :/

### Version 0.4.2
FIXES:
- Fixed an issue where not having Dice So Nice installed would break everything.

### Version 0.4.1
CHANGES:
- Shifted the module to make use of Foundry's built-in blind rolls
- Removed the custom roll hidden message setting since it's no longer required
- Added partial support for Dice So Nice (works with vanilla dnd5e, but not with MESS or Better Rolls 5e)
FIXES:
- Rolls are now hidden correctly regardless of what translations users are using
BROKEN:
- A bug in MESS preventing blind rolls from displaying correctly means that you will encounter problems using this module with MESS's alternative rolls enabled. Once that's fixed, everything should work great.

### Version 0.4.0
Initial public release
- Adds setting to customize message that appears when roll is hidden from player
- Overhauls settings menu
- Adds support* for different languages (see Compatibility section of readme)
- Adds support for MESS alt rolling

### Version 0.3.0
- Actually make things work as intended instead of just looking like they work as intended

### Version 0.2.1
- Fix localization error

### Version 0.2.0
Initial Release, supports default 5e and BetterRolls
