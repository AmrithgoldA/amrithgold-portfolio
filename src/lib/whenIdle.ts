/**
 * Runs `callback` once the browser has a quiet moment (or after `timeout` ms at the latest).
 * Returns a function that cancels it, so it can be returned straight from a useEffect.
 */
export function whenIdle(callback: () => void, timeout = 2000) {
    if (typeof window.requestIdleCallback === "function") {
        const id = window.requestIdleCallback(callback, { timeout });
        return () => window.cancelIdleCallback(id);
    }

    // Safari has no requestIdleCallback
    const id = setTimeout(callback, 300);
    return () => clearTimeout(id);
}
