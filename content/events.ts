import type { L10n } from "@/lib/i18n";
import type { Tone } from "@/lib/tones";

/**
 * 集まりのサンプル。日程・会場・料金・出演者は置かない。
 * status は表示上の状態だけで、実在の開催記録ではない。
 */
export type EventStatus = "upcoming" | "ended";

export type SampleEvent = {
  slug: string;
  tone: Tone;
  title: L10n;
  dek: L10n;
  when: L10n;
  credit: L10n;
  status: EventStatus;
};

export const eventUi = {
  upcoming: { ja: "これから", en: "Upcoming" },
  ended: { ja: "終了", en: "Ended" },
  upcomingNote: {
    ja: "日程も会場も未定のサンプルです。開催の予告ではありません。",
    en: "Samples with the date and the room unset. Not an announcement of a real gathering.",
  },
  endedNote: {
    ja: "終わったことにしているサンプルです。過去の開催記録ではありません。",
    en: "Samples marked as ended. Not a record of a gathering that took place.",
  },
} as const;

const credit: L10n = { ja: "写真クレジット未設定", en: "Photo credit unset" };
const upcomingWhen: L10n = { ja: "日程未定", en: "Date unset" };
const endedWhen: L10n = { ja: "終了（サンプル）", en: "Ended (sample)" };

export const events: SampleEvent[] = [
  {
    slug: "event-01",
    tone: "wine",
    status: "upcoming",
    when: upcomingWhen,
    credit,
    title: { ja: "サンプルイベント 01", en: "Sample event 01" },
    dek: {
      ja: "試飲という形式だけの告知です。日程、会場、料金は未定です。",
      en: "A notice of the form only: a tasting. Date, room, and fee are unset.",
    },
  },
  {
    slug: "event-02",
    tone: "ink",
    status: "upcoming",
    when: upcomingWhen,
    credit,
    title: { ja: "サンプルイベント 02", en: "Sample event 02" },
    dek: {
      ja: "トークという形式だけの告知です。登壇者は未設定です。",
      en: "A notice of the form only: a talk. Speakers are unset.",
    },
  },
  {
    slug: "event-03",
    tone: "bone",
    status: "ended",
    when: endedWhen,
    credit,
    title: { ja: "サンプルイベント 03", en: "Sample event 03" },
    dek: {
      ja: "ゲストシフトという形式だけの告知です。出演者と店は未設定です。",
      en: "A notice of the form only: a guest shift. The guest and the bar are unset.",
    },
  },
  {
    slug: "event-04",
    tone: "ash",
    status: "ended",
    when: endedWhen,
    credit,
    title: { ja: "サンプルイベント 04", en: "Sample event 04" },
    dek: {
      ja: "読み会という形式だけの告知です。テキストも会場も未設定です。",
      en: "A notice of the form only: a reading. The text and the room are unset.",
    },
  },
];
