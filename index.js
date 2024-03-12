import { config } from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import { google } from "googleapis";
import { schedule } from "node-cron";

config();

const discordClient = new Client({
  intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds],
});

const youtubeClient = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

let LastVideoId = "";

discordClient.login(process.env.DISCORD_TOKEN);
discordClient.on("ready", () => {
  console.log(`Bot Online logado como: ${discordClient.user.tag}`);
  checkNewVideos();
});

async function checkNewVideos() {
  try {
    const response = await youtubeClient.search
      .list({
        channelId: "UCpKvMmsF6QrkVr_zWaLGK-A",
        order: "date",
        part: "snippet",
        type: "video",
        maxResults: 1,
      })
      .then((res) => res);

    const lastetVideo = response.data.items[0];
  } catch {}
}
