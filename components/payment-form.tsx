"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ProcessingModal } from "@/components/processing-modal";
import { Transaction, CONVERSION_RATE, generateTransactionId, formatCurrency } from "@/lib/types";
import { QrCode, Coins, User, Wallet } from "lucide-react";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";

interface PaymentFormProps {
  onTransactionCreate: (transaction: Transaction) => void;
}

const PRESET_AMOUNTS = [5000, 10000, 25000, 50000, 100000];

export function PaymentForm({ onTransactionCreate }: PaymentFormProps) {
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const coins = amount / CONVERSION_RATE;

  const handleAmountSelect = (value: number) => {
    setAmount(value);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const numValue = parseInt(value) || 0;
    setAmount(numValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim() || amount < 1000) return;
    setIsProcessing(true);
  };

  const handlePaymentComplete = () => {
    const transaction: Transaction = {
      id: generateTransactionId(),
      userId: userId.trim(),
      amount,
      coins: amount / CONVERSION_RATE,
      status: "processing",
      createdAt: new Date(),
    };

    onTransactionCreate(transaction);
    setIsProcessing(false);
    setUserId("");
    setAmount(0);
    setCustomAmount("");
  };

  return (
    <>
      <Card className="shadow-lg">
        <CardHeader className="space-y-1 pb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2.5">
              <Coins className="size-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Top Up Game Coins</CardTitle>
              <CardDescription>via QRIS Payment</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="userId">
                  <span className="flex items-center gap-2">
                    <User className="size-4" />
                    User ID
                  </span>
                </FieldLabel>
                <Input
                  id="userId"
                  placeholder="Enter your game user ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <FieldLabel>
                  <span className="flex items-center gap-2">
                    <Wallet className="size-4" />
                    Amount (IDR)
                  </span>
                </FieldLabel>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {PRESET_AMOUNTS.map((preset) => (
                    <Button
                      key={preset}
                      type="button"
                      variant={amount === preset && !customAmount ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleAmountSelect(preset)}
                      className="h-10"
                    >
                      {(preset / 1000)}K
                    </Button>
                  ))}
                </div>
              </Field>

              <Field>
                <FieldLabel htmlFor="customAmount">Or enter custom amount</FieldLabel>
                <Input
                  id="customAmount"
                  type="number"
                  placeholder="Minimum 1,000 IDR"
                  min={1000}
                  step={1000}
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                />
              </Field>
            </FieldGroup>

            {amount >= 1000 && (
              <div className="rounded-xl bg-primary/5 p-4 ring-1 ring-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">You will receive</p>
                    <p className="text-2xl font-bold text-primary">{coins} Coins</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Payment</p>
                    <p className="text-lg font-semibold text-foreground">
                      {formatCurrency(amount)}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Rate: 1,000 IDR = 1 Coin
                </p>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full gap-2"
              disabled={!userId.trim() || amount < 1000}
            >
              <QrCode className="size-5" />
              Pay with QRIS
            </Button>
          </form>
        </CardContent>
      </Card>

      <ProcessingModal
        isOpen={isProcessing}
        amount={amount}
        onComplete={handlePaymentComplete}
      />
    </>
  );
}
