import { AnimationLottie } from "../assets/Animations/AnimationLottie";
import { MotionUp } from "../assets/Animations/Motionup";
import expLottie from "../assets/lotte-animation/experience.json";
import { formatDate } from "../lib/utils";
import companyLogo from '../assets/images/avasoftLogo.png'
import Marquee from "react-fast-marquee";
import { MagicCard } from "../assets/Animations/MagicCard";
import { useEffect, useState } from "react";
import { getSkillsData } from "../api/routes/CarrierHistoryRoute";
import { getMediaData } from "../api/routes/FireBaseRoute";
import { MovingBorder } from "./Border/MovingBorder";

export default function CarrerHistory() {

    const [userSkillsData, setUserSkillsData] = useState([])

    useEffect(() => {
        getUSerSkills()
    },[])

    const getUSerSkills = async() => {

        const userSkillsResponse:any = await getSkillsData()

        const updatedSkillsArray: any = await Promise.all(
            userSkillsResponse.data.map(async (eachFile: any) => {
                const skillImageResponse: any = await getMediaData(eachFile.firebase_file_name);
                return { ...eachFile, image: skillImageResponse };
            })
        );

        setUserSkillsData(updatedSkillsArray)
    }

    const Experience: any = [
        {
            companyLogo: companyLogo,
            companyName: "Avasoft",
            companyUrl: "https://www.avasoft.com/",
            position: "Software Engineer",
            startDate: "01/07/2023",
            endDate: "05/04/2024",
            jobDescription: "Transforming high-quality Figma designs into responsive web pages using React and it's ecosystem. Integrated with backend APIs and services to fetch and manage data effectively. Stayed updated with industry trends and best practices to drive innovation and product excellence",
        },
        {
            companyLogo: companyLogo,
            companyName: "Avasoft",
            companyUrl: "https://www.avasoft.com/",
            position: "Software Engineer Intern",
            startDate: "08/14/2022",
            endDate: "01/07/2023",
            jobDescription: "Designed and developed 2 web applications from scratch using React and its ecosystem. Coordinated directly with the founding team to plan the roadmap and prioritize feature development. Participated in sprint planning and agile ceremonies to deliver features in iterative cycles"
        }
    ]

    return (
        <div className="w-full py-10" id="about">
            <div className="max-w-6xl w-full mx-auto px-4">
                <MotionUp delay={0.1}>
                    <h2 className="text-center font-bold text-3xl text-blue-100 relative z-20">
                        Career History
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mt-12">
                        <div className="flex justify-center items-start">
                            <div className="w-full h-full">
                                <AnimationLottie animationData={expLottie} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            {Experience.map((experience: any, index: number) => (
                                <MovingBorder
                                    key={index}
                                    borderRadius="1rem"
                                    style={{
                                        borderRadius: `calc(1rem* 0.96)`,
                                    }}
                                    className="border flex-1 rounded-3xl text-blue-100 border-slate-800"
                                >
                                    <div className="flex w-full p-4 py-6  gap-2">
                                        <img
                                            src={experience.companyLogo}
                                            alt={experience.companyName}
                                            width={300}
                                            height={300}
                                            className="lg:w-20 lg:h-20 h-16 w-16 rounded-full object-cover"
                                        />
                                        <div className="ms-2 sm:ms-5">
                                            <h3 className="text-start text-blue-100 text-lg md:text-2xl font-bold">
                                                {experience.position}
                                            </h3>
                                            <h6 className="text-start text-slate-300 mt-1 font-semibold">
                                                <a
                                                    target="_blank"
                                                    href={experience.companyUrl}
                                                    className="hover:underline"
                                                >
                                                    {experience.companyName}
                                                </a>{" "}
                                                <span className="inline-flex relative bottom-[0.5px] h-2 w-2 rounded-full bg-slate-300 mx-1 "></span>{" "}
                                                <span className="text-slate-300">
                                                    {formatDate(experience.startDate)} - {" "}
                                                    {experience.endDate
                                                        ? formatDate(experience.endDate)
                                                        : "Present"}
                                                </span>
                                            </h6>
                                            <p className="text-start text-slate-400 text-sm mt-2 font-normal">
                                                {experience.jobDescription}
                                            </p>
                                        </div>
                                    </div>
                                </MovingBorder>
                            ))}
                        </div>
                    </div>
                </MotionUp>

                <MotionUp className="mt-10 p-0 py-10 rounded-lg" delay={0.3}>
                    <h2 className="text-center font-bold text-3xl text-blue-100 relative z-20">
                        Expertise
                    </h2>

                    <Marquee
                        speed={90}
                        pauseOnHover
                        className="mt-5 overflow-hidden py-5"
                    >
                        {userSkillsData.map((eachSkill: any, index:any ) => (
                            <MagicCard
                                className="hover:scale-105 transition-all duration-500 w-40 h-40 ms-10 flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl"
                                gradientColor="#262626"
                                key={index}
                            >
                                <div className="flex flex-col items-center w-full gap-2">
                                    <img
                                        src={eachSkill.image}
                                        alt={eachSkill.name}
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
