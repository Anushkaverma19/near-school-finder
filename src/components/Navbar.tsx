"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  School,
  User,
  Menu,
  X,
  Home,
  MapPinned,
  LayoutDashboard,
  PlusCircle,
  Heart,
  LogOut,
} from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

          {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-3 text-2xl font-bold text-blue-600"
          >
            <School className="h-8 w-8" />
            <span>NearSchool</span>
          </Link>

          {/* Desktop Menu */}

          <div className="hidden md:flex items-center gap-8 font-medium text-gray-700">

            <Link
              href="/"
              className="hover:text-blue-600 transition"
            >
              Home
            </Link>

            <Link
              href="/schools?nearby=true"
              className="hover:text-blue-600 transition"
            >
              Schools
            </Link>

            {session && (
              <>
                <Link
                  href="/dashboard"
                  className="hover:text-blue-600 transition"
                >
                  Dashboard
                </Link>

                <Link
                  href="/schools/add"
                  className="hover:text-blue-600 transition"
                >
                  Add School
                </Link>
              </>
            )}
          </div>

          {/* Right Side */}

          <div className="flex items-center gap-3">

            {!session ? (
              <button
                onClick={() => signIn("google")}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 font-semibold text-white shadow-lg transition hover:scale-105"
              >
                Login
              </button>
            ) : (
              <div className="relative">

                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 rounded-full border bg-white px-3 py-2 shadow hover:shadow-md transition"
                >
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      width={38}
                      height={38}
                      className="rounded-full border-2 border-blue-500"
                    />
                  ) : (
                    <User />
                  )}

                  <span className="hidden lg:block font-medium">
                    {session.user?.name}
                  </span>
                </button>
                                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-72 rounded-2xl border bg-white p-5 shadow-2xl z-50">

                    <div className="flex items-center gap-3 border-b pb-4">

                      {session.user?.image ? (
                        <Image
                          src={session.user.image}
                          alt="Profile"
                          width={50}
                          height={50}
                          className="rounded-full border-2 border-blue-500"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                          <User className="text-blue-600" />
                        </div>
                      )}

                      <div>
                        <h3 className="font-bold text-gray-800">
                          {session.user?.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {session.user?.email}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">

                      <Link
                        href="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-blue-50 transition"
                      >
                        <LayoutDashboard size={18} />
                        Dashboard
                      </Link>

                      <Link
                        href="/schools/add"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-blue-50 transition"
                      >
                        <PlusCircle size={18} />
                        Add School
                      </Link>

                      <Link
  href="/favorites"
  onClick={() => setProfileOpen(false)}
  className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-blue-50 transition"
>
  <Heart size={18} />
  Favourites
</Link>

                      <button
                        onClick={() =>
                          signOut({
                            callbackUrl: "/",
                          })
                        }
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>

                    </div>

                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

          </div>
        </div>

        {/* Mobile Menu */}

        {mobileOpen && (
          <div className="border-t bg-white md:hidden">

            <div className="space-y-2 p-4">

              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-xl p-3 hover:bg-blue-50"
              >
                <Home size={20} />
                Home
              </Link>

              <Link
                href="/schools?nearby=true"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-xl p-3 hover:bg-blue-50"
              >
                <MapPinned size={20} />
                Schools
              </Link>

              {session && (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-xl p-3 hover:bg-blue-50"
                  >
                    <LayoutDashboard size={20} />
                    Dashboard
                  </Link>

                  <Link
                    href="/schools/add"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-xl p-3 hover:bg-blue-50"
                  >
                    <PlusCircle size={20} />
                    Add School
                  </Link>

             <Link
  href="/favourites"
  onClick={() => setMobileOpen(false)}
  className="flex items-center gap-3 rounded-xl p-3 hover:bg-blue-50"
>
  <Heart size={20} />
  Favourites
</Link>

                  <button
                    onClick={() =>
                      signOut({
                        callbackUrl: "/",
                      })
                    }
                    className="mt-2 w-full rounded-xl bg-red-500 py-3 font-semibold text-white"
                  >
                    Logout
                  </button>
                </>
              )}

              {!session && (
                <button
                  onClick={() => signIn("google")}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white"
                >
                  Login with Google
                </button>
              )}

            </div>

          </div>
        )}
      </nav>
    </>
  );
}