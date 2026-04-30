"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Transaction } from "@/lib/types";

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  updateTransactionStatus: (id: string, status: "processing" | "done") => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

const STORAGE_KEY = "qris_transactions";

// Mock data for initial transactions
const mockTransactions: Transaction[] = [
  {
    id: "TXN1A2B3C4D",
    userId: "player123",
    amount: 50000,
    coins: 50,
    status: "done",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: "TXN5E6F7G8H",
    userId: "gamer456",
    amount: 25000,
    coins: 25,
    status: "done",
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: "TXN9I0J1K2L",
    userId: "pro_player",
    amount: 100000,
    coins: 100,
    status: "processing",
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
];

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTransactions(
          parsed.map((t: Transaction) => ({
            ...t,
            createdAt: new Date(t.createdAt),
          }))
        );
      } catch {
        setTransactions(mockTransactions);
      }
    } else {
      setTransactions(mockTransactions);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    }
  }, [transactions, isHydrated]);

  const addTransaction = useCallback((transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev]);

    // Simulate backend processing - update to "done" after 5-10 seconds
    setTimeout(() => {
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === transaction.id ? { ...t, status: "done" as const } : t
        )
      );
    }, 5000 + Math.random() * 5000);
  }, []);

  const updateTransactionStatus = useCallback(
    (id: string, status: "processing" | "done") => {
      setTransactions((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status } : t))
      );
    },
    []
  );

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, updateTransactionStatus }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error("useTransactions must be used within a TransactionProvider");
  }
  return context;
}
