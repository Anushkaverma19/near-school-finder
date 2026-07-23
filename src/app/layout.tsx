import "./globals.css";

import Providers from "./providers";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "NearSchool",
  description: "Find nearby schools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">

      <body>

        <Providers>

          <Navbar />

          {children}

        </Providers>

      </body>

    </html>
  );
}