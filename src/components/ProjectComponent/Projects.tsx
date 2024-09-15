import { useEffect, useState } from "react";
import { MotionUp } from "../../assets/Animations/Motionup";
import { getProjectsDetails } from "../../api/routes/ProjectRoute";
import { Project } from "../../types/Project";
import { ProjectCard } from "./ProjectCard";
import { getMediaData } from "../../api/routes/FireBaseRoute";
import { Modal, ModalBody, ModalContent } from "./Modal";
import { FaEye, FaGithub } from "react-icons/fa";
import { useModal } from "../../context/ModalProvider";

export default function Projects() {

    const { modalData } = useModal();

    const projectDetailObj: Project = {
        title: "",
        description: "",
        images: [],
        techStack: [],
        priority: 0
    }

    const [projectDetail, setProjectDetail] = useState<Project[]>([projectDetailObj])
    const [initialCount, setInitialCount] = useState<number>(3)

    useEffect(() => {
        projectDetails();
    }, [])

    function handleShowMore() {
        setInitialCount(initialCount + 3)
    }

    const projectDetails = async () => {
        const response: any = await getProjectsDetails();

        const updatedProjectDetails: any = await Promise.all(
            response.data.map(async (eachFile: any) => {
                const updatedImages: any = await Promise.all(
                    eachFile.images.map(async (image: string) => {
                        const skillImageResponse: any = await getMediaData(image);
                        return skillImageResponse;
                    })
                );

                return { ...eachFile, images: updatedImages };
            })
        );

        setProjectDetail(updatedProjectDetails);
    };

    return (
        <div className="py-10" id="projects">
            <div className="max-w-6xl w-full mx-auto px-4 ">
                <MotionUp delay={0.1}>
                    <h2 className="text-center font-bold text-3xl text-blue-100 relative z-20">
                        Explore My Latest Projects
                    </h2>
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {projectDetail.slice(0, initialCount).map((eachProject: Project, index: any) => (
                            <ProjectCard key={index} data={eachProject} />
                        ))}
                    </div>
                    {(projectDetail.length > 3 && projectDetail.length !== initialCount) &&  (
                        <button
                            className='mx-auto !block mt-12 cursor-pointer relative h-12 md:w-60 overflow-hidden rounded-lg p-[1px] focus:outline-none text-lg'
                            onClick={() => handleShowMore()}
                        >
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                            <span className='inline-flex h-full w-full items-center justify-center rounded-lg bg-slate-950 px-3 font-medium text-white backdrop-blur-3xl gap-2'>
                                Load More
                            </span>
                        </button>
                    )}
                </MotionUp>
            </div>

            <Modal>
                <ModalBody className="!max-w-[700px]">
                    <ModalContent className="mt-5">
                        <div className="mb-5 flex items-center flex-wrap gap-x-5 gap-y-2">
                            <h5 className="text-xl font-semibold text-blue-100">
                                {modalData?.title}
                            </h5>
                            <div className="flex gap-4 items-center">
                                {modalData?.liveUrl && (
                                    <a
                                        href={modalData?.liveUrl}
                                        target="_blank"
                                        className="flex justify-center items-center text-custom-purple-icon"
                                    >
                                        <FaEye className="me-1" />
                                        <span className="text-[15px]">Check Live Site</span>
                                    </a>
                                )}
                                {modalData?.gitUrl && (
                                    <a
                                        href={modalData?.gitUrl}
                                        target="_blank"
                                        className="flex justify-center items-center text-custom-purple-icon"
                                    >
                                        <FaGithub className="me-1" />
                                        <span className="relative top-[1px] text-[15px]">
                                            Get code
                                        </span>
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className="border border-gray-700 border-opacity-75 p-4 rounded-lg mb-5">
                            <p className="leading-relaxed text-sm text-blue-100">
                                {modalData?.description}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3 mb-5">
                            {modalData?.techStack?.map((item: string) => (
                                <p
                                    key={item}
                                    className="bg-slate-800/50  px-5 py-2 text-sm text-blue-100 rounded-sm"
                                >
                                    {item}
                                </p>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-x-2 gap-y-5 mb-5">
                            {modalData?.images?.map((item) => (
                                <a
                                    key={item}
                                    className="w-full sm:w-[49%]"
                                    href={item}
                                    target="_blank"
                                >
                                    <img
                                        src={item}
                                        alt={modalData.title}
                                        height={500}
                                        width={500}
                                        className="rounded-lg w-full max-h-48 cursor-pointer aspect-video object-cover"
                                    />
                                </a>
                            ))}
                        </div>
                    </ModalContent>
                </ModalBody>
            </Modal>
        </div>
    )
};
