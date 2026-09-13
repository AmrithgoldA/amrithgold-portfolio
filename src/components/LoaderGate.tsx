import { ReactNode, useEffect, useState } from "react";
import Loader from "./Loader";

type Phase = "loading" | "expanding" | "done";

type LoaderGateProps = {
    /** How long the loader runs before it starts expanding. */
    duration?: number;
    /** How long the expand-and-reveal takes. Must match the exit animations. */
    expandDuration?: number;
    children: ReactNode;
};

/**
 * Holds the loader on screen for `duration`, then lets it expand off the
 * viewport while the page fades in underneath.
 */
export default function LoaderGate({
    duration = 3000,
    expandDuration = 1000,
    children,
}: LoaderGateProps) {
    const [phase, setPhase] = useState<Phase>("loading");

    useEffect(() => {
        const startExpanding = setTimeout(() => setPhase("expanding"), duration);
        const finish = setTimeout(() => setPhase("done"), duration + expandDuration);

        return () => {
            clearTimeout(startExpanding);
            clearTimeout(finish);
        };
    }, [duration, expandDuration]);

    return (
        <>
            {/* mounted a beat early so the page is painted behind the expanding loader */}
            {phase !== "loading" && children}
            {phase !== "done" && <Loader expanding={phase === "expanding"} />}
        </>
    );
}
