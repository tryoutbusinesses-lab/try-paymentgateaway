"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Coins, History, CreditCard } from "lucide-react";

export function NavHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-lg bg-primary p-1.5">
            <Coins className="size-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">QRIS Pay</span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === "/"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <CreditCard className="size-4" />
            <span className="hidden sm:inline">Top Up</span>
          </Link>
          <Link
            href="/history"
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === "/history"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <History className="size-4" />
            <span className="hidden sm:inline">History</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
