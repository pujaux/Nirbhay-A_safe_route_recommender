import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/Navbar";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-black text-ink">404</h1>
        <p className="mt-3 text-ink-light">This street isn't on our map.</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-blush px-5 py-2.5 text-sm font-medium text-white"
        >
          Walk home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-bold text-ink">Something went off-route</h1>
        <p className="mt-2 text-sm text-ink-light">{error.message}</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nirbhay — Walk fearless on every street" },
      {
        name: "description",
        content:
          "Nirbhay finds the safest route home, surfaces real reports from your community, and keeps SOS one tap away.",
      },
      { property: "og:title", content: "Nirbhay — Walk fearless" },
      {
        property: "og:description",
        content: "A safe-route recommender built for women, by everyone.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Outlet />
      <footer className="mt-20 border-t border-border bg-white/40 backdrop-blur">
        <div className="max-w-6xl mx-auto px-5 py-8 text-center text-xs text-ink-light">
          <p className="font-display italic text-blush text-base mb-1">walk fearless</p>
          <p>© {new Date().getFullYear()} Nirbhay · Built for women, by women</p>
        </div>
      </footer>
    </QueryClientProvider>
  );
}
