export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  coins: number;
  status: "processing" | "done";
  createdAt: Date;
}

export const CONVERSION_RATE = 1000; // 1000 IDR = 1 Coin

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function generateTransactionId(): string {
  return `TXN${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
}
