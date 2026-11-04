export const tones = ["lacquer", "ash", "dusk", "bone", "wine", "ink"] as const;

export type Tone = (typeof tones)[number];
