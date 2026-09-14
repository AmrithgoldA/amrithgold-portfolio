type LoaderProps = {
    fullScreen?: boolean;
    label?: string;
    /** Plays the expand-and-reveal exit animation. */
    expanding?: boolean;
};

const RIPPLE_DELAYS = ["0s", "-1.5s", "-3s"];

export default function Loader({
    fullScreen = true,
    label = "Loading",
    expanding = false,
}: LoaderProps) {
    return (
        <div
            role="status"
            aria-live="polite"
            aria-label={label}
            className={`flex w-full items-center justify-center overflow-hidden ${fullScreen ? "fixed inset-0 z-[120]" : "relative py-20"
                } ${expanding ? "pointer-events-none" : ""}`}
        >
            {/* backdrop dissolves so the page shows through */}
            {fullScreen && (
                <span
                    className={`absolute inset-0 bg-[rgb(0,3,25)] transition-opacity [transition-duration:900ms] ease-out ${expanding ? "opacity-0" : "opacity-100"
                        }`}
                />
            )}

            <div className="relative flex h-56 w-56 items-center justify-center [perspective:600px] [transform-style:preserve-3d]">
                {/* blurred halo - fades out fast so it never veils the page */}
                <span
                    className={`absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-custom-purple-icon blur-3xl transition-opacity duration-500 ease-out ${expanding ? "opacity-0" : "animate-haloPulse"
                        }`}
                />
                <span
                    className={`absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#393BB2] blur-2xl transition-opacity duration-500 ease-out ${expanding ? "opacity-0" : "opacity-60"
                        }`}
                />

                {/* 3d ripple rings - they flatten out and expand past the viewport on exit */}
                {RIPPLE_DELAYS.map((delay, index) => (
                    <span
                        key={delay}
                        style={{ animationDelay: expanding ? `${index * 0.18}s` : delay }}
                        className={`absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-custom-purple-icon ${expanding
                            ? "animate-rippleBurst"
                            : "animate-ripple3d shadow-[0_0_20px_2px_rgba(203,174,249,0.45)]"
                            }`}
                    />
                ))}

                {/* spinning core */}
                <div
                    className={`relative h-20 w-20 overflow-hidden rounded-full p-[2px] transition-all duration-500 ease-in ${expanding ? "scale-0 opacity-0" : "scale-100 opacity-100"
                        }`}
                >
                    <span className="absolute inset-[-1000%] animate-[spin_3.5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="relative inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950" />
                </div>
            </div>
        </div>
    );
}
