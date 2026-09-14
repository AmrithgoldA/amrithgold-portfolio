"use client";

import { useEffect, useRef, useState } from "react";

type LottiePlayer = {
    Lottie: typeof import("lottie-react").default;
    animationData: unknown;
};

/**
 * Plays a square Lottie animation. The player (~300 kB) and the animation JSON are only
 * fetched once the box nears the viewport; until then it keeps its size so nothing shifts.
 * Pass `loadAnimation` as a stable (module-level) function.
 */
export function AnimationLottie({
    loadAnimation,
    width,
}: {
    loadAnimation: () => Promise<{ default: unknown }>;
    width?: string;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [player, setPlayer] = useState<LottiePlayer | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let cancelled = false;
        const observer = new IntersectionObserver((entries) => {
            if (!entries.some((entry) => entry.isIntersecting)) return;
            observer.disconnect();

            Promise.all([import("lottie-react"), loadAnimation()]).then(([lottie, animation]) => {
                if (!cancelled) setPlayer({ Lottie: lottie.default, animationData: animation.default });
            });
        }, { rootMargin: "300px" });

        observer.observe(container);
        return () => {
            cancelled = true;
            observer.disconnect();
        };
    }, [loadAnimation]);

    return (
        <div ref={containerRef} className="aspect-square" style={{ width: width ?? "100%" }}>
            {player && (
                <player.Lottie
                    animationData={player.animationData}
                    loop
                    autoplay
                    style={{ width: "100%", height: "100%" }}
                />
            )}
        </div>
    );
}
