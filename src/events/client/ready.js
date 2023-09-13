const { ActivityTypes, ActivityType } = require("discord.js");
module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`${client.user.tag} Is Ready\n`);

    //bot status
    const activities = [
      "under construction",
      "releasing soon",
      "one piece is best",
    ];

    setInterval(() => {
      const status = activities[Math.floor(Math.random() * activities.length)];
      client.user.setPresence({
        activities: [{ name: `${status}`, type: ActivityType.Watching }],
        status: "dnd",
      });
    }, 150000);
  },
};
