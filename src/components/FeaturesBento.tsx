"use client";

import { Card } from "@/components/ui/card";

export function FeaturesBento() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(140px,_1fr)]">
      <Card className="col-span-2 rounded-xl border border-zinc-200 dark:border-white/10 p-6 bg-[radial-gradient(80%_80%_at_50%_0%,rgba(16,185,129,0.06),transparent_60%)]">
        <div className="text-sm text-muted-foreground">Guided Learning</div>
        <div className="mt-2 text-xl font-semibold tracking-tight">Socratic tutoring, not instant answers</div>
      </Card>
      <Card className="col-span-1 rounded-xl border border-zinc-200 dark:border-white/10 p-6 bg-[radial-gradient(80%_80%_at_50%_0%,rgba(16,185,129,0.05),transparent_60%)]">
        <div className="text-sm text-muted-foreground">Math & Science</div>
        <div className="mt-2 text-base font-medium tracking-tight">Understands steps and formulas</div>
      </Card>
      <Card className="col-span-1 rounded-xl border border-zinc-200 dark:border-white/10 p-6 bg-[radial-gradient(80%_80%_at_50%_0%,rgba(16,185,129,0.05),transparent_60%)]">
        <div className="text-sm text-muted-foreground">Images</div>
        <div className="mt-2 text-base font-medium tracking-tight">Upload photos of problems</div>
      </Card>
      <Card className="col-span-2 lg:col-span-1 rounded-xl border border-zinc-200 dark:border-white/10 p-6 bg-[radial-gradient(80%_80%_at_50%_0%,rgba(16,185,129,0.05),transparent_60%)]">
        <div className="text-sm text-muted-foreground">Hints</div>
        <div className="mt-2 text-base font-medium tracking-tight">Get subtle nudges, not spoilers</div>
      </Card>
      <Card className="col-span-2 lg:col-span-3 rounded-xl border border-zinc-200 dark:border-white/10 p-6 bg-[radial-gradient(80%_80%_at_50%_0%,rgba(16,185,129,0.04),transparent_60%)]">
        <div className="text-sm text-muted-foreground">Confidence</div>
        <div className="mt-2 text-xl font-semibold tracking-tight">Build problem-solving skills over time</div>
      </Card>
    </div>
  );
}
