import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '../input/all-games.html'), 'utf-8');

interface Game {
    appId: string;
    name: string;
    storeUrl: string;
    totalPlayed: string | null;
    lastPlayed: string | null;
    achievements: string | null;
    achievementPercent: number | null;
    installSize: string | null;
}

const games: Game[] = [];

// Split on each game card container
const gameBlocks = html.split('<div class="JeLbcWPaZDg-"').slice(1);

for (const block of gameBlocks) {
    // App ID + store URL from the primary game image link
    const storeUrlMatch = block.match(/href="(https:\/\/store\.steampowered\.com\/app\/(\d+))"[^>]*class="_5rP-WhERE5Q-/);
    if (!storeUrlMatch) continue;

    const storeUrl = storeUrlMatch[1];
    const appId = storeUrlMatch[2];

    // Game name from the title anchor
    const nameMatch = block.match(/class="Kj0mLm4b2zY-">([^<]+)<\/a>/);
    const name = nameMatch ? nameMatch[1].trim() : '';

    // Total played — text node after the inner <span> closes
    const totalPlayedMatch = block.match(/class="ANL1vYNAS6E-">[\s\S]*?<\/span>([^<]+)<\/span>/);
    const totalPlayed = totalPlayedMatch ? totalPlayedMatch[1].trim() : null;

    // Last played — same pattern for the sibling span
    const lastPlayedMatch = block.match(/class="_09Z65-SltXY-">[\s\S]*?<\/span>([^<]+)<\/span>/);
    const lastPlayed = lastPlayedMatch ? lastPlayedMatch[1].trim() : null;

    // Achievements progress (e.g. "29/84"), absent for games with no achievements
    const achievementsMatch = block.match(/class="FwfGO0sl0JA-">([^<]+)<\/span>/);
    const achievements = achievementsMatch ? achievementsMatch[1].trim() : null;

    // Achievement completion as a 0–1 fraction
    const percentMatch = block.match(/--percent:\s*([\d.]+)/);
    const achievementPercent = percentMatch ? parseFloat(percentMatch[1]) : null;

    // Install size (e.g. "150.3 GB")
    const installSizeMatch = block.match(/class="znW06ez8CqU-">([^<]+)<\/span>/);
    const installSize = installSizeMatch ? installSizeMatch[1].trim() : null;

    games.push({ appId, name, storeUrl, totalPlayed, lastPlayed, achievements, achievementPercent, installSize });
}

const outputDir = join(__dirname, '../output');
mkdirSync(outputDir, { recursive: true });
const outputPath = join(outputDir, 'games.json');
writeFileSync(outputPath, JSON.stringify(games, null, 2), 'utf-8');

console.log(`Extracted ${games.length} games → output/games.json`);
