"use client";

import Link from "next/link";
import { Search, MapPin, School, Star } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Background */}
        <div
          className="
          absolute inset-0
          bg-[url('https://images.unsplash.com/photo-1562774053-701939374585')]
          bg-cover
          bg-center
          "
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />


        {/* Content */}
        <div
          className="
          relative
          z-10
          max-w-5xl
          mx-auto
          px-6
          text-center
          "
        >

          <div
            className="
            backdrop-blur-xl
            bg-white/10
            border
            border-white/20
            rounded-3xl
            p-10
            shadow-2xl
            "
          >

            <div className="flex justify-center mb-6">
              <div
                className="
                p-5
                rounded-full
                bg-blue-500/20
                border
                border-blue-400/30
                "
              >
                <School size={55} />
              </div>
            </div>


            <h1
              className="
              text-5xl
              md:text-7xl
              font-extrabold
              leading-tight
              "
            >
              Find Best Schools
              <br />

              <span className="text-blue-400">
                Near You
              </span>

            </h1>


            <p
              className="
              mt-6
              text-lg
              text-gray-200
              max-w-2xl
              mx-auto
              "
            >
              Discover nearby schools, compare ratings,
              check facilities and choose the perfect
              education destination.
            </p>


            {/* Explore Button */}
            <div className="mt-8 flex justify-center">

              <Link
                href="/schools"
                className="
                flex
                items-center
                gap-3
                bg-blue-500
                hover:bg-blue-600
                px-8
                py-4
                rounded-full
                text-lg
                font-semibold
                shadow-xl
                transition
                hover:scale-105
                "
              >

                <Search />

                Explore Schools

              </Link>

            </div>

          </div>

        </div>


        {/* Stats */}
        <div
          className="
          absolute
          bottom-10
          z-20
          grid
          grid-cols-3
          gap-5
          "
        >

          <Stat
            icon={<School />}
            text="500+ Schools"
          />


          <Stat
            icon={<MapPin />}
            text="Nearby Search"
          />


          <Stat
            icon={<Star />}
            text="Top Rated"
          />

        </div>


      </section>

    </main>
  );
}



function Stat({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {

  return (

    <div
      className="
      bg-white/10
      backdrop-blur-lg
      border
      border-white/20
      rounded-2xl
      px-6
      py-4
      flex
      items-center
      gap-3
      shadow-xl
      "
    >

      {icon}

      <span className="text-sm">
        {text}
      </span>

    </div>

  );
}