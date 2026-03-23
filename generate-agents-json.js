const fs = require("fs");
const path = require("path");
const https = require("https");

const url = "https://valorant-api.com/v1/agents?isPlayableCharacter=true";

https.get(url, res => {
  let data = "";

  res.on("data", chunk => data += chunk);

  res.on("end", () => {
    const parsed = JSON.parse(data);

    const simplified = parsed.data.map(agent => ({
      uuid: agent.uuid,
      name: agent.displayName,
      role: agent.role?.displayName || "Unknown",
      icon: agent.displayIcon,
      description: agent.description,
      abilities: agent.abilities.map(a => ({
        name: a.displayName,
        description: a.description,
        icon: a.displayIcon
      }))
    }));

    const outputDir = path.join(__dirname, "src/assets/data");
    const outputFile = path.join(outputDir, "agents.json");

    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(outputFile, JSON.stringify(simplified, null, 2));

    console.log(`agents.json generated successfully (${simplified.length} agents)`);
  });
});