export type HomeRef =
  | { kind: "story"; slug: string }
  | { kind: "guide"; slug: string }
  | { kind: "bar"; slug: string }
  | { kind: "cocktail"; slug: string }
  | { kind: "event"; slug: string };

/** トップの並び。スラッグは research/ の実在の店・カクテル・記事を指す。 */
export const homeLayout = {
  lead: { kind: "story", slug: "asia-50-best-bars-2026-japan" },
  grid: [
    { kind: "story", slug: "japan-highball-story" },
    { kind: "story", slug: "hard-shake-ginza" },
    { kind: "guide", slug: "omakase-cocktails-guide" },
    { kind: "bar", slug: "punch-room-tokyo" },
  ],
  latest: [
    { kind: "bar", slug: "virtu" },
    { kind: "cocktail", slug: "dry-martini" },
    { kind: "bar", slug: "bar-high-five" },
    { kind: "cocktail", slug: "highball" },
    { kind: "story", slug: "yokohama-cocktail-history" },
    { kind: "bar", slug: "kern-sakata" },
    { kind: "cocktail", slug: "yukiguni" },
    { kind: "cocktail", slug: "bamboo" },
  ],
} as const satisfies {
  lead: HomeRef;
  grid: readonly HomeRef[];
  latest: readonly HomeRef[];
};
