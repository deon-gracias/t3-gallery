import { getImage } from "~/server/queries";
import Image from "next/image";

export default async function ImageModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid image id");

  const image = await getImage(idAsNumber);

  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.url}
        alt={image.name}
        className="h-96 w-96 object-cover"
      />
    </div>
  );
}
