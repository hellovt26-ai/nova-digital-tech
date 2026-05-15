import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NOVA Admin — Lead Dashboard",
  description: "Admin dashboard for NOVA DIGITAL TECH lead management",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
