import SchoolCard from "@/components/SchoolCard";

async function getSchools(nearby: boolean) {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://near-school-finder.vercel.app";

  const url = nearby
    ? `${baseUrl}/api/schools/nearby?lat=26.8467&lng=80.9462`
    : `${baseUrl}/api/schools`;

  try {
    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Fetch failed:", res.status);
      return [];
    }

    return await res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}

export default async function SchoolsPage({
  searchParams,
}: {
  searchParams: Promise<{ nearby?: string }>;
}) {
  const params = await searchParams;

  const nearby = params.nearby === "true";

  const schools = await getSchools(nearby);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        {nearby ? "Nearby Schools" : "Explore Schools"}
      </h1>

     <div className="grid md:grid-cols-3 gap-8">
  {schools.map((school: any, index: number) => (
    <SchoolCard
      key={school._id?.toString() || school.id || `school-${index}`}
      school={school}
    />
  ))}
</div>

      {schools.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          {nearby
            ? "No nearby schools found."
            : "No schools available."}
        </p>
      )}
    </div>
  );
}