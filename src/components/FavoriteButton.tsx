"use client";

import { useState } from "react";

export default function FavoriteButton({
  schoolId,
}: {
  schoolId: number;
}) {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function saveSchool() {
    setLoading(true);

    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        schoolId,
      }),
    });

    if (res.ok) {
      setSaved(true);
    }

    setLoading(false);
  }

  return (
    <button
      onClick={saveSchool}
      disabled={loading || saved}
      className="
      bg-red-500
      text-white
      px-4
      py-2
      rounded-xl
      hover:bg-red-600
      transition
      "
    >
      {saved ? "❤️ Saved" : loading ? "Saving..." : "❤️ Save"}
    </button>
  );
}