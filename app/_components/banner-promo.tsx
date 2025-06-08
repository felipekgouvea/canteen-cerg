"use client";

import Image from "next/image";

interface BannerPromoProps {
  src: string;
  alt: string;
}

const BannerPromo = ({ src, alt }: BannerPromoProps) => {
  return (
    <div className="relative h-32 w-full overflow-hidden rounded-lg sm:h-40 lg:h-52">
      <Image
        src={src}
        alt={alt}
        fill
        className="rounded-lg object-cover"
        sizes="(max-width: 768px) 100vw,
               (max-width: 1200px) 50vw,
               33vw"
        priority
      />
    </div>
  );
};

export default BannerPromo;
