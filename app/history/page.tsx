"use client";

import { NavHeader } from "@/components/nav-header";
import { TransactionList } from "@/components/transaction-list";
import { TransactionProvider, useTransactions } from "@/lib/transaction-context";
import { History, Coins, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/types";

function HistoryContent() {
  const { transactions } = useTransactions();

  const totalCoins = transactions
    .filter((t) => t.status === "done")
    .reduce((sum, t) => sum + t.coins, 0);

  const totalSpent = transactions
    .filter((t) => t.status === "done")
    .reduce((sum, t) => sum + t.amount, 0);

  const processingCount = transactions.filter((t) => t.status === "processing").length;

  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <main className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-2.5">
            <History className="size-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Transaction History</h1>
            <p className="text-sm text-muted-foreground">
              {transactions.length} transaction{transactions.length !== 1 ? "s" : ""}
              {processingCount > 0 && (
                <span className="ml-2 text-warning">
                  • {processingCount} processing
                </span>
              )}
            </p>
          </div>
        </div>

        {transactions.length > 0 && (
          <div className="mb-6 grid gap-3 sm:grid-cols-2">
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="rounded-xl bg-primary/10 p-3">
                  <Coins className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Coins Earned</p>
                  <p className="text-2xl font-bold text-foreground">{totalCoins}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="rounded-xl bg-success/10 p-3">
                  <TrendingUp className="size-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatCurrency(totalSpent)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <TransactionList transactions={transactions} />
      </main>
    </div>
  );
}

export default function HistoryPage() {
  return (
    <TransactionProvider>
      <HistoryContent />
    </TransactionProvider>
  );
}
