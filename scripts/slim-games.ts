import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface Game {
    name: string;
    totalPlayed: string | null;
}

interface SlimGame {
    name: string;
    hoursPlayed: number | null;
}

const games: Game[] = JSON.parse(readFileSync(join(__dirname, '../output/games.json'), 'utf-8'));

const slim: SlimGame[] = games.map(g => ({
    name: g.name,
    hoursPlayed: g.totalPlayed ? parseFloat(g.totalPlayed) : null,
}));

writeFileSync(join(__dirname, '../output/games-slim.json'), JSON.stringify(slim, null, 2), 'utf-8');
console.log(`Written ${slim.length} games → output/games-slim.json`);
