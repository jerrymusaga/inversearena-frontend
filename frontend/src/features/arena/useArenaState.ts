import { useState, useEffect, useRef } from "react";
import { fetchArenaState } from "@/shared-d/utils/stellar-transactions";

export type ArenaHealthStatus = "connected" | "degraded" | "offline";

export interface ArenaState {
  id: string;
  state: "open" | "active" | "finished" | "cancelled";
  survivorsCount: number;
  maxCapacity: number;
  currentRound: number;
  isUserIn: boolean;
  hasWon: boolean;
  currentStake: number;
  potentialPayout: number;
}

export interface UseArenaStateReturn {
  state: ArenaState | null;
  health: ArenaHealthStatus;
}

export function useArenaState(arenaId: string): UseArenaStateReturn {
  const [state, setState] = useState<ArenaState | null>(null);
  const [health, setHealth] = useState<ArenaHealthStatus>("connected");
  const errorCount = useRef(0);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    async function poll() {
      try {
        // fetchArenaState expects (arenaId, userAddress) — pass empty string when no address
        const data = await fetchArenaState(arenaId, "");

        if (!isMounted.current) return;

        setState(data as unknown as ArenaState);
        errorCount.current = 0;
        setHealth("connected");

        // Slow down when game is finished
        const interval =
          (data as unknown as ArenaState).state === "finished" ? 30_000 : 5_000;
        timeoutId.current = setTimeout(poll, interval);
      } catch {
        if (!isMounted.current) return;

        errorCount.current++;
        setHealth(errorCount.current > 3 ? "offline" : "degraded");

        // Exponential backoff: 5s → 10s → 20s → max 60s
        const backoff = Math.min(5_000 * 2 ** (errorCount.current - 1), 60_000);
        timeoutId.current = setTimeout(poll, backoff);
      }
    }

    poll();

    return () => {
      isMounted.current = false;
      if (timeoutId.current !== null) {
        clearTimeout(timeoutId.current);
        timeoutId.current = null;
      }
    };
  }, [arenaId]);

  return { state, health };
}
