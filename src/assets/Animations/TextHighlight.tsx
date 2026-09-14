/**
 * Red gradient highlight behind inline text, shown in full by default.
 * The hero intro sweeps it in with GSAP by targeting the `gsap-highlight` class.
 */
export function TextHighlight({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <span
            style={{
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left center",
                backgroundSize: "100% 100%",
                display: "inline",
            }}
            className={`gsap-highlight relative inline-block py-1 px-2 rounded-md bg-gradient-to-r from-red-700 via-red-700 to-orange-600 ${className}`}
        >
            {children}
        </span>
    );
}
