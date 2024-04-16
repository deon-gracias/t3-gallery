import Image from "next/image";

const mockUrls = [
  "https://utfs.io/f/1a9a5b57-ace4-4c18-ae2b-6134185a115e-6fjssx.jpg",
  "https://utfs.io/f/3ec5fd3e-bd2e-4320-b3d2-146b089ec8d9-e4ge5t.jpg",
  "https://utfs.io/f/f4f69de9-9fc3-4b6a-aafb-2f2fbb893bf1-50lnxa.jpg",
  "https://utfs.io/f/8285278d-1925-403f-8bb2-259725b32f83-mn59z6.jpg",
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <div className="flex flex-wrap gap-4">
        {[...mockUrls, ...mockUrls, ...mockUrls].map((url) => (
          <div key={url} className="w-48">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="image" width={400} height={400} />
          </div>
        ))}
      </div>
    </main>
  );
}
