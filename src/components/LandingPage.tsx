import MagicButton from "../assets/Animations/magic-button";
import { MotionUp } from "../assets/Animations/motion-up"
import { FaLocationArrow, FaDownload } from "react-icons/fa6";

export default function LandingPage() {
    return (
        <div className="Landing-page-main-c">
            <MotionUp delay={0}>
                <h1 className="intro">
                    Hi, I'm Amrith Gold, a Self Taught
                    <br/>
                    Software Developer
                </h1>
            </MotionUp>

            <MotionUp delay={0.3}>
                <p>Based in Tamil Nadu, India, Specialized in React and Node</p>
            </MotionUp>

            <MotionUp delay={0.6}>
                <MagicButton
                    title="Say Hi"
                    icon={<FaLocationArrow />}
                    position="right"
                    scroll="#contact"
                />

                <MagicButton
                    title="Resume"
                    icon={<FaDownload />}
                    position="right"
                    externalLink={"#"}
                />

            </MotionUp>

            <MotionUp delay={0.9}>
                <h2>MY JOURNEY</h2>
                <p>I embarked on my journey to become a software developer alone, without any teacher or mentor. At that time, I had some prior knowledge of programming. I seized the opportunity to learn something new during the lockdown, and it turned out to be an incredible journey. I have learned extensively from online resources, without taking any formal courses. Now, I specialize in React and Node and am capable of creating software independently.</p>
                <h2>Strongly believe in Karma</h2>
            </MotionUp>
        </div>
    )
};
