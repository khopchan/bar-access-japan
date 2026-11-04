"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="fallback">
      <p className="eyebrow">ERROR</p>
      <h1>表示できません</h1>
      <p lang="en">This page could not be shown.</p>
      <button type="button" className="text-button" onClick={() => reset()}>
        再読み込み / Try again
      </button>
      <p className="fallback-links">
        <a href="/">日本語トップ</a>
        <a href="/en" lang="en">
          English home
        </a>
      </p>
    </div>
  );
}
