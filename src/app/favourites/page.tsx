"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

        {/* Left */}

        <div>

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
            📍 India's Smart School Finder
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold mt-6 leading-tight text-gray-900">
            Find The Perfect
            <br />
            School Near You 🏫
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Discover nearby schools, compare ratings, explore facilities,
            read reviews and save your favourite schools.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">

            <Link
              href="/schools"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Explore Schools
            </Link>

            <Link
              href="/schools?nearby=true"
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
            >
              Nearby Schools
            </Link>

            {session && (
              <Link
                href="/schools/add"
                className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
              >
                Add School
              </Link>
            )}

          </div>

          <div className="grid grid-cols-3 gap-6 mt-14">

            <div>
              <h3 className="text-3xl font-bold text-blue-600">500+</h3>
              <p className="text-gray-500">Schools</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-yellow-500">4.8⭐</h3>
              <p className="text-gray-500">Ratings</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-green-600">24/7</h3>
              <p className="text-gray-500">Search</p>
            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex justify-center">

          <div className="bg-white rounded-3xl shadow-2xl p-8 hover:scale-105 transition duration-300">

            <Image
              src="/school-3d.png"
              width={500}
              height={500}
              alt="School"
              className="object-contain"
              priority
            />

          </div>

        </div>

      </section>
    </div>
  );
}