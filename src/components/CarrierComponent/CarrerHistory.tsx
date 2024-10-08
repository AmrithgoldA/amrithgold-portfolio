import { AnimationLottie } from "../../assets/Animations/AnimationLottie";
import { MotionUp } from "../../assets/Animations/Motionup";
import expLottie from "../../assets/lotte-animation/experience.json";
import { formatDate } from "../../lib/utils";
import Marquee from "react-fast-marquee";
import { MagicCard } from "../../assets/Animations/MagicCard";
import { useEffect, useState } from "react";
import { getSkillsData, getCarrierDetails } from "../../api/routes/CarrierHistoryRoute";
import { getMediaData } from "../../api/routes/FireBaseRoute";
import { MovingBorder } from "./MovingBorder";
import { JobExperience } from "../../types/carrierType";
import placeholderImage from "../../assets/images/broken-image-placeholder.jpg"

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

    useEffect(() => {
        getUSerSkills()
        getCarrierData()
    }, [])

    const getUSerSkills = async () => {

        const userSkillsResponse: any = await getSkillsData()

        const updatedSkillsArray: any = await Promise.all(
            userSkillsResponse.data.map(async (eachFile: any) => {
                const skillImageResponse: any = await getMediaData(eachFile.firebase_file_name);
                return { ...eachFile, image: skillImageResponse };
            })
        );

        setUserSkillsData(updatedSkillsArray)
    }

    const getCarrierData = async () => {
        const userCarrierList: any = await getCarrierDetails()

        const updatedCarrierList: JobExperience[] = await Promise.all(
            userCarrierList.data.map(async (eachList: JobExperience) => {
                const companyLogoResponse: string | undefined = await getMediaData(eachList.companylogo);
                return { ...eachList, companylogo: companyLogoResponse }
            })
        )

        setUserCarrierData(updatedCarrierList)
    }

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

                        {userCarrierData[0].position !== "" ? (
                            <div className="flex flex-col gap-6">
                                {userCarrierData.map((experience: JobExperience, index: number) => (
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
                                                src={experience.companylogo}
                                                alt={placeholderImage}
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
                </MotionUp>

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
