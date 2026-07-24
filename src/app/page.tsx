"use client";

import Link from "next/link";
import {
  Search,
  Plus,
  Star,
  MapPin,
  School,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";

export default function Home() {
  return (
    <main className="bg-slate-950 text-white overflow-hidden">

      {/* Hero */}
      <section className="relative min-h-screen">

        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000&q=80')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-900/40" />

        {/* Blur */}
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-600/30 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[150px]" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24">

          <div className="grid w-full items-center gap-14 lg:grid-cols-2">

            {/* Left */}

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-5 py-2 text-sm text-blue-200 backdrop-blur-xl">

                <ShieldCheck size={16} />

                Trusted by 10,000+ Students

              </div>

              <h1 className="mt-8 text-5xl font-black leading-tight md:text-7xl">

                Find The

                <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-500 bg-clip-text text-transparent">

                  Perfect School

                </span>

                Near You

              </h1>

              <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">

                Search nearby schools, compare ratings, explore facilities,
                and discover the best education options around you with our
                smart school finder.

              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">

                <Link
                  href="/schools"
                  className="group flex items-center justify-center gap-3 rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold shadow-xl transition hover:scale-105 hover:bg-blue-700"
                >
                  <Search size={20} />

                  Explore Schools

                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/add-school"
                  className="flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-xl transition hover:bg-white/20"
                >
                  <Plus size={20} />

                  Add School
                </Link>

              </div>

              <div className="mt-12 grid grid-cols-3 gap-5">

                <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">

                  <School className="text-blue-400" />

                  <h3 className="mt-3 text-3xl font-bold">
                    500+
                  </h3>

                  <p className="text-slate-300">
                    Schools
                  </p>

                </div>

                <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">

                  <MapPin className="text-cyan-400" />

                  <h3 className="mt-3 text-3xl font-bold">
                    50+
                  </h3>

                  <p className="text-slate-300">
                    Cities
                  </p>

                </div>

                <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">

                  <Star className="text-yellow-400 fill-yellow-400" />

                  <h3 className="mt-3 text-3xl font-bold">
                    4.9
                  </h3>

                  <p className="text-slate-300">
                    Rating
                  </p>

                </div>

              </div>

            </div>

            {/* Right */}

            <div className="relative hidden lg:flex justify-center">

              <div className="absolute -top-8 -left-6 rounded-3xl bg-blue-500/20 p-6 backdrop-blur-xl border border-white/10">

                <GraduationCap
                  size={42}
                  className="text-blue-300"
                />

              </div>

              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80"
                alt="School"
                className="h-[650px] w-[520px] rounded-[40px] object-cover shadow-[0_30px_80px_rgba(0,0,0,0.45)] border border-white/10"
              />

              <div className="absolute -bottom-8 right-0 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">

                <p className="text-sm text-slate-300">
                  Smart Nearby Search
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  Find Schools
                  <br />
                  Instantly
                </h3>

              </div>

            </div>

          </div>

        </div>

      </section>
            {/* Features Section */}
      <section className="bg-slate-950 py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
              WHY CHOOSE US
            </span>

            <h2 className="mt-6 text-4xl font-bold md:text-5xl">
              Everything You Need To Find
              <span className="block text-blue-400">
                The Best School
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-slate-400">
              Search nearby schools, compare ratings, explore facilities
              and make smarter education decisions with confidence.
            </p>

          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">

            <FeatureCard
              icon={<Search size={30} />}
              title="Smart Search"
              description="Quickly discover schools near your location using intelligent search."
            />

            <FeatureCard
              icon={<Star size={30} />}
              title="Verified Ratings"
              description="Compare ratings and reviews from students and parents."
            />

            <FeatureCard
              icon={<MapPin size={30} />}
              title="Nearby Schools"
              description="Explore the closest schools with accurate location support."
            />

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 py-24">

        <div className="mx-auto max-w-4xl px-6 text-center">

          <h2 className="text-4xl font-bold md:text-5xl">

            Ready To Explore Schools?

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">

            Start searching thousands of schools and discover
            the perfect education destination today.

          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              href="/schools"
              className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-blue-700 transition hover:scale-105"
            >
              Explore Schools
            </Link>

            <Link
              href="/add-school"
              className="rounded-full border border-white px-8 py-4 text-lg font-semibold text-white transition hover:bg-white hover:text-blue-700"
            >
              Add School
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-[30px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-3 hover:border-blue-500/40 hover:bg-white/10">

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-400">

        {icon}

      </div>

      <h3 className="mt-6 text-2xl font-bold">

        {title}

      </h3>

      <p className="mt-4 leading-7 text-slate-400">

        {description}

      </p>

    </div>
  );
}