'use client'

import { MotionUp } from "../assets/Animations/Motionup"
import { TextAppearAnimation } from "../assets/Animations/TextAppearAnimation";
import { TextHighlight } from "../assets/Animations/TextHighlight";
import setupImage from '../assets/images/SetupImage.png';
import profileImage from '../assets/images/profileImage.png'
import { FaLocationArrow, FaDownload } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { getMediaData } from "../api/route/FireBaseRoute";
import { scroller } from "react-scroll";

export default function LandingPage() {

    const [mediaFile, setMediafile] = useState("");

    useEffect(() => {

        getProfilePic()

    }, []);

    const getProfilePic = async() => {
        const profilePicResponse: any = await getMediaData('Amrith Gold resume.pdf')
        setMediafile(profilePicResponse)
    }

    const handleResumeDownload = () => {
        if (mediaFile) {
            window.open(mediaFile, '_blank');
        }
    }

    const scrollToDiv = () => {
        scroller.scrollTo("contact", {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
        });
    };


    return (
        <>
            <div className="pt-20">
                <div className="max-w-6xl w-full mx-auto px-4 flex justify-center relative z-10">
                    <div className="flex flex-col items-center justify-center w-full">
                        <MotionUp delay={0}>
                            <h1 className="text-3xl md:text-6xl text-blue-100 !leading-snug text-center mx-auto font-[900]">
                                Hi, I'm Amrith Gold, a Self Taught
                                <br />
                                <TextHighlight delay={1.8}>
                                    Software Developer
                                </TextHighlight>
                            </h1>
                        </MotionUp>

                        <MotionUp delay={0.3} className="my-4 flex justify-center">
                            <h6 className="text-center !leading-7 md:!leading-10 font-semibold text-2 lg:text-3xl max-w-xl  text-blue-100 ">
                                Based in Tamil Nadu, India,
                                <br />
                                Specialized in <TextHighlight delay={1.8}>React</TextHighlight> and{" "}
                                <TextHighlight delay={1.8}>Node.js</TextHighlight>
                            </h6>
                        </MotionUp>

                        <MotionUp delay={0.6} className="flex items-center gap-3 mt-5">
                            <button
                                className='cursor-pointer relative inline-flex h-12 md:w-60 overflow-hidden rounded-lg p-[1px] focus:outline-none text-lg'
                                onClick={() => scrollToDiv()}
                            >
                                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                                <span className='inline-flex h-full w-full items-center justify-center rounded-lg bg-slate-950 px-3 font-medium text-white backdrop-blur-3xl gap-2'>
                                    Say Hi
                                    <FaLocationArrow />
                                </span>
                            </button>
                            <button
                                className='relative inline-flex h-12 md:w-60 overflow-hidden rounded-lg p-[1px] focus:outline-none text-lg'
                                onClick={() => handleResumeDownload()}
                            >
                                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                                <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-3 font-medium text-white backdrop-blur-3xl gap-2'>
                                    Resume
                                    <FaDownload />
                                </span>
                            </button>
                        </MotionUp>
                    </div>
                </div>
                <div className="max-w-6xl w-full mx-auto px-4 mt-12 lg:mt-16 z-20 relative">
                    <MotionUp delay={0.9}>
                        <div className="p-0 py-10 md:p-14 rounded-lg"
                            style={{
                                background: `linear-gradient(90deg, rgba(4,7,29,0.85) 0%, rgba(12,14,35,0.80) 100%), url(${setupImage})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                        >
                            <div className="flex gap-8 flex-wrap lg:flex-nowrap lg:gap-16 overflow-hidden">
                                <div className="order-2 lg:order-1 w-full  lg:w-[70%]">
                                    <h2 className="font-bold text-3xl z-20 uppercase mb-5 text-purple-300">
                                        My Journey
                                    </h2>
                                    <p className="text-blue-100 text-normal sm:text-lg sm:text-justify">
                                        Starting in June 2021 during the lockdown, I embarked on my journey to become
                                        a software developer alone, without any teacher or mentor. At that time, I had
                                        no prior knowledge of programming. I seized the opportunity to learn something
                                        new during the lockdown, and it turned out to be an incredible journey. I have
                                        learned extensively from online resources, without taking any formal courses.
                                        Now, I specialize in React and Node.js and am capable of creating software independently.
                                    </p>
                                    <TextAppearAnimation
                                        className="text-white italic font-semibold text-xl mt-5 uppercase animate-pulse"
                                        text="Strongly believe in Karma"
                                    />
                                </div>
                                <div className="flex justify-center order-1 lg:order-2 w-full lg:w-[30%]">
                                    <img
                                        src={profileImage}
                                        width={300}
                                        height={800}
                                        alt="profile-name"
                                        className="rounded-lg aspect-square overflow-hidden"
                                    />
                                </div>
                            </div>
                        </div>
                    </MotionUp>
                </div>
            </div>
        </>
    )
};
