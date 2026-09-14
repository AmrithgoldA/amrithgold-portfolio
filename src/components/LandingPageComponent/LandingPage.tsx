'use client'

import { useRef } from "react";
import { TextHighlight } from "../../assets/Animations/TextHighlight";
import setupImage from '../../assets/images/SetupImage.png';
import profileImage from '../../assets/images/profileImage.png'
import { FaLocationArrow, FaDownload } from "react-icons/fa6";
import resumePdf from '../../assets/pdf/Amrith Gold.pdf';

import { scroller } from "react-scroll";
import placeholderImage from "../../assets/images/broken-image-placeholder.jpg"
import { CLEAR_ENTRANCE, MOTION_OK, SplitText, gsap, useGSAP } from "../../lib/gsap";

const HIGHLIGHT_FROM = { backgroundSize: "0% 100%" };
const HIGHLIGHT_TO = { backgroundSize: "100% 100%", ease: "power2.inOut" };

export default function LandingPage() {

    const heroRef = useRef<HTMLDivElement>(null);
    const introRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLHeadingElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const journeyHeadingRef = useRef<HTMLHeadingElement>(null);
    const journeyTextRef = useRef<HTMLParagraphElement>(null);
    const taglineRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLImageElement>(null);

    useGSAP(() => {
        const intro = introRef.current;
        const title = titleRef.current;
        const subtitle = subtitleRef.current;
        const buttons = buttonsRef.current;
        const card = cardRef.current;
        const journeyHeading = journeyHeadingRef.current;
        const journeyText = journeyTextRef.current;
        const tagline = taglineRef.current;
        const profile = profileRef.current;
        if (!intro || !title || !subtitle || !buttons || !card || !journeyHeading || !journeyText || !tagline || !profile) return;

        const mm = gsap.matchMedia();

        mm.add(MOTION_OK, () => {
            // Card unveils top to bottom, then its text rises line by line
            const addCardReveal = (timeline: gsap.core.Timeline, start: number) => {
                const split = SplitText.create([journeyHeading, journeyText, tagline], { type: "lines", mask: "lines" });
                // Each split line is its own block, so keep the paragraph's justified look while it animates
                if (getComputedStyle(journeyText).textAlign === "justify") {
                    const paragraphLines = split.lines.filter((line) => journeyText.contains(line)) as HTMLElement[];
                    paragraphLines.slice(0, -1).forEach((line) => { line.style.textAlignLast = "justify"; });
                }

                timeline
                    .fromTo(card,
                        { clipPath: "inset(0% 0% 100% 0% round 8px)" },
                        { clipPath: "inset(0% 0% 0% 0% round 8px)", duration: 1, ease: "power3.inOut", clearProps: "clipPath" },
                        start)
                    .from(profile, { scale: 1.3, duration: 1.2, ease: "power3.out" }, start)
                    .from(split.lines, { yPercent: 110, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.06 }, start + 0.4);
                return split;
            };

            // Intro: this page mounts as the loader starts to dissolve, so the timeline starts right away.
            // The title stays split afterwards: per-letter boxes drop kerning, so undoing it would visibly
            // tighten the line. Word and line splits are undone once everything has landed.
            const titleSplit = SplitText.create(title, { type: "words,chars", mask: "chars" });
            const subtitleSplit = SplitText.create(subtitle, { type: "words", mask: "words" });
            const splits = [subtitleSplit];

            const timeline = gsap.timeline({ onComplete: () => splits.forEach((split) => split.revert()) });
            timeline
                .from(titleSplit.chars, { yPercent: 100, opacity: 0, filter: "blur(8px)", duration: 0.7, ease: "power3.out", stagger: 0.018, clearProps: `${CLEAR_ENTRANCE},filter` }, 0.5)
                .fromTo(title.querySelectorAll(".gsap-highlight"), HIGHLIGHT_FROM, { ...HIGHLIGHT_TO, duration: 0.8 }, 1.45)
                .from(subtitleSplit.words, { yPercent: 100, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.05 }, 1.5)
                .fromTo(subtitle.querySelectorAll(".gsap-highlight"), HIGHLIGHT_FROM, { ...HIGHLIGHT_TO, duration: 0.5, stagger: 0.2 }, 2.1)
                .from(buttons.children, { y: 24, scale: 0.92, opacity: 0, duration: 0.6, ease: "back.out(1.7)", stagger: 0.1, clearProps: CLEAR_ENTRANCE }, 2.2);

            // The photo stays slightly enlarged so the parallax shift never shows its edges
            gsap.set(profile, { scale: 1.12 });

            if (card.getBoundingClientRect().top < window.innerHeight * 0.85) {
                splits.push(addCardReveal(timeline, 2.5));
            } else {
                const cardTimeline = gsap.timeline({
                    scrollTrigger: { trigger: card, start: "top 85%", once: true },
                    onComplete: () => cardSplit.revert(),
                });
                const cardSplit = addCardReveal(cardTimeline, 0);
            }

            // Parallax while the card crosses the screen
            const parallax = { trigger: card, start: "top bottom", end: "bottom top", scrub: true };
            gsap.fromTo(card, { backgroundPosition: "50% 20%" }, { backgroundPosition: "50% 80%", ease: "none", scrollTrigger: parallax });
            gsap.fromTo(profile, { yPercent: 6 }, { yPercent: -6, ease: "none", scrollTrigger: { ...parallax } });
        });

        // Desktop: the intro text drifts up and fades as you scroll away
        mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
            gsap.to(intro, {
                y: -120,
                opacity: 0.2,
                ease: "none",
                scrollTrigger: { trigger: heroRef.current, start: "top top", end: "+=500", scrub: true },
            });
        });
    }, { scope: heroRef });

    const handleResumeDownload = () => {
        window.open(resumePdf, '_blank');
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
            <div ref={heroRef} className="pt-20">
                <div className="max-w-6xl w-full mx-auto px-4 flex justify-center relative z-10">
                    <div ref={introRef} className="flex flex-col items-center justify-center w-full">
                        <h1 ref={titleRef} className="text-3xl md:text-6xl text-blue-100 !leading-snug text-center mx-auto font-[900]">
                            Hi, I'm Amrith Gold, a Self Taught
                            <br />
                            <TextHighlight>
                                Software Developer
                            </TextHighlight>
                        </h1>

                        <div className="my-4 flex justify-center">
                            <h6 ref={subtitleRef} className="text-center !leading-7 md:!leading-10 font-semibold text-2 lg:text-3xl max-w-xl  text-blue-100 ">
                                Based in Tamil Nadu, India,
                                <br />
                                Specialized in <TextHighlight>React</TextHighlight> and{" "}
                                <TextHighlight>Node.js</TextHighlight>
                            </h6>
                        </div>

                        <div ref={buttonsRef} className="flex items-center gap-3 mt-5">
                            <button
                                className='cursor-pointer relative inline-flex shrink-0 h-12 md:w-60 overflow-hidden rounded-lg p-[2px] focus:outline-none text-lg'
                                onClick={() => scrollToDiv()}
                            >
                                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                                <span className='relative inline-flex h-full w-full items-center justify-center rounded-md bg-slate-950 px-3 font-medium text-white gap-2'>
                                    Say Hi
                                    <FaLocationArrow />
                                </span>
                            </button>
                            <button
                                className='relative inline-flex shrink-0 h-12 md:w-60 overflow-hidden rounded-lg p-[2px] focus:outline-none text-lg'
                                onClick={() => handleResumeDownload()}
                            >
                                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                                <span className='relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-slate-950 px-3 font-medium text-white gap-2'>
                                    Resume
                                    <FaDownload />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="max-w-6xl w-full mx-auto px-4 mt-12 lg:mt-16 z-20 relative">
                    <div ref={cardRef} className="p-0 py-10 md:p-14 rounded-lg"
                        style={{
                            background: `linear-gradient(90deg, rgba(4,7,29,0.85) 0%, rgba(12,14,35,0.80) 100%), url(${setupImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        <div className="flex gap-8 flex-wrap lg:flex-nowrap lg:gap-16 overflow-hidden">
                            <div className="order-2 lg:order-1 w-full lg:w-[70%]">
                                <h2 ref={journeyHeadingRef} className="font-bold text-3xl z-20 uppercase mb-5 text-purple-300">
                                    My Journey
                                </h2>
                                <p ref={journeyTextRef} className="text-blue-100 text-normal sm:text-lg sm:text-justify">
                                    My journey began in 2022 when I decided to become a software developer, starting on my own without any teacher or mentor. At that time, I had no prior knowledge of programming. I took the initiative to learn something new, and it turned out to be an incredible journey. I have learned extensively from online resources without taking any formal courses. Now, I specialize in React and Node.js and am capable of creating software independently.
                                </p>
                                <div ref={taglineRef} className="text-white italic font-semibold text-xl mt-5 uppercase animate-pulse">
                                    Persistence drives <span className="text-purple-300">success.</span>
                                </div>
                            </div>
                            <div className="flex justify-center order-1 lg:order-2 w-full lg:w-[27%]">
                                {/* clips the photo while it scales in and shifts with the parallax */}
                                <div className="h-fit overflow-hidden rounded-lg">
                                    <img
                                        ref={profileRef}
                                        src={profileImage}
                                        alt={placeholderImage}
                                        width={300}
                                        height={800}
                                        className="rounded-lg aspect-square overflow-hidden"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
