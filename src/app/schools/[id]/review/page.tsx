"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReviewPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    rating: 5,
    comment: "",
  });

  async function submitReview(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const res = await fetch(
      `/api/schools/${params.id}/review`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    setLoading(false);

    if (res.ok) {
      alert("Review Added Successfully");
      router.push(`/schools/${params.id}`);
      router.refresh();
    } else {
      alert("Failed to add review");
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-6">

      <form
        onSubmit={submitReview}
        className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-xl space-y-5"
      >

        <h1 className="text-3xl font-bold">
          ⭐ Add Review
        </h1>

        <input
          required
          placeholder="Your Name"
          className="w-full border rounded-xl p-3"
          onChange={(e) =>
            setForm({
              ...form,
              username: e.target.value,
            })
          }
        />

        <select
          className="w-full border rounded-xl p-3"
          onChange={(e) =>
            setForm({
              ...form,
              rating: Number(e.target.value),
            })
          }
        >
          <option value={5}>⭐⭐⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={1}>⭐</option>
        </select>

        <textarea
          required
          rows={5}
          placeholder="Write your review..."
          className="w-full border rounded-xl p-3"
          onChange={(e) =>
            setForm({
              ...form,
              comment: e.target.value,
            })
          }
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>

      </form>

    </div>
  );
}