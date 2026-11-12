import Image from "next/image";
import { brandAssets } from "@/lib/brand";

export function Monogram({ priority = false }: { priority?: boolean }) {
  const asset = brandAssets.monogramDark;
  return (
    <Image
      src={asset.src}
      alt=""
      width={asset.width}
      height={asset.height}
      className="mark mark-on-dark"
      priority={priority}
      sizes="96px"
    />
  );
}

export function Shield({ className = "brand-shield" }: { className?: string }) {
  const asset = brandAssets.shield;
  return (
    <Image
      src={asset.src}
      alt="BAR ACCESS JAPAN"
      width={asset.width}
      height={asset.height}
      className={className}
      sizes="200px"
      loading="eager"
    />
  );
}

export function BrandPlate({ caption }: { caption: string }) {
  const light = brandAssets.monogramLight;
  const shield = brandAssets.shield;
  const badge = brandAssets.badge;
  return (
    <figure className="brand-plate">
      <Image src={shield.src} alt="" width={shield.width} height={shield.height} className="brand-shield" sizes="180px" loading="eager" />
      <Image src={light.src} alt="" width={light.width} height={light.height} className="brand-monogram" sizes="180px" loading="eager" />
      <Image src={badge.src} alt="" width={badge.width} height={badge.height} className="brand-badge" sizes="160px" loading="eager" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
