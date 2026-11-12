export type HomeRef =
  | { kind: "story"; slug: string }
  | { kind: "guide"; slug: string }
  | { kind: "bar"; slug: string }
  | { kind: "cocktail"; slug: string }
  | { kind: "event"; slug: string };

/** トップの並び。実在の店や人には結びつかないサンプルだけを指す。 */
export const homeLayout = {
  lead: { kind: "story", slug: "story-quiet" },
  grid: [
    { kind: "story", slug: "story-glass" },
    { kind: "story", slug: "story-door" },
    { kind: "guide", slug: "guide-reserve" },
    { kind: "bar", slug: "bar-a" },
  ],
  latest: [
    { kind: "story", slug: "story-ice" },
    { kind: "cocktail", slug: "cocktail-01" },
    { kind: "event", slug: "event-01" },
    { kind: "bar", slug: "bar-b" },
    { kind: "guide", slug: "guide-counter" },
    { kind: "event", slug: "event-03" },
    { kind: "cocktail", slug: "cocktail-05" },
    { kind: "guide", slug: "guide-leave" },
  ],
} as const satisfies {
  lead: HomeRef;
  grid: readonly HomeRef[];
  latest: readonly HomeRef[];
};
