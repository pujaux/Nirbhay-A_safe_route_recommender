import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Star } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  component: ReviewsPage,
});

type Review = {
  id: number;
  name: string;
  route: string;
  rating: number;
  accuracy: string;
  text: string;
  date: string;
};

const SEED: Review[] = [
  {
    id: 1,
    name: "Priya S.",
    route: "Lajpat Nagar → Sector 18 Noida",
    rating: 5,
    accuracy: "Yes — matched my experience",
    text: "The DND flyway route felt very safe at night. Fully lit and CCTV everywhere. Nirbhay got it right!",
    date: "10 May 2026",
  },
  {
    id: 2,
    name: "Rahul M.",
    route: "Connaught Place → Sector 62",
    rating: 4,
    accuracy: "Mostly yes — minor differences",
    text: "Really useful app. The NH-24 warning about Akshardham at night is accurate — that stretch does feel unsafe after 10 PM.",
    date: "9 May 2026",
  },
  {
    id: 3,
    name: "Sneha K.",
    route: "Saket → Noida City Centre",
    rating: 5,
    accuracy: "Yes — matched my experience",
    text: "As a solo female traveller I found this incredibly reassuring. The metro recommendation was spot on.",
    date: "8 May 2026",
  },
  {
    id: 4,
    name: "Aisha R.",
    route: "Khan Market → Hauz Khas",
    rating: 5,
    accuracy: "Yes — matched my experience",
    text: "Walked home at 10:30 PM following the South Ex route. Markets were buzzing, felt completely at ease.",
    date: "6 May 2026",
  },
];

function Stars({ count, onSet }: { count: number; onSet?: (n: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onMouseEnter={() => onSet && setHover(i)}
          onMouseLeave={() => onSet && setHover(0)}
          onClick={() => onSet && onSet(i)}
          className={`p-0.5 ${onSet ? "cursor-pointer" : "cursor-default"}`}
        >
          <Star
            className={`w-5 h-5 transition-colors ${i <= (hover || count) ? "text-amber fill-amber" : "text-border"}`}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(SEED);
  const [rating, setRating] = useState(0);
  const [form, setForm] = useState({ name: "", route: "", accuracy: "", text: "" });
  const [submitted, setSubmitted] = useState(false);

  function submit() {
    if (!form.name || !rating || !form.text) {
      alert("Please add your name, a star rating, and your feedback.");
      return;
    }
    setReviews([
      {
        id: Date.now(),
        ...form,
        rating,
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      },
      ...reviews,
    ]);
    setForm({ name: "", route: "", accuracy: "", text: "" });
    setRating(0);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  const avg = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);
  const initials = (n: string) =>
    n
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const inputCls =
    "w-full bg-white/80 border-2 border-border rounded-xl px-3.5 py-2.5 text-sm text-ink outline-none focus:border-blush transition-colors";
  const labelCls = "text-[11px] font-semibold uppercase tracking-wider text-ink-light mb-1.5 block";

  return (
    <div className="max-w-3xl mx-auto px-5 pt-10 pb-16">
      <div className="flex items-start justify-between gap-4 mb-8 animate-fadeUp">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-blush">
            Community
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-ink mt-1 leading-tight">
            Real walks,
            <br />
            <span className="italic text-blush">honest reviews</span>
          </h1>
          <p className="text-ink-light text-sm mt-3 max-w-md">
            How accurate were the safety scores? Share what you saw — help the next woman walk
            smarter.
          </p>
        </div>
        <div className="bg-gradient-warm rounded-3xl px-5 py-4 text-center border border-white/60 shadow-soft">
          <div className="font-display text-3xl font-black text-ink leading-none">{avg}</div>
          <div className="mt-1 flex justify-center">
            <Stars count={Math.round(parseFloat(avg))} />
          </div>
          <div className="text-[10px] text-ink-light mt-1">{reviews.length} reviews</div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white/85 backdrop-blur border border-border rounded-3xl p-6 mb-8 animate-fadeUp delay-1 shadow-soft">
        <p className="font-display text-xl font-bold text-ink mb-4">Leave a review</p>

        <div className="mb-4">
          <span className={labelCls}>Your rating</span>
          <Stars count={rating} onSet={setRating} />
        </div>

        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label className={labelCls}>Name</label>
            <input
              className={inputCls}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Priya S."
            />
          </div>
          <div>
            <label className={labelCls}>Route used</label>
            <input
              className={inputCls}
              value={form.route}
              onChange={(e) => setForm({ ...form, route: e.target.value })}
              placeholder="e.g. CP → Sector 18"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className={labelCls}>Was the safety score accurate?</label>
          <select
            className={inputCls}
            value={form.accuracy}
            onChange={(e) => setForm({ ...form, accuracy: e.target.value })}
          >
            <option value="">Select</option>
            <option>Yes — matched my experience</option>
            <option>Mostly yes — minor differences</option>
            <option>No — felt less safe than rated</option>
            <option>No — felt safer than rated</option>
            <option>Haven't travelled yet</option>
          </select>
        </div>

        <div className="mb-4">
          <label className={labelCls}>Your feedback</label>
          <textarea
            className={`${inputCls} resize-y min-h-22.5`}
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            placeholder="How did the route feel? What did we miss? What was great?"
          />
        </div>

        {submitted && (
          <p className="text-sm text-sage font-semibold mb-3">
            ✓ Thank you! Your review has been added.
          </p>
        )}

        <button
          onClick={submit}
          className="w-full bg-ink text-cream rounded-xl py-3 font-semibold text-sm hover:bg-blush transition-colors shadow-soft"
        >
          Submit review
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {reviews.map((r, i) => (
          <div
            key={r.id}
            className="animate-fadeUp bg-white/85 backdrop-blur border border-border rounded-3xl p-5"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-warm flex items-center justify-center text-ink text-xs font-bold shrink-0">
                {initials(r.name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-ink text-sm">{r.name}</p>
                  <p className="text-[11px] text-ink-light">{r.date}</p>
                </div>
                <Stars count={r.rating} />
              </div>
            </div>
            {r.route && <p className="text-xs text-blush font-medium mb-2">{r.route}</p>}
            {r.accuracy && (
              <span className="inline-block text-[10px] font-semibold uppercase tracking-wider bg-sun-soft text-amber px-2 py-0.5 rounded-full mb-2">
                {r.accuracy}
              </span>
            )}
            <p className="text-sm text-ink-light leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
