import { useSyncExternalStore } from "react";

const cache = new Map<string, { raw: string | null; value: unknown }>();

function readSession<T>(key: string): T | null {
  const raw = sessionStorage.getItem(key);
  const hit = cache.get(key);
  if (hit && hit.raw === raw) return hit.value as T | null;
  let value: T | null = null;
  if (raw) {
    try {
      value = JSON.parse(raw) as T;
    } catch {
      value = null;
    }
  }
  cache.set(key, { raw, value });
  return value;
}

export function useSessionJson<T>(key: string): T | null {
  return useSyncExternalStore(
    () => () => {},
    () => readSession<T>(key),
    () => null,
  );
}
