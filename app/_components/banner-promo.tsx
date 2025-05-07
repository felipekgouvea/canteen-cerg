import Image from "next/image";

interface BannerPromoProps {
  src: string;
  alt: string;
}

const BannerPromo = ({ alt, src }: BannerPromoProps) => {
  return (
    <div>
      <Image
        src={src}
        alt={alt}
        height={0}
        width={0}
        className="h-auto w-full rounded-lg object-contain"
        sizes="100vw"
        quality={100}
      />
    </div>
  );
};

export default BannerPromo;
