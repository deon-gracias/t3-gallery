import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";
import { utapi } from "~/server/uploadhting";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    uploadthingId: process.env.UPLOADTHING_APP_ID,
    uploadthingSecret: process.env.UPLOADTHING_SECRET,
  },
});
