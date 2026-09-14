import { ReactNode, useEffect, useState } from "react";

type Phase = "loading" | "expanding" | "done";

type LoaderGateProps = {
    /** How long the loader runs, counted from page start, before it starts expanding. */
    duration?: number;
    /** How long the expand-and-reveal takes. Must match the exit animations in index.html. */
    expandDuration?: number;
    children: ReactNode;
};

/**
 * Drives the static #boot-loader in index.html, which is on screen from the
 * first paint - before any JS runs. Holds it until `duration` has passed since
 * page start, then lets it expand off the viewport while the page fades in
 * underneath.
 */
export default function LoaderGate({
    duration = 3000,
    expandDuration = 1000,
    children,
}: LoaderGateProps) {
    const [phase, setPhase] = useState<Phase>("loading");

    useEffect(() => {
        // The loader has been visible since navigation start, so only wait out the rest.
        const remaining = Math.max(0, duration - performance.now());
        const startExpanding = setTimeout(() => setPhase("expanding"), remaining);
        const finish = setTimeout(() => setPhase("done"), remaining + expandDuration);

        return () => {
            clearTimeout(startExpanding);
            clearTimeout(finish);
        };
    }, [duration, expandDuration]);

    useEffect(() => {
        const loader = document.getElementById("boot-loader");
        if (!loader) return;

        if (phase === "expanding") loader.classList.add("is-expanding");
        if (phase === "done") loader.remove();
    }, [phase]);

    // mounted a beat early so the page is painted behind the expanding loader
    return <>{phase !== "loading" && children}</>;
}
