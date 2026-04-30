"use client";

import { PaymentForm } from "@/components/payment-form";
import { NavHeader } from "@/components/nav-header";
import { TransactionProvider, useTransactions } from "@/lib/transaction-context";
import { useRouter } from "next/navigation";

function PaymentPage() {
  const { addTransaction } = useTransactions();
  const router = useRouter();

  const handleTransactionCreate = (transaction: Parameters<typeof addTransaction>[0]) => {
    addTransaction(transaction);
    router.push("/history");
  };

  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <main className="mx-auto max-w-md px-4 py-8">
        <PaymentForm onTransactionCreate={handleTransactionCreate} />
        
        <div className="mt-8 space-y-4">
          <div className="rounded-xl bg-card p-4 shadow-sm ring-1 ring-border">
            <h3 className="mb-3 font-semibold text-foreground">How it works</h3>
            <ol className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  1
                </span>
                Enter your User ID and select amount
              </li>
              <li className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  2
                </span>
                Scan the QRIS code with your banking app
              </li>
              <li className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  3
                </span>
                Coins will be added to your account instantly
              </li>
            </ol>
          </div>
          
          <p className="text-center text-xs text-muted-foreground">
            Secure payment powered by QRIS Indonesia
          </p>
        </div>
      </main>
    </div>
  );
}

export default function Page() {
  return (
    <TransactionProvider>
      <PaymentPage />
    </TransactionProvider>
  );
}
