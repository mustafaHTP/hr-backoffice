import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Error 404
      </p>
      <h1 className="max-w-md text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        This page could not be found
      </h1>
      <p className="max-w-md text-sm text-muted-foreground sm:text-base">
        The link may be broken or the page may have been removed. Check the
        URL or return to the home page.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/">Go home</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
