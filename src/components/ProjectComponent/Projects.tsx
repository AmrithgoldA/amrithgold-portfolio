import { MotionUp } from "../../assets/Animations/Motionup";

export default function Projects() {
    return (
        <div className="py-10" id="projects">
            <div className="max-w-6xl w-full mx-auto px-4 ">
                <MotionUp delay={0.1}>
                    <h2 className="text-center font-bold text-3xl text-blue-100 relative z-20">
                        Explore My Latest Projects
                    </h2>
                    
                </MotionUp>
            </div>
        </div>
    )
};
