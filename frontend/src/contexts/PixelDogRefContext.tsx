"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { PixelDog, type PixelDogHandle } from "@/components/PixelDog";

const PixelDogRefContext = createContext<React.RefObject<PixelDogHandle | null> | null>(null);

export function usePixelDogRef(): React.RefObject<PixelDogHandle | null> | null {
  return useContext(PixelDogRefContext);
}

export function PixelDogProvider({ children }: { children: ReactNode }) {
  const ref = useRef<PixelDogHandle | null>(null);

  return (
    <PixelDogRefContext.Provider value={ref}>
      <PixelDog ref={ref} />
      {children}
    </PixelDogRefContext.Provider>
  );
}
