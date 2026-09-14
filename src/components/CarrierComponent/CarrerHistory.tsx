import { AnimationLottie } from "../../assets/Animations/AnimationLottie";
import { MotionUp } from "../../assets/Animations/Motionup";
import expLottie from "../../assets/lotte-animation/experience.json";
import { formatDate } from "../../lib/utils";
import Marquee from "react-fast-marquee";
import { MagicCard } from "../../assets/Animations/MagicCard";
import { useEffect, useRef, useState } from "react";
import { getSkillsData, getCarrierDetails } from "../../api/routes/CarrierHistoryRoute";
import { getLocalImage } from "../../lib/getLocalAsset";
import { MovingBorder } from "./MovingBorder";
import { JobExperience } from "../../types/carrierType";
import placeholderImage from "../../assets/images/broken-image-placeholder.jpg"
import { CLEAR_ENTRANCE, MOTION_OK, gsap, useGSAP, useHeadingReveal } from "../../lib/gsap";

const DOT_LIT = {
    backgroundColor: "#cbaef9",
    borderColor: "#cbaef9",
    boxShadow: "0 0 0 4px rgba(203, 174, 249, 0.18), 0 0 16px rgba(203, 174, 249, 0.6)",
};
const DOT_UNLIT = {
    backgroundColor: "rgb(0, 3, 25)",
    borderColor: "#334155",
    boxShadow: "0 0 0 0px rgba(203, 174, 249, 0), 0 0 0px rgba(203, 174, 249, 0)",
};

export default function CarrerHistory() {

    const defaultJobExperience: JobExperience = {
        id: 0,
        jobdescription: "",
        position: "",
        companylogo: "",
        companyname: "",
        companyurl: "",
        createddate: "",
        enddate: "",
        startdate: ""
    };

    const [userSkillsData, setUserSkillsData] = useState([])
    const [userCarrierData, setUserCarrierData] = useState<JobExperience[]>([defaultJobExperience])

    const headingRef = useRef<HTMLHeadingElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    useHeadingReveal(headingRef);

    // Timeline: the line draws down with scroll and lights each dot it reaches;
    // cards slide in (rise in on smaller screens) and their logos pop in after them.
    // The final look is plain CSS, so reduced motion simply skips all of this.
    useGSAP(() => {
        const timeline = timelineRef.current;
        if (!timeline) return; // still showing the loading skeleton

        gsap.matchMedia().add({ isDesktop: "(min-width: 1024px)", motionOk: MOTION_OK }, (context) => {
            const { isDesktop, motionOk } = context.conditions as { isDesktop: boolean; motionOk: boolean };
            if (!motionOk) return;

            const dots = gsap.utils.toArray<HTMLElement>(timeline.querySelectorAll(".gsap-timeline-dot"));
            const fills = gsap.utils.toArray<HTMLElement>(timeline.querySelectorAll(".gsap-timeline-fill"));

            // copy: gsap.set writes tween settings into the vars object it is given
            gsap.set(dots, { ...DOT_UNLIT });
            gsap.set(fills, { scaleY: 0 });

            const line = gsap.timeline({
                scrollTrigger: { trigger: timeline, start: "top 70%", end: "bottom 60%", scrub: 0.5 },
            });
            dots.forEach((dot, index) => {
                line.to(dot, { ...DOT_LIT, duration: 0.15, ease: "none" });
                if (fills[index]) line.to(fills[index], { scaleY: 1, duration: 1, ease: "none" });
            });

            timeline.querySelectorAll<HTMLElement>(".gsap-career-card").forEach((card) => {
                const reveal = gsap.timeline({
                    // the row never moves, so the card's starting offset can't skew the trigger position
                    scrollTrigger: { trigger: card.parentElement, start: "top 85%", once: true },
                });
                reveal
                    .from(card, {
                        x: isDesktop ? 60 : 0,
                        y: isDesktop ? 0 : 40,
                        opacity: 0,
                        duration: 0.7,
                        ease: "power3.out",
                        clearProps: CLEAR_ENTRANCE,
                    })
                    .from(card.querySelector(".gsap-career-logo"), {
                        scale: 0.4,
                        rotate: -20,
                        opacity: 0,
                        duration: 0.6,
                        ease: "back.out(2)",
                        clearProps: CLEAR_ENTRANCE,
                    }, 0.15);
            });
        });
    }, { dependencies: [userCarrierData], revertOnUpdate: true });

    useEffect(() => {
        getUSerSkills()
        getCarrierData()
    }, [])

    const getUSerSkills = async () => {

        const userSkillsResponse: any = await getSkillsData()

        const updatedSkillsArray: any = userSkillsResponse.data.map((eachFile: any) => {
            const skillImage = getLocalImage(eachFile.firebase_file_name);
            return { ...eachFile, image: skillImage };
        });

        setUserSkillsData(updatedSkillsArray)
    }

    const getCarrierData = async () => {
        const userCarrierList: any = await getCarrierDetails()

        const updatedCarrierList: JobExperience[] = userCarrierList.data.map((eachList: JobExperience) => {
            const companyLogo = getLocalImage(eachList.companylogo);
            return { ...eachList, companylogo: companyLogo || eachList.companylogo }
        });

        setUserCarrierData(updatedCarrierList)
    }

    return (
        // overflow-x-clip: cards sliding in from the right never add a horizontal scrollbar (and, unlike hidden, keeps sticky working)
        <div className="w-full py-10 overflow-x-clip" id="about">
            <div className="max-w-6xl w-full mx-auto px-4">
                <h2 ref={headingRef} className="text-center font-bold text-3xl text-blue-100 relative z-20">
                    Career History
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mt-12">
                    <div className="flex justify-center items-start">
                        {/* stays in view beside the job list on large screens */}
                        <div className="w-full lg:sticky lg:top-24">
                            <AnimationLottie animationData={expLottie} />
                        </div>
                    </div>

                    {userCarrierData[0].position !== "" ? (
                        <div ref={timelineRef} className="flex flex-col gap-6">
                            {userCarrierData.map((experience: JobExperience, index: number) => (
                                <div key={index} className="flex gap-3 sm:gap-4">
                                    {/* rail: dot level with the logo's centre, line down to the next dot */}
                                    <div className="relative w-3.5 shrink-0" aria-hidden="true">
                                        {index < userCarrierData.length - 1 && (
                                            <span className="absolute left-1.5 top-[58px] lg:top-[66px] h-[calc(100%+1.5rem)] w-0.5 rounded-full bg-slate-800">
                                                <span className="gsap-timeline-fill block h-full w-full origin-top rounded-full bg-gradient-to-b from-[#E2CBFF] to-[#393BB2] shadow-[0_0_10px_rgba(203,174,249,0.5)]" />
                                            </span>
                                        )}
                                        <span className="gsap-timeline-dot absolute left-0 top-[51px] lg:top-[59px] h-3.5 w-3.5 rounded-full border-2 border-custom-purple-icon bg-custom-purple-icon shadow-[0_0_0_4px_rgba(203,174,249,0.18),0_0_16px_rgba(203,174,249,0.6)]" />
                                    </div>

                                    <div className="gsap-career-card min-w-0 flex-1">
                                        <MovingBorder
                                            borderRadius="1rem"
                                            style={{
                                                borderRadius: `calc(1rem* 0.96)`,
                                            }}
                                            className="border flex-1 rounded-3xl text-blue-100 border-slate-800"
                                        >
                                            <div className="flex w-full p-4 py-6  gap-2">
                                                <img
                                                    src={experience.companylogo}
                                                    alt={placeholderImage}
                                                    width={300}
                                                    height={300}
                                                    className="gsap-career-logo lg:w-20 lg:h-20 h-16 w-16 rounded-full object-cover"
                                                />
                                                <div className="ms-2 sm:ms-5">
                                                    <h3 className="text-start text-blue-100 text-lg md:text-2xl font-bold">
                                                        {experience.position}
                                                    </h3>
                                                    <h6 className="text-start text-slate-300 mt-1 font-semibold">
                                                        <a
                                                            target="_blank"
                                                            href={experience.companyurl}
                                                            className="hover:underline"
                                                        >
                                                            {experience.companyname}
                                                        </a>{" "}
                                                        <span className="inline-flex relative bottom-[0.5px] h-2 w-2 rounded-full bg-slate-300 mx-1 "></span>{" "}
                                                        <span className="text-slate-300">
                                                            {formatDate(experience.startdate)} - {" "}
                                                            {experience.enddate
                                                                ? formatDate(experience.enddate)
                                                                : "Present"}
                                                        </span>
                                                    </h6>
                                                    <p className="text-start text-slate-400 text-sm mt-2 font-normal">
                                                        {experience.jobdescription}
                                                    </p>
                                                </div>
                                            </div>
                                        </MovingBorder>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            <MovingBorder
                                borderRadius="1rem"
                                style={{
                                    borderRadius: `calc(1rem* 0.96)`,
                                }}
                                className="border flex-1 rounded-3xl text-blue-100 border-slate-800"
                            >
                                <div className="flex w-full p-4 py-6 gap-2">
                                    <div className="pt-3 h-[5rem] w-[5rem] rounded-full mr-2">
                                        <div className="h-[5rem] w-[5rem] rounded-full bg-neutral-600 shadow bg-gradient-to-r from-neutral-600 via-neutral-400 to-neutral-600 bg-[length:200%_100%] animate-shimmer"></div>
                                    </div>
                                    <div className="relative w-full space-y-3 overflow-hidden rounded-md p-3 shadow before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r">
                                        <div className="space-y-3">
                                            <div className="space-y-1">
                                                <div className="h-6 w-full rounded-full bg-neutral-600 shadow bg-gradient-to-r from-neutral-600 via-neutral-400 to-neutral-600 bg-[length:200%_100%] animate-shimmer"></div>
                                                <div className="flex gap-2 !my-3">
                                                    <div className="h-5 w-[6rem] rounded-full bg-neutral-600 shadow bg-gradient-to-r from-neutral-600 via-neutral-400 to-neutral-600 bg-[length:200%_100%] animate-shimmer"></div>
                                                    <div className="h-5 w-[6rem] rounded-full bg-neutral-600 shadow bg-gradient-to-r from-neutral-600 via-neutral-400 to-neutral-600 bg-[length:200%_100%] animate-shimmer"></div>
                                                </div>
                                                <div className="h-4 w-full rounded-full bg-neutral-600 shadow bg-gradient-to-r from-neutral-600 via-neutral-400 to-neutral-600 bg-[length:200%_100%] animate-shimmer"></div>
                                                <div className="h-4 w-full rounded-full bg-neutral-600 shadow bg-gradient-to-r from-neutral-600 via-neutral-400 to-neutral-600 bg-[length:200%_100%] animate-shimmer"></div>
                                                <div className="h-4 w-full rounded-full bg-neutral-600 shadow bg-gradient-to-r from-neutral-600 via-neutral-400 to-neutral-600 bg-[length:200%_100%] animate-shimmer"></div>
                                                <div className="h-4 w-full rounded-full bg-neutral-600 shadow bg-gradient-to-r from-neutral-600 via-neutral-400 to-neutral-600 bg-[length:200%_100%] animate-shimmer"></div>
                                                <div className="h-4 w-7/12 rounded-full bg-neutral-600 shadow bg-gradient-to-r from-neutral-600 via-neutral-400 to-neutral-600 bg-[length:200%_100%] animate-shimmer"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </MovingBorder>
                        </div>
                    )
                    }
                </div>

                <MotionUp className="p-0 pt-10 rounded-lg" delay={0.3}>
                    <h2 className="text-center font-bold text-3xl text-blue-100 relative z-20">
                        Expertise
                    </h2>

                    <Marquee
                        speed={90}
                        pauseOnHover
                        className="mt-5 overflow-hidden py-5"
                    >
                        {userSkillsData.map((eachSkill: any, index: any) => (
                            <MagicCard
                                className="hover:scale-105 transition-all duration-500 w-40 h-40 ms-10 flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl"
                                gradientColor="#262626"
                                key={index}
                            >
                                <div className="flex flex-col items-center w-full gap-2">
                                    <img
                                        src={eachSkill.image}
                                        alt={placeholderImage}
                                        width={80}
                                        height={80}
                                        className="h-16 w-16 rounded-full object-cover border border-white bg-white"
                                    />
                                    <h6 className="text-start text-lg font-bold text-blue-100">
                                        {eachSkill.official_website ? (
                                            <a
                                                target="_blank"
                                                href={eachSkill.official_website}
                                                className="hover:underline"
                                            >
                                                {eachSkill.skill_name}
                                            </a>
                                        ) : (
                                            eachSkill.skill_name
                                        )}
                                    </h6>
                                </div>
                            </MagicCard>
                        ))}
                    </Marquee>
                </MotionUp>
            </div>

        </div>
    )
};
