import SchoolCard from "@/components/SchoolCard";

async function getSchools(nearby: boolean) {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://near-school-finder.vercel.app";

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
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            {nearby ? "Nearby Schools" : "Explore Schools"}
          </h1>

          <p className="mt-3 text-gray-600">
            Find schools around your location
          </p>
        </div>

        {schools.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {schools.map((school: any, index: number) => (
              <SchoolCard
                key={
                  school._id?.toString() ||
                  school.id ||
                  `school-${index}`
                }
                school={school}
              />
            ))}
          </div>
        ) : (
          <div className="text-center mt-16">
            <p className="text-gray-500 text-lg">
              {nearby
                ? "No nearby schools found."
                : "No schools available."}
            </p>
          </div>
        )}

      </div>
    </main>
  );
}