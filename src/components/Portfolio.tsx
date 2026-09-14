import { Suspense, lazy, useEffect, useState } from "react";
import { whenIdle } from "../lib/whenIdle";

// Starts downloading as soon as this module loads, so the hero is ready when the loader lifts.
const landingPageModule = import("./LandingPageComponent/LandingPage");
const LandingPage = lazy(() => landingPageModule);

// Below the fold: fetched once the hero is up, so their libraries (Framer Motion,
// Swiper, toasts) don't compete with the first screen.
const CarrerHistory = lazy(() => import("./CarrierComponent/CarrerHistory"));
const Projects = lazy(() => import("./ProjectComponent/Projects"));
const Contact = lazy(() => import("./ContactComponent/Contact"));

export default function Portfolio() {

    const [showSections, setShowSections] = useState(false);

    useEffect(() => whenIdle(() => setShowSections(true)), []);

    return (
        <>
            <LandingPage />
            {/* own boundary: while these load, the hero above stays on screen */}
            {showSections && (
                <Suspense fallback={null}>
                    <CarrerHistory />
                    <Projects />
                    <Contact />
                </Suspense>
            )}
        </>
    )
};
