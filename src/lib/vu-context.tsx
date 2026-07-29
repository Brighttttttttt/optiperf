"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { activites } from "./mock";

interface VuContextValue {
  estVu: (id: string) => boolean;
  marquerVu: (id: string) => void;
}

const VuContext = createContext<VuContextValue | null>(null);

export function VuProvider({ children }: { children: React.ReactNode }) {
  const [vus, setVus] = useState<Set<string>>(() => new Set(activites.filter((a) => a.vue).map((a) => a.id)));

  const value = useMemo<VuContextValue>(
    () => ({
      estVu: (id: string) => vus.has(id),
      marquerVu: (id: string) =>
        setVus((prev) => {
          if (prev.has(id)) return prev;
          return new Set(prev).add(id);
        })
    }),
    [vus]
  );

  return <VuContext.Provider value={value}>{children}</VuContext.Provider>;
}

export function useVu(): VuContextValue {
  const ctx = useContext(VuContext);
  if (!ctx) throw new Error("useVu doit être utilisé à l'intérieur de <VuProvider>");
  return ctx;
}
