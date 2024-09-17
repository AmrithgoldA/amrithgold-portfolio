import { lazy } from "react";
const LandingPage = lazy(() => import("./LandingPageComponent/LandingPage"));
const CarrerHistory = lazy(() => import("./CarrierComponent/CarrerHistory"));
const Projects = lazy(() => import("./ProjectComponent/Projects"));
const Contact = lazy(() => import("./ContactComponent/Contact"));

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
