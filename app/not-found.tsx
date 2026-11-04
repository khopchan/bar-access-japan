import Link from "next/link";

export default function NotFound() {
  return (
    <div className="fallback">
      <p className="eyebrow">404</p>
      <h1>ページが見つかりません</h1>
      <p lang="en">This page could not be found.</p>
      <p className="fallback-links">
        <Link href="/">日本語トップ</Link>
        <Link href="/en" lang="en">
          English home
        </Link>
      </p>
    </div>
  );
}
