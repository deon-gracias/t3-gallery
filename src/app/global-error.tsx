"use client";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

export default function GlobalError(props: {
  error: Error & { statusCode?: number };
}) {
  useEffect(() => {
    Sentry.captureException(props.error);
  }, [props.error]);

  return (
    <html>
      <body>
        <NextError
          statusCode={props.error.statusCode ?? 500}
          title={props.error.message || "Error"}
        />
      </body>
    </html>
  );
}
