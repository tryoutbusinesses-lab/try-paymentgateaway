"use client";

import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";
import { Transaction, formatCurrency, formatTime } from "@/lib/types";
import { Coins, Receipt, User, Clock } from "lucide-react";

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 rounded-full bg-muted p-4">
            <Receipt className="size-8 text-muted-foreground" />
          </div>
          <h3 className="mb-1 font-semibold text-foreground">No transactions yet</h3>
          <p className="text-sm text-muted-foreground">
            Your transaction history will appear here
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <Card
          key={transaction.id}
          className="transition-all duration-200 hover:shadow-md"
        >
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between sm:justify-start sm:gap-4">
                  <code className="rounded bg-muted px-2 py-1 font-mono text-xs text-foreground">
                    {transaction.id}
                  </code>
                  <StatusBadge status={transaction.status} />
                </div>
                
                <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-6">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="size-4 text-muted-foreground" />
                    <span className="text-muted-foreground">User:</span>
                    <span className="font-medium text-foreground">{transaction.userId}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="size-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{formatTime(transaction.createdAt)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between gap-4 border-t pt-3 sm:border-t-0 sm:border-l sm:pl-4 sm:pt-0">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Amount</p>
                  <p className="font-semibold text-foreground">
                    {formatCurrency(transaction.amount)}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2">
                  <Coins className="size-5 text-primary" />
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Coins</p>
                    <p className="font-bold text-primary">{transaction.coins}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
