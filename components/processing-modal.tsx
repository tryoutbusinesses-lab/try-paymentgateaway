"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { formatCurrency, CONVERSION_RATE } from "@/lib/types";
import { QrCode, Loader2, CheckCircle2 } from "lucide-react";

interface ProcessingModalProps {
  isOpen: boolean;
  amount: number;
  onComplete: () => void;
}

export function ProcessingModal({
  isOpen,
  amount,
  onComplete,
}: ProcessingModalProps) {
  const [stage, setStage] = useState<"qr" | "processing" | "success">("qr");
  const coins = amount / CONVERSION_RATE;

  useEffect(() => {
    if (isOpen) {
      setStage("qr");
      
      // Show QR for 2 seconds, then processing for 2 seconds
      const qrTimer = setTimeout(() => {
        setStage("processing");
      }, 2000);

      const processingTimer = setTimeout(() => {
        setStage("success");
      }, 4000);

      const completeTimer = setTimeout(() => {
        onComplete();
      }, 5500);

      return () => {
        clearTimeout(qrTimer);
        clearTimeout(processingTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isOpen, onComplete]);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl">
            {stage === "qr" && "Scan QR to Pay"}
            {stage === "processing" && "Processing Payment"}
            {stage === "success" && "Payment Successful!"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {stage === "qr" && "Scan this QR code with your mobile banking app"}
            {stage === "processing" && "Your transaction is being processed"}
            {stage === "success" && `You received ${coins} coins!`}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-6">
          {stage === "qr" && (
            <>
              <div className="relative rounded-2xl bg-card p-4 shadow-lg ring-1 ring-border">
                <div className="grid size-48 grid-cols-5 grid-rows-5 gap-1 rounded-lg bg-foreground p-3">
                  {/* Fake QR pattern */}
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-sm ${
                        [0, 1, 2, 4, 5, 6, 10, 14, 18, 19, 20, 22, 23, 24].includes(i)
                          ? "bg-background"
                          : "bg-foreground"
                      }`}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-lg bg-card p-2 shadow-md">
                    <QrCode className="size-8 text-primary" />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(amount)}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  = {coins} Game Coins
                </p>
              </div>
            </>
          )}

          {stage === "processing" && (
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="size-20 rounded-full bg-primary/10" />
                <Loader2 className="absolute inset-0 m-auto size-10 animate-spin text-primary" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-foreground">Please wait...</p>
                <p className="text-sm text-muted-foreground">
                  Verifying your payment
                </p>
              </div>
            </div>
          )}

          {stage === "success" && (
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="size-20 rounded-full bg-success/10" />
                <CheckCircle2 className="absolute inset-0 m-auto size-10 text-success" />
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">
                  +{coins} Coins
                </p>
                <p className="text-sm text-muted-foreground">
                  Added to your account
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <div className="flex gap-2">
            {["qr", "processing", "success"].map((s, i) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  stage === s
                    ? "w-6 bg-primary"
                    : i < ["qr", "processing", "success"].indexOf(stage)
                    ? "w-3 bg-primary/50"
                    : "w-3 bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
