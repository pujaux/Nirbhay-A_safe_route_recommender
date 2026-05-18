import { createFileRoute, Link } from "@tanstack/react-router";
import heroWoman from "@/assets/hero-woman.jpg";
import heroMan from "@/assets/hero-man.jpg";
import { RouteSearch } from "@/components/RouteSearch";
import { Shield, MapPin, Users, Sparkles, MessageCircleHeart, AlertTriangle } from "lucide-react";
import { MapView } from "../components/MapView";

// inside your return JSX, before the last </div>:
<MapView />;
// add this somewhere in your return JSX:

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-5 pt-10 sm:pt-16 pb-8 grid lg:grid-cols-2 gap-10 items-center">
          <div className="animate-fadeUp relative z-10">
            <span className="inline-flex items-center gap-1.5 bg-white/70 backdrop-blur border border-border text-ink text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-blush" />
              Navigate Safely. Travel Fearlessly
            </span>

            <h1 className="font-display mt-5 text-5xl sm:text-6xl lg:text-7xl font-black text-ink leading-[1.02] tracking-tight">
              Walk{" "}
              <span className="italic font-bold text-blush relative inline-block">
                fearless
                <span className="absolute -bottom-2 left-0 right-0 h-2 bg-sun rounded-full -z-10" />
              </span>
              <br />
              every street, every hour.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-ink-light max-w-md leading-relaxed">
              Nirbhay finds the safest route home, surfaces real reports from your community, and
              keeps SOS one tap away.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/routes"
                className="inline-flex items-center gap-2 bg-ink text-cream rounded-full px-6 py-3 text-sm font-semibold shadow-soft hover:bg-blush transition-colors"
              >
                <MapPin className="w-4 h-4" /> Find a safe route
              </Link>
              <Link
                to="/reviews"
                className="inline-flex items-center gap-2 bg-white/80 border border-border rounded-full px-6 py-3 text-sm font-semibold text-ink hover:bg-white transition-colors"
              >
                <MessageCircleHeart className="w-4 h-4 text-blush" /> Read reviews
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[
                { v: "20+", l: "Noida areas" },
                { v: "35+", l: "Delhi areas" },
                { v: "6", l: "Safe routes" },
                { v: "10", l: "Hotspots mapped" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="bg-white/60 backdrop-blur border border-border rounded-2xl p-3 text-center"
                >
                  <div className="font-display text-2xl font-black text-blush">{s.v}</div>
                  <div className="text-[11px] text-ink-light mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fadeIn delay-1 max-w-md mx-auto lg:max-w-none">
            {/* aura blobs */}
            <div className="absolute -top-10 -left-10 w-60 h-60 rounded-full bg-blush-soft blur-3xl opacity-70 -z-10" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-sun blur-3xl opacity-50 -z-10" />
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative rounded-[1.5rem] overflow-hidden border border-white/60 shadow-(--shadow-glow) animate-float">
                <img
                  src={heroWoman}
                  alt="A woman walking confidently down a sunlit street with headphones"
                  width={1024}
                  height={1024}
                  className="w-full h-full object-cover block aspect-3/4"
                />
              </div>
              <div
                className="relative rounded-[1.5rem] overflow-hidden border border-white/60 shadow-(--shadow-glow) animate-float mt-6"
                style={{ animationDelay: "0.4s" }}
              >
                <img
                  src={heroMan}
                  alt="A young man walking safely while looking at his phone"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="w-full h-full object-cover block aspect-3/4"
                />
              </div>
            </div>
            <div className="mt-4 bg-white/85 backdrop-blur-md rounded-2xl px-4 py-3 flex items-start gap-3 border border-border">
              <div className="w-8 h-8 rounded-full bg-gradient-warm flex items-center justify-center shrink-0 mt-0.5">
                <Shield className="w-4 h-4 text-ink" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-light">
                  Tonight's recommended route
                </p>
                <p className="text-sm font-semibold text-ink mt-0.5 leading-snug">
                  Lajpat Nagar → Sector 18
                  <span className="text-blush font-bold"> · 92% safe</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH SECTION */}
      <section className="relative py-12">
        <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2 animate-fadeUp">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-blush">
              Plan your walk
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mt-2 leading-tight">
              Where are you headed <span className="italic text-blush">tonight?</span>
            </h2>
            <p className="mt-3 text-ink-light">
              Choose your start, destination and time. We'll rank routes by lighting, CCTV, police
              presence and community reports.
            </p>
          </div>
          <div className="lg:col-span-3 animate-fadeUp delay-1">
            <RouteSearch />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-blush">
              Why Nirbhay
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mt-2">
              A companion that walks <span className="italic text-blush">with you</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: MapPin,
                title: "Smart safe routes",
                desc: "Routes ranked by lighting, CCTV, police presence, and crime index — re-scored for the time you're travelling.",
                tint: "blush",
              },
              {
                icon: AlertTriangle,
                title: "Hotspots mapped",
                desc: "Avoid known underpasses, isolated stretches and dimly lit zones with clear visual warnings.",
                tint: "sun",
              },
              {
                icon: Users,
                title: "Community reviewed",
                desc: "Real travellers report what felt safe and what didn't, so the next person walks smarter.",
                tint: "blush",
              },
              {
                icon: Shield,
                title: "Night mode advisory",
                desc: "Late-night travel triggers gentle nudges — share location, use main roads, prefer metro.",
                tint: "sun",
              },
              {
                icon: Sparkles,
                title: "Women-first design",
                desc: "Built around solo female travellers, but useful for everyone walking after dark.",
                tint: "blush",
              },
              {
                icon: MessageCircleHeart,
                title: "SOS, one tap",
                desc: "Emergency contacts and live location sharing always within thumb's reach.",
                tint: "sun",
              },
            ].map((f, i) => (
              <div
                key={f.title}
                className="animate-fadeUp bg-white/70 backdrop-blur border border-border rounded-3xl p-6 hover:shadow-soft hover:-translate-y-1 transition-all"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${f.tint === "blush" ? "bg-blush-soft" : "bg-sun-soft"}`}
                >
                  <f.icon
                    className={`w-5 h-5 ${f.tint === "blush" ? "text-blush" : "text-amber"}`}
                  />
                </div>
                <h3 className="font-display text-lg font-bold text-ink">{f.title}</h3>
                <p className="text-sm text-ink-light mt-1.5 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-5">
          <div className="relative overflow-hidden rounded-4xl bg-gradient-warm p-10 sm:p-14 text-center border border-white/60 shadow-soft">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-blush opacity-20 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-sun opacity-30 blur-3xl" />
            <h2 className="relative font-display text-3xl sm:text-5xl font-black text-ink leading-tight">
              The street should feel like <span className="italic text-blush">yours.</span>
            </h2>
            <p className="relative mt-4 text-ink-light max-w-xl mx-auto">
              Start with one route. Tell us how it felt. Help the next woman walk a little more
              fearless.
            </p>
            <div className="relative mt-7 flex flex-wrap justify-center gap-3">
              <Link
                to="/routes"
                className="bg-ink text-cream rounded-full px-7 py-3.5 text-sm font-semibold shadow-soft hover:bg-blush transition-colors"
              >
                Plan a route
              </Link>
              <Link
                to="/reviews"
                className="bg-white/90 border border-border rounded-full px-7 py-3.5 text-sm font-semibold text-ink"
              >
                Share your story
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-4 sm:px-5 py-6 sm:py-10">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-ink">Route Map</h2>

        {/* Clean, isolated wrapper for the map with extra bottom margin */}
        <div
          className="mb-24"
          style={{ height: "450px", width: "100%", borderRadius: "16px", overflow: "hidden" }}
        >
          <MapView />
        </div>
      </div>
    </div>
  );
}
