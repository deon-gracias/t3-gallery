"use client";

import Image from "next/image";
import React from "react";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Skeleton } from "~/components/ui/skeleton";

export function ImageWithSkeleton({
  image,
}: {
  image: { className?: string; url: string; alt: string; fill?: boolean };
}) {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <>
      <AspectRatio ratio={1}>
        {isLoading && <Skeleton className={image.className} />}
        <Image
          src={image.url}
          alt={image.alt}
          className={image.className}
          fill={image.fill}
          onLoad={() => setIsLoading(false)}
        />
      </AspectRatio>
    </>
  );
}
