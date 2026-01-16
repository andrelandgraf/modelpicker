import Image from "next/image";

interface ProviderLogoProps {
  provider: string;
  size?: number;
}

export function ProviderLogo({ provider, size = 32 }: ProviderLogoProps) {
  const src = `https://models.dev/logos/${provider}.svg`;
  return (
    <Image
      src={src}
      alt={`${provider} logo`}
      width={size}
      height={size}
      className="rounded-sm"
    />
  );
}
