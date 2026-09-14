import { useEffect, useRef, useState } from "react";
import { Carousel_002 } from "@/components/ui/skiper-ui/skiper48";
import { ProjectSlide } from "./ProjectSlide";
import { getProjectsDetails } from "../../api/routes/ProjectRoute";
import { Project } from "../../types/Project";
import { ProjectCard } from "./ProjectCard";
import { getLocalImage } from "../../lib/getLocalAsset";
import { Modal, ModalBody, ModalContent } from "./Modal";
import { FaEye, FaGithub } from "react-icons/fa";
import { useModal } from "../../context/ModalProvider";
import LazyLoad from 'react-lazyload';
import { ProjectImage } from "./ProjectImage";
import { CLEAR_ENTRANCE, MOTION_OK, ScrollTrigger, gsap, useGSAP, useHeadingReveal } from "../../lib/gsap";

export default function Projects() {

    const { modalData, setModalData, setOpen } = useModal();

    const projectDetailObj: Project = {
        title: "",
        description: "",
        images: [],
        techStack: [],
        priority: 0
    }

    const [projectDetail, setProjectDetail] = useState<Project[]>([projectDetailObj])
    const [initialCount, setInitialCount] = useState<number>(3)

    const headingRef = useRef<HTMLHeadingElement>(null);
    const deckRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const shownCount = useRef(initialCount);

    useHeadingReveal(headingRef);

    // Entrance: md+ grid cards rise in batches, the mobile deck rises in as one piece.
    // GSAP only moves wrappers - the card's hover tilt and Swiper's slides stay untouched.
    useGSAP(() => {
        gsap.matchMedia().add({ isDesktop: "(min-width: 768px)", motionOk: MOTION_OK }, (context) => {
            const { isDesktop, motionOk } = context.conditions as { isDesktop: boolean; motionOk: boolean };
            if (!motionOk) return;

            if (isDesktop) {
                const cards = gridRef.current?.querySelectorAll(".gsap-work-card");
                if (!cards?.length) return;

                // Trigger on the wrapper but move its inner div, so the offset never skews trigger positions
                const inner = (elements: Element[]) => elements.map((card) => card.firstElementChild);

                gsap.set(inner(Array.from(cards)), { y: 80, opacity: 0 });
                ScrollTrigger.batch(cards, {
                    start: "top 85%",
                    once: true,
                    onEnter: (batch) => gsap.to(inner(batch), {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power3.out",
                        stagger: 0.12,
                        clearProps: CLEAR_ENTRANCE,
                    }),
                });
            } else if (deckRef.current) {
                gsap.from(deckRef.current.firstElementChild, {
                    y: 40,
                    opacity: 0,
                    scale: 0.92,
                    duration: 0.8,
                    ease: "power3.out",
                    clearProps: CLEAR_ENTRANCE,
                    scrollTrigger: { trigger: deckRef.current, start: "top 85%", once: true },
                });
            }
        });
    }, { dependencies: [projectDetail], revertOnUpdate: true });

    // Load More: animate only the cards that were just added
    useGSAP(() => {
        const previousCount = shownCount.current;
        shownCount.current = initialCount;
        if (initialCount <= previousCount) return;
        if (!window.matchMedia(`(min-width: 768px) and ${MOTION_OK}`).matches) return;

        const newCards = Array.from(gridRef.current?.querySelectorAll(".gsap-work-card") ?? [])
            .slice(previousCount)
            .map((card) => card.firstElementChild);
        gsap.from(newCards, {
            y: 60,
            opacity: 0,
            scale: 0.96,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.1,
            clearProps: CLEAR_ENTRANCE,
        });
    }, { dependencies: [initialCount] });

    useEffect(() => {
        projectDetails();
    }, [])

    function handleShowMore() {
        setInitialCount(initialCount + 3)
    }

    function openProject(project: Project) {
        setModalData(project);
        setOpen(true);
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
                <h2 ref={headingRef} className="text-center font-bold text-3xl text-blue-100 relative z-20">
                    Explore My Latest Projects
                </h2>
                {/* Mobile: swipeable card deck (skiper48) with every project */}
                <div ref={deckRef} className="mt-10 overflow-hidden md:hidden [--swiper-pagination-color:#dbeafe] [--swiper-pagination-bullet-inactive-color:#475569] [--swiper-pagination-bullet-inactive-opacity:1]">
                    {/* plain div for GSAP to move: the carousel's own root is driven by Framer Motion */}
                    <div>
                        <Carousel_002
                            loop={false}
                            animateIn={false}
                            showPagination={projectDetail.length > 1}
                            swiperClassName="mx-auto h-[470px] w-[280px]"
                            slides={projectDetail.map((eachProject: Project) => (
                                <ProjectSlide project={eachProject} onOpen={openProject} />
                            ))}
                        />
                    </div>
                </div>
                {/* md and up: grid paged by Load More */}
                <div ref={gridRef} className="mt-10 hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projectDetail.slice(0, initialCount).map((eachProject: Project, index: number) => (
                        <div key={index} className="gsap-work-card">
                            <div>
                                <ProjectCard data={eachProject} />
                            </div>
                        </div>
                    ))}
                </div>
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
