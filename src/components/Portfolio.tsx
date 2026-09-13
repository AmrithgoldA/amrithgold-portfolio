import { lazy } from "react";

// Start every section download as soon as this module loads, so they finish
// while the intro loader is still on screen.
const landingPageModule = import("./LandingPageComponent/LandingPage");
const carrerHistoryModule = import("./CarrierComponent/CarrerHistory");
const projectsModule = import("./ProjectComponent/Projects");
const contactModule = import("./ContactComponent/Contact");

const LandingPage = lazy(() => landingPageModule);
const CarrerHistory = lazy(() => carrerHistoryModule);
const Projects = lazy(() => projectsModule);
const Contact = lazy(() => contactModule);

export default function Portfolio() {

    return (
        <>
            <LandingPage />
            <CarrerHistory />
            <Projects />
            <Contact />
        </>
    )
};
