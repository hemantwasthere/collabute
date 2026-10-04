"use client";

import * as React from "react";
import { ArrowRight, Check, CirclePlay } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { site } from "@/lib/site";

const steps = [
  {
    label: "Capture the conversation",
    source: "Monday · Product sync",
    quote:
      "Let's ship the new onboarding on Friday. Maya, can you handle the empty states?",
    result: "A decision, an owner, and a deadline. Captured together.",
  },
  {
    label: "Connect the context",
    source: "Tuesday · #design",
    quote:
      "The empty states are ready. We're still waiting on the events API from engineering.",
    result:
      "Collabute connects the update to Monday's decision and spots the dependency.",
  },
  {
    label: "Move the work forward",
    source: "Wednesday · Linear",
    quote:
      "Onboarding empty states → Maya. Events API dependency → Engineering. Launch → Friday.",
    result:
      "Tickets drafted. Blocker surfaced. Everyone has the context to act.",
  },
];

export function DemoDialog() {
  const [step, setStep] = React.useState(0);
  const current = steps[step];

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) setStep(0);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="lg">
          <CirclePlay />
          See it in action
        </Button>
      </DialogTrigger>
      <DialogContent>
        <BrandMark className="mb-6 size-9 text-primary" />
        <p className="eyebrow mb-3">A LITTLE LESS CHASING</p>
        <DialogTitle className="text-3xl font-medium tracking-tight">
          One conversation. Real progress.
        </DialogTitle>
        <DialogDescription className="mt-3 text-sm leading-6 text-muted-foreground">
          Follow an example launch from the first decision to the next action.
        </DialogDescription>
        <div className="my-7 flex gap-2" aria-label={`Step ${step + 1} of 3`}>
          {steps.map((item, index) => (
            <button
              key={item.label}
              onClick={() => setStep(index)}
              aria-label={`Step ${index + 1}: ${item.label}`}
              aria-current={index === step ? "step" : undefined}
              className={`h-1.5 flex-1 rounded-full transition-colors ${index <= step ? "bg-primary" : "bg-border"}`}
            />
          ))}
        </div>
        <div
          className="min-h-56 rounded-lg border border-border bg-secondary/50 p-6"
          aria-live="polite"
        >
          <p className="eyebrow text-primary">
            0{step + 1} / {current.label}
          </p>
          <p className="mt-6 text-xs text-muted-foreground">{current.source}</p>
          <p className="mt-2 text-lg leading-7">“{current.quote}”</p>
          <p className="mt-5 flex items-start gap-2 text-sm leading-6 text-primary">
            <Check className="mt-1 size-4 shrink-0" />
            {current.result}
          </p>
        </div>
        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="font-mono text-xs text-muted-foreground">
            ILLUSTRATIVE WORKFLOW
          </span>
          {step < 2 ? (
            <Button onClick={() => setStep(step + 1)}>
              Next step
              <ArrowRight />
            </Button>
          ) : (
            <Button asChild>
              <a href={site.signup}>
                Try Collabute
                <ArrowRight />
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
