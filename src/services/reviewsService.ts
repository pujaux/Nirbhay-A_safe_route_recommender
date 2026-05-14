import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

export type Review = {
  id: string;
  name: string;
  route: string;
  rating: number;
  accuracy: string;
  text: string;
  gender: string;
  createdAt: Date;
};

export type NewReview = Omit<Review, "id" | "createdAt">;

const COLLECTION = "reviews";

// Add a new review to Firestore
export async function addReview(review: NewReview): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...review,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

// Get all reviews, newest first
export async function getReviews(limitCount = 50): Promise<Review[]> {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"), limit(limitCount));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt:
      doc.data().createdAt instanceof Timestamp ? doc.data().createdAt.toDate() : new Date(),
  })) as Review[];
}

// Get reviews for a specific route
export async function getReviewsByRoute(routeName: string): Promise<Review[]> {
  const q = query(
    collection(db, COLLECTION),
    where("route", "==", routeName),
    orderBy("createdAt", "desc"),
  );
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt:
      doc.data().createdAt instanceof Timestamp ? doc.data().createdAt.toDate() : new Date(),
  })) as Review[];
}

// Calculate average rating from a list of reviews
export function averageRating(reviews: Review[]): number {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

// Format date nicely
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
