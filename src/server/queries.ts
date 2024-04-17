import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

export async function getMyImages() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const imagesData = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.createdAt),
  });

  return imagesData;
}

export async function getImage(id: number) {
  const user = auth();

  // Not a valid user
  if (!user.userId) throw new Error("Unauthorized");

  const imageData = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!imageData) throw new Error("Image not found");

  if (imageData.userId !== user.userId) throw new Error("Unauthorized");

  return imageData;
}
