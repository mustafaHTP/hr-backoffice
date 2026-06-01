"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Something went wrong
      </p>
      <h1 className="max-w-md text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        We could not load this page
      </h1>
      <p className="max-w-md text-sm text-muted-foreground sm:text-base">
        An unexpected error occurred. You can try again, or go back to the
        home page if the problem continues.
      </p>
      {process.env.NODE_ENV === "development" && error.message ? (
        <pre className="max-h-40 max-w-full overflow-auto rounded-lg border border-border bg-muted px-4 py-3 text-left text-xs text-muted-foreground">
          {error.message}
        </pre>
      ) : null}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button type="button" onClick={() => reset()} size="lg">
          Try again
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  );
}
