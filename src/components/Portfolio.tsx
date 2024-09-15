import { lazy, useEffect, useState } from "react";
const LandingPage = lazy(() => import("./LandingPageComponent/LandingPage"));
const CarrerHistory = lazy(() => import("./CarrierComponent/CarrerHistory"));
const Projects = lazy(() => import("./ProjectComponent/Projects"));
const Contact = lazy(() => import("./ContactComponent/Contact"));
import Loader from "./Loader/Loader";

export default function Portfolio() {

    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000);
    }, [])

    return (
        <>
            {isLoading ?
                <Loader /> :
                <>
                    <LandingPage />
                    <CarrerHistory />
                    <Projects />
                    <Contact />

                </>
            }
        </>
    )
};
