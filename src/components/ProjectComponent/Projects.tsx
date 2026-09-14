import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { MotionUp } from "../../assets/Animations/Motionup";
import { getProjectsDetails } from "../../api/routes/ProjectRoute";
import { Project } from "../../types/Project";
import { ProjectCard } from "./ProjectCard";
import { getLocalImage } from "../../lib/getLocalAsset";
import { Modal, ModalBody, ModalContent } from "./Modal";
import { FaEye, FaGithub } from "react-icons/fa";
import { useModal } from "../../context/ModalProvider";
import LazyLoad from 'react-lazyload';
import { ProjectImage } from "./ProjectImage";

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
    const [activeSlide, setActiveSlide] = useState<number>(0)
    const carouselRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        projectDetails();
    }, [])

    function handleShowMore() {
        setInitialCount(initialCount + 3)
    }

    // Mobile carousel: one slide per view, so the centered slide is scroll / (slide width + gap)
    function getSlideStep() {
        const carousel = carouselRef.current;
        const slide = carousel?.firstElementChild as HTMLElement | null;
        if (!carousel || !slide) return 0;
        return slide.offsetWidth + (parseFloat(getComputedStyle(carousel).columnGap) || 0);
    }

    function handleCarouselScroll() {
        const step = getSlideStep();
        if (step && carouselRef.current) {
            setActiveSlide(Math.round(carouselRef.current.scrollLeft / step));
        }
    }

    function scrollToSlide(index: number) {
        carouselRef.current?.scrollTo({ left: index * getSlideStep(), behavior: "smooth" });
    }

    const projectDetails = async () => {
        const response: any = await getProjectsDetails();

        const updatedProjectDetails: any = response.data.map((eachFile: any) => {
            const updatedImages: any = eachFile.images.map((image: string) => {
                return getLocalImage(image) || image;
            });

            return { ...eachFile, images: updatedImages };
        });

        // Lower priority value shows first (priority comes back from Postgres as a string)
        updatedProjectDetails.sort((a: Project, b: Project) => Number(a.priority) - Number(b.priority));

        setProjectDetail(updatedProjectDetails);
    };

    return (
        <div className="py-10" id="projects">
            <div className="max-w-6xl w-full mx-auto px-4 ">
                <MotionUp delay={0.1}>
                    <h2 className="text-center font-bold text-3xl text-blue-100 relative z-20">
                        Explore My Latest Projects
                    </h2>
                    {/* Mobile: swipeable carousel with every project. md and up: grid paged by Load More */}
                    <div
                        ref={carouselRef}
                        onScroll={handleCarouselScroll}
                        className="mt-10 flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-10 md:overflow-visible md:snap-none"
                    >
                        {projectDetail.map((eachProject: Project, index: number) => (
                            <div
                                key={index}
                                className={cn(
                                    // pb-6: the card sits slightly below its 400px trigger, keep its bottom border inside the clip
                                    "w-full shrink-0 snap-center overflow-hidden pb-6 md:overflow-visible md:pb-0",
                                    index >= initialCount && "md:hidden"
                                )}
                            >
                                <ProjectCard data={eachProject} />
                            </div>
                        ))}
                    </div>
                    {projectDetail.length > 1 && (
                        <div className="mt-4 flex justify-center gap-2 md:hidden">
                            {projectDetail.map((_, index) => (
                                <button
                                    key={index}
                                    aria-label={`Go to project ${index + 1}`}
                                    onClick={() => scrollToSlide(index)}
                                    className={cn(
                                        "h-2 rounded-full transition-all duration-300",
                                        index === activeSlide ? "w-6 bg-blue-100" : "w-2 bg-slate-600"
                                    )}
                                />
                            ))}
                        </div>
                    )}
                    {initialCount < projectDetail.length && (
                        <button
                            className='mx-auto hidden md:!block mt-12 cursor-pointer relative h-12 md:w-60 overflow-hidden rounded-lg p-[2px] focus:outline-none text-lg'
                            onClick={() => handleShowMore()}
                        >
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                            <span className='relative inline-flex h-full w-full items-center justify-center rounded-md bg-slate-950 px-3 font-medium text-white gap-2'>
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
                                    <LazyLoad height={500}>
                                        <ProjectImage
                                            src={item}
                                            alt={modalData?.title ?? "Project screenshot"}
                                            className="w-full max-h-48 aspect-video cursor-pointer"
                                        />
                                    </LazyLoad>
                                </a>
                            ))}
                        </div>
                    </ModalContent>
                </ModalBody>
            </Modal>
        </div>
    )
};
