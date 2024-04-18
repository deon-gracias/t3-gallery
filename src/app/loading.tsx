"use client";

import { CardImage } from "./_components/CardImage";

export default function Loading() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col px-6 py-4">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <CardImage.loading key={i} />
        ))}
      </div>
    </main>
  );
}
