export function siteUrl(): URL {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return new URL(configured);

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) return new URL(`https://${production}`);

  return new URL("http://localhost:3000");
}
