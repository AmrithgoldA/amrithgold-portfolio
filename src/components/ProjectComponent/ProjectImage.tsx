import { useEffect, useState } from "react";
import { MdOutlineBrokenImage } from "react-icons/md";
import { cn } from "../../lib/utils";

type ImageStatus = "loading" | "loaded" | "error";

/**
 * Animated shimmer shown while an image loads, or in place of a broken image.
 */
export function ImagePlaceholder({ broken = false, className }: { broken?: boolean; className?: string }) {
    return (
        <div
            className={cn(
                "absolute inset-0 flex flex-col items-center justify-center gap-2 animate-shimmer bg-[length:200%_100%] bg-[linear-gradient(110deg,#0f172a_8%,#1e293b_18%,#0f172a_33%)]",
                className
            )}
        >
            {broken && (
                <>
                    <MdOutlineBrokenImage className="text-4xl text-slate-500 animate-pulse" />
                    <span className="text-xs text-slate-500">Preview unavailable</span>
                </>
            )}
        </div>
    );
}

type ProjectImageProps = {
    src?: string;
    alt: string;
    className?: string;
    imgClassName?: string;
};

/**
 * Image that shows an animated placeholder while loading and if the image fails to load.
 * Size it through `className` (the wrapper needs a height or aspect ratio).
 */
export function ProjectImage({ src, alt, className, imgClassName }: ProjectImageProps) {
    const [status, setStatus] = useState<ImageStatus>(src ? "loading" : "error");

    // Reset when the source changes (e.g. the modal opens a different project)
    useEffect(() => {
        setStatus(src ? "loading" : "error");
    }, [src]);

    return (
        <div className={cn("relative overflow-hidden rounded-lg bg-slate-900", className)}>
            {status !== "loaded" && <ImagePlaceholder broken={status === "error"} />}
            {src && status !== "error" && (
                <img
                    src={src}
                    alt={alt}
                    onLoad={() => setStatus("loaded")}
                    onError={() => setStatus("error")}
                    className={cn(
                        "h-full w-full object-cover transition-opacity duration-500",
                        status === "loaded" ? "opacity-100" : "opacity-0",
                        imgClassName
                    )}
                />
            )}
        </div>
    );
}
