function simulateTurnWithAI(country, actions, currentWorldState) {
    const actionLower = actions.toLowerCase();
    
    // 1. Lists of immersive fantasy event logs to generate dynamic results
    const militarySuccess = [
        `with overwhelming magical force! The banners of ${country} fly high over the conquered territories.`,
        `after a legendary battle. Rival factions retreated into the shadows, leaving behind thousands of gold coins.`,
        `shattering the enemy line. Mystical beast riders secured the borders, increasing your realm's influence.`
    ];

    const militaryFailure = [
        `but the enemy countered with a massive barrage of defensive spells. Your forces were forced to fall back.`,
        `but an unexpected blizzard swept across the plains, freezing your supply lines and halting the march.`,
        `falling into a clever ambush set up by rebel guerillas. You must regroup your mystical armies.`
    ];

    const diplomacySuccess = [
        `The treaty was signed in starlight. A grand coalition has formed, bringing lasting stability to the borders.`,
        `The rival leader accepted your terms, opening up rich mystical trade routes across the great sea.`,
        `Envoys returned with gifts of gold and mana crystals, cementing a powerful defensive non-aggression pact.`
    ];

    const neutralEvents = [
        `Meanwhile, mysterious mana storms erupted across the uncharted wilderness, warping local wildlife into aggressive monsters.`,
        `A roaming guild of legendary mercenaries has arrived at your capital, offering their blades to the highest bidder.`,
        `Alchemists within your borders discovered a massive vein of glowing purple crystals, boosting local magical research.`
    ];

    // 2. Pick random responses from the decks
    const randMilWin = militarySuccess[Math.floor(Math.random() * militarySuccess.length)];
    const randMilLoss = militaryFailure[Math.floor(Math.random() * militaryFailure.length)];
    const randDiplomacy = diplomacySuccess[Math.floor(Math.random() * diplomacySuccess.length)];
    const randEvent = neutralEvents[Math.floor(Math.random() * neutralEvents.length)];

    // 3. Scan the user's action text using keyword detection to create the narrative
    let narrativeResult = "";

    if (actionLower.includes("war") || actionLower.includes("attack") || actionLower.includes("invade") || actionLower.includes("march")) {
        // Roll a virtual 50/50 dice for war outcomes
        if (Math.random() > 0.5) {
            narrativeResult = `⚔️ <b>Military Campaign Status:</b> Your commands to march and invade were executed ${randMilWin}`;
        } else {
            narrativeResult = `🛡️ <b>Military Campaign Status:</b> Your forces attempted to strike, ${randMilLoss}`;
        }
    } else if (actionLower.includes("alliance") || actionLower.includes("pact") || actionLower.includes("trade") || actionLower.includes("peace")) {
        narrativeResult = `🤝 <b>Diplomatic Chronicle:</b> Your diplomatic envoys set out to negotiate. ${randDiplomacy}`;
    } else {
        narrativeResult = `📜 <b>Realm Management:</b> Your edict to "${actions}" was successfully processed by your royal council. The populace reacts with quiet compliance.`;
    }

    // Append a random global world event to make the fantasy world feel alive and shifting
    narrativeResult += `<br><br>🌍 <b>World Rumors:</b> ${randEvent}`;

    return narrativeResult;
}
