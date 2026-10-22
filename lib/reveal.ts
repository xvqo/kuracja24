/**
 * Wspólne wejście strony: header, tło hero i treść pokazują się razem dopiero,
 * gdy shader i pierwsze zdjęcie są gotowe (albo po FALLBACK_MS, żeby nic nie wisiało).
 * Po odsłonięciu <html> dostaje atrybut data-revealed – resztę robi CSS.
 */
export type RevealKey = 'hero-shader' | 'hero-photo';

const FALLBACK_MS = 1800;
const pending = new Set<RevealKey>(['hero-shader', 'hero-photo']);
let fallback: ReturnType<typeof setTimeout> | undefined;

function reveal() {
  clearTimeout(fallback);
  document.documentElement.dataset.revealed = '';
}

export function releaseReveal(key: RevealKey) {
  if (typeof window === 'undefined') return;
  fallback ??= setTimeout(reveal, FALLBACK_MS);
  pending.delete(key);
  if (pending.size === 0) reveal();
}

/** Uruchamia zegar awaryjny – wołane przy montowaniu, zanim cokolwiek się załaduje. */
export function startRevealFallback() {
  fallback ??= setTimeout(reveal, FALLBACK_MS);
}
