import { useEffect, useState } from "react";
import CarrerHistory from "./CarrierComponent/CarrerHistory";
import Contact from "./ContactComponent/Contact";
import LandingPage from "./LandingPageComponent/LandingPage";
import Projects from "./ProjectComponent/Projects";
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
