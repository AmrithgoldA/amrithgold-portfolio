import { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText, useGSAP };

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/** Inline styles set by entrance tweens are cleared when they finish, so hover effects work as before. */
export const CLEAR_ENTRANCE = "transform,opacity";

// Sections fill in from the API after mount, which moves everything below them.
// Re-measure trigger positions whenever the page height settles on a new value.
if (typeof window !== "undefined" && "ResizeObserver" in window) {
    let lastHeight = 0;
    let refreshTimer: number | undefined;

    new ResizeObserver(() => {
        const height = document.documentElement.scrollHeight;
        if (Math.abs(height - lastHeight) < 2) return;
        lastHeight = height;
        window.clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    }).observe(document.body);
}

/**
 * Reveals a section heading letter by letter as it scrolls into view.
 * Does nothing when the visitor prefers reduced motion.
 */
export function useHeadingReveal(ref: RefObject<HTMLElement>) {
    useGSAP(() => {
        const heading = ref.current;
        if (!heading) return;

        gsap.matchMedia().add(MOTION_OK, () => {
            SplitText.create(heading, {
                type: "words,chars",
                mask: "chars",
                autoSplit: true,
                // Returning the tween lets SplitText keep its progress if it re-splits (fonts, resize)
                onSplit: (split) =>
                    gsap.from(split.chars, {
                        yPercent: 100,
                        opacity: 0,
                        filter: "blur(6px)",
                        duration: 0.6,
                        ease: "power3.out",
                        stagger: 0.03,
                        scrollTrigger: { trigger: heading, start: "top 80%", once: true },
                    }),
            });
        });
    }, { scope: ref });
}
