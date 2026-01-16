import Image from "next/image";

interface ProviderLogoProps {
  provider: string;
  size?: number;
  showTitle?: boolean;
}

export function ProviderLogo({
  provider,
  size = 32,
  showTitle = false,
}: ProviderLogoProps) {
  const src = `https://models.dev/logos/${provider}.svg`;
  const image = (
    <Image
      src={src}
      alt={`${provider} logo`}
      width={size}
      height={size}
      className="rounded-sm"
    />
  );

  if (showTitle) {
    return <span title={provider}>{image}</span>;
  }

  return image;
}
