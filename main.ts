// The Tired Dark Lord: A 100-Word Villain Monologue
// Writes exactly one monologue of 100 words to <MAKEFUN_OUTPUT_DIR>/entry.txt.
// The gate requires UTF-8 text of 1 to 600 characters; the judge brief asks for
// about 100 words, with the tiredness felt in rhythm and deflection, never
// announced, from a specific villain with a history and a scheme.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MONOLOGUE =
  "You'd think nine centuries ruling the Ashen Marches would teach a man to sleep. " +
  "It hasn't. Ravens bring dawn reports: grain short in Vell, priests haggling over tithes, " +
  "the general asking whether Caer Dusk can wait till spring. It can. It can't. " +
  "I haven't decided, and not-deciding is the only quiet I get. " +
  "My mother built this throne from the bones of kings who bored her. " +
  "I sit in it because someone must sign the executions; the seal only answers my hand. " +
  "So. Bring the map, the ink, the tea. The empire waited long. It can wait for one cup.";

const words = MONOLOGUE.split(/\s+/).filter(Boolean);
if (words.length !== 100) {
  throw new Error(`monologue must be exactly 100 words, got ${words.length}`);
}
if (MONOLOGUE.length < 1 || MONOLOGUE.length > 600) {
  throw new Error(`entry must be 1-600 characters, got ${MONOLOGUE.length}`);
}
if (!MONOLOGUE.trim()) {
  throw new Error("entry must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, MONOLOGUE + "\n", "utf8");
// Round-trip check: what landed on disk must be exactly the guarded text.
const written = readFileSync(outPath, "utf8").replace(/\n$/, "");
if (written !== MONOLOGUE) {
  throw new Error("entry.txt on disk does not match the guarded monologue");
}
console.log(`wrote entry.txt: ${words.length} words, ${MONOLOGUE.length} characters`);
