import { useState, useEffect, useCallback } from "react";
import {
  getReviews,
  addReview,
  averageRating,
  type Review,
  type NewReview,
} from "@/services/reviewsService";

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getReviews(50);
      setReviews(data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Could not load reviews. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const submitReview = async (review: NewReview) => {
    try {
      setSubmitting(true);
      setError(null);
      await addReview(review);
      setSubmitSuccess(true);
      // Optimistically add to list
      const optimistic: Review = {
        ...review,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      setReviews((prev) => [optimistic, ...prev]);
      setTimeout(() => setSubmitSuccess(false), 4000);
    } catch (err) {
      console.error("Error submitting review:", err);
      setError("Could not submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    reviews,
    loading,
    error,
    submitting,
    submitSuccess,
    submitReview,
    refetch: fetchReviews,
    avgRating: averageRating(reviews),
    totalReviews: reviews.length,
  };
}
