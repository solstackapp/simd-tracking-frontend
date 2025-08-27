import Image from "next/image";

interface SolstackLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function SolstackLogo({ className, width = 32, height = 32 }: SolstackLogoProps) {
  return (
    <Image
      src="/solstack-nobg.png"
      alt="SolStack"
      width={width}
      height={height}
      className={className}
    />
  );
}