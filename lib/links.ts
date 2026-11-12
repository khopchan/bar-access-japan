export function isHttp(value: string): boolean {
  return /^https?:\/\//.test(value);
}

export function hostLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** Host plus a shortened path, for a compact source line. */
export function sourceLabel(url: string): string {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    const path = decodeURIComponent(parsed.pathname).replace(/\/$/, "");
    if (!path) return host;
    const trimmed = path.length > 48 ? `${path.slice(0, 46)}…` : path;
    return `${host}${trimmed}`;
  } catch {
    return url;
  }
}
