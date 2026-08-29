
let selectedCountryId = null;
let selectedCountryName = "";
let currentTurn = 1;

// Fictional fantasy map layers mapped over country shape targets
let worldState = {
    "US": { name: "The Sunken Empire of Valoria", status: "High Magic Realm" },
    "CA": { name: "The Sky-Isles of Aethel", status: "Enchanted Griffon Eyrie" },
    "FR": { name: "Drakon Citadel", status: "Warlike Orc Horde" },
    "GB": { name: "Elven Archipelago of Sylva", status: "Isolationist Druids" },
    "DE": { name: "Ironforge Dwarven League", status: "Steam-Powered Inventors" },
    "RU": { name: "The Lich King's Frozen Wastes", status: "Undead Anarchy" },
    "CN": { name: "Shadow Realm of Xal'kor", status: "Void Corrupted" },
    "BR": { name: "The Primal Jungle", status: "Beastmasters" },
    "ZA": { name: "The Gilded Savannah", status: "Wealthy Merchants" },
    "AU": { name: "The Scorched Desert", status: "Wasteland Scavengers" }
};

document.querySelectorAll('svg path').forEach(country => {
    country.addEventListener('click', function() {
        document.querySelectorAll('svg path').forEach(p => p.classList.remove('selected'));
        
        selectedCountryId = this.getAttribute('id');
        let factionData = worldState[selectedCountryId];
        selectedCountryName = factionData ? factionData.name : "Uncharted Territory";
        let factionStatus = factionData ? factionData.status : "Wild monsters roam here.";
        
        this.classList.add('selected');
        
        document.getElementById('selected-country-name').innerText = selectedCountryName;
        document.getElementById('country-status').innerText = `Faction Trait: ${factionStatus}`;
        document.getElementById('btn-select-country').disabled = false;
    });
});

document.getElementById('btn-select-country').addEventListener('click', function() {
    this.disabled = true;
    document.getElementById('action-card').classList.remove('hidden');
    document.getElementById('log-output').innerHTML += `<br>[Chronicle]: You now rule ${selectedCountryName}. Ready your turn 1 edicts.`;
});

document.getElementById('btn-submit-turn').addEventListener('click', async function() {
    const playerAction = document.getElementById('player-action-input').value;
    if (!playerAction.trim()) return alert("Write your strategy edict first!");

    document.getElementById('log-output').innerHTML += `<br><br>🔮 <i>Weaving destiny for Turn ${currentTurn}...</i>`;
    
    const aiResult = await simulateTurnWithAI(selectedCountryName, playerAction, worldState);
    
    document.getElementById('log-output').innerHTML += `<br><br><b>[Turn ${currentTurn} Outcome]:</b><br>${aiResult}`;
    
    currentTurn++;
    document.getElementById('turn-number').innerText = currentTurn;
    document.getElementById('player-action-input').value = ""; 
});

async function simulateTurnWithAI(country, actions, currentWorldState) {
    const apiKey = "YOUR_FREE_GEMINI_API_KEY_HERE"; 
    const url = `https://googleapis.com{apiKey}`;

    const systemPrompt = `You are a text-based Grand Strategy engine for a dark fantasy universe.
    The player is ruling the fictional faction: "${country}".
    Current Game Turn: ${currentTurn}.
    The state of the fantasy realms: ${JSON.stringify(currentWorldState)}.
    The player wants to execute these fictional actions: "${actions}".
    
    Simulate the outcome using strict fantasy rules. Include magical consequences, fictional race traits, monster deployments, or mythical betrayals. 
    CRITICAL RULE: Do NOT mention real-world countries, Earth history, modern weapons, or physics. Keep the text narrative under 120 words.`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: systemPrompt }] }] })
        });
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        return "The mana currents fluctuated, distorting the chronicle reports. Try again.";
    }
}
