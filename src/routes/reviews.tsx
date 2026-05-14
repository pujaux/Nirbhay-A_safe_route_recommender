import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useReviews } from "@/hooks/useReviews";
import { formatDate } from "@/services/reviewsService";
import {
  Star,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  MapPin,
  MessageCircleHeart,
} from "lucide-react";

export const Route = createFileRoute("/reviews")({
  component: ReviewsPage,
});

const ROUTES = [
  "Blue Line Metro",
  "DND Flyway via Ring Road",
  "NH-24 via Akshardham",
  "Kalindi Kunj Bridge Route",
  "Inner City via South Ex",
  "Noida Expressway Route",
  "Other Delhi-Noida route",
  "Within Delhi only",
  "Within Noida only",
];

const ACCURACY_OPTIONS = [
  "Yes — matched my experience",
  "Mostly yes — minor differences",
  "No — felt less safe than rated",
  "No — felt safer than rated",
  "Haven't travelled yet",
];

function StarRating({
  value,
  onChange,
  readonly = false,
  size = "md",
}: {
  value: number;
  onChange?: (v: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const [hover, setHover] = useState(0);
  const sz = size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-7 h-7" : "w-5 h-5";

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          disabled={readonly}
          onMouseEnter={() => !readonly && setHover(i)}
          onMouseLeave={() => !readonly && setHover(0)}
          onClick={() => onChange?.(i)}
          className={`${readonly ? "cursor-default" : "cursor-pointer hover:scale-110"} transition-transform`}
        >
          <Star
            className={`${sz} transition-colors ${
              i <= (hover || value) ? "fill-amber text-amber" : "fill-none text-border"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewCard({
  review,
}: {
  review: {
    id: string;
    name: string;
    route: string;
    rating: number;
    accuracy: string;
    text: string;
    createdAt: Date;
  };
}) {
  const initials = review.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="bg-white/80 backdrop-blur border border-border rounded-3xl p-5 animate-fadeUp">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center text-cream text-xs font-bold shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <p className="font-semibold text-ink text-sm">{review.name}</p>
            <p className="text-xs text-ink-light">{formatDate(review.createdAt)}</p>
          </div>
          <StarRating value={review.rating} readonly size="sm" />
        </div>
      </div>

      {review.route && (
        <div className="flex items-center gap-1.5 mb-2">
          <MapPin className="w-3 h-3 text-blush shrink-0" />
          <p className="text-xs text-blush font-medium truncate">{review.route}</p>
        </div>
      )}

      {review.accuracy && (
        <span className="inline-block text-[10px] bg-cream-dark text-ink-light px-2.5 py-1 rounded-full mb-2">
          Accuracy: {review.accuracy}
        </span>
      )}

      <p className="text-sm text-ink-light leading-relaxed">{review.text}</p>
    </div>
  );
}

function ReviewsPage() {
  const {
    reviews,
    loading,
    error,
    submitting,
    submitSuccess,
    submitReview,
    refetch,
    avgRating,
    totalReviews,
  } = useReviews();

  const [rating, setRating] = useState(0);
  const [form, setForm] = useState({
    name: "",
    route: "",
    accuracy: "",
    text: "",
    gender: "any",
  });
  const [formError, setFormError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return setFormError("Please enter your name.");
    if (!rating) return setFormError("Please select a star rating.");
    if (!form.text.trim()) return setFormError("Please write your feedback.");
    setFormError("");

    await submitReview({
      name: form.name.trim(),
      route: form.route,
      accuracy: form.accuracy,
      text: form.text.trim(),
      gender: form.gender,
      rating,
    });

    setForm({ name: "", route: "", accuracy: "", text: "", gender: "any" });
    setRating(0);
  }

  const fieldCls =
    "w-full bg-white border border-border rounded-2xl px-4 py-2.5 text-sm text-ink outline-none focus:border-blush transition-colors";

  return (
    <div className="max-w-2xl mx-auto px-5 pt-10 pb-20">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-blush">
            Community
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-ink mt-1 leading-tight">
            How did your <span className="italic text-blush">walk feel?</span>
          </h1>
          <p className="mt-2 text-sm text-ink-light">
            Help others walk smarter. Tell us how accurate the safety scores were.
          </p>
        </div>

        {/* Rating summary */}
        <div className="bg-ink rounded-3xl p-4 text-center shrink-0 min-w-22.5">
          <div className="font-display text-3xl font-black text-cream leading-none">
            {avgRating > 0 ? avgRating : "—"}
          </div>
          <StarRating value={Math.round(avgRating)} readonly size="sm" />
          <p className="text-[10px] text-cream/50 mt-1">{totalReviews} reviews</p>
        </div>
      </div>

      {/* Review form */}
      <div className="bg-white/90 border border-border rounded-3xl p-6 mb-8 shadow-soft">
        <div className="flex items-center gap-2 mb-5">
          <MessageCircleHeart className="w-5 h-5 text-blush" />
          <p className="font-semibold text-ink">Leave a review</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star rating */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-light mb-2">
              Your rating
            </p>
            <StarRating value={rating} onChange={setRating} size="lg" />
          </div>

          {/* Name + Gender */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-ink-light block mb-1.5">
                Name
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Priya S."
                className={fieldCls}
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-ink-light block mb-1.5">
                Traveller type
              </label>
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className={fieldCls}
              >
                <option value="any">Anyone</option>
                <option value="female">Solo female</option>
                <option value="male">Solo male</option>
                <option value="group">Group</option>
              </select>
            </div>
          </div>

          {/* Route */}
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-ink-light block mb-1.5">
              Route used
            </label>
            <select
              value={form.route}
              onChange={(e) => setForm({ ...form, route: e.target.value })}
              className={fieldCls}
            >
              <option value="">Select a route</option>
              {ROUTES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Accuracy */}
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-ink-light block mb-1.5">
              Was the safety score accurate?
            </label>
            <select
              value={form.accuracy}
              onChange={(e) => setForm({ ...form, accuracy: e.target.value })}
              className={fieldCls}
            >
              <option value="">Select</option>
              {ACCURACY_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          {/* Feedback text */}
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-ink-light block mb-1.5">
              Your feedback
            </label>
            <textarea
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              placeholder="How did the route feel? What did we miss? What was great?"
              rows={3}
              className={`${fieldCls} resize-none`}
            />
          </div>

          {/* Errors */}
          {formError && (
            <div className="flex items-center gap-2 text-destructive text-xs bg-destructive/10 px-3 py-2 rounded-xl">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {formError}
            </div>
          )}

          {/* Success */}
          {submitSuccess && (
            <div className="flex items-center gap-2 text-sage text-xs bg-sage/10 px-3 py-2 rounded-xl">
              <CheckCircle className="w-3.5 h-3.5 shrink-0" />
              Thank you! Your review has been saved to our database.
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 bg-ink text-cream rounded-2xl py-3 text-sm font-semibold hover:bg-blush transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" /> Submit review
              </>
            )}
          </button>
        </form>
      </div>

      {/* Reviews list */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-ink">
          {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
        </p>
        <button
          onClick={refetch}
          className="flex items-center gap-1.5 text-xs text-ink-light hover:text-ink transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-blush" />
          <span className="ml-2 text-sm text-ink-light">Loading reviews...</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 px-4 py-3 rounded-2xl mb-4">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
          <button onClick={refetch} className="ml-auto underline text-xs">
            Retry
          </button>
        </div>
      )}

      {!loading && !error && reviews.length === 0 && (
        <div className="text-center py-12 bg-white/60 rounded-3xl border border-border">
          <MessageCircleHeart className="w-10 h-10 text-blush mx-auto mb-3" />
          <p className="font-semibold text-ink">No reviews yet</p>
          <p className="text-sm text-ink-light mt-1">Be the first to share how your walk felt!</p>
        </div>
      )}

      <div className="space-y-4">
        {reviews.map((review, i) => (
          <div key={review.id} style={{ animationDelay: `${i * 0.06}s` }}>
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    </div>
  );
}
