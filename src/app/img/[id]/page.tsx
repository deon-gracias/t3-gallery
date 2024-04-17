export default function ImageModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  return <div>{photoId}</div>;
}
