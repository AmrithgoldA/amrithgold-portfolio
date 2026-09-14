import { Project } from "../../types/Project";
import { ImagePlaceholder, ProjectImage } from "./ProjectImage";

/**
 * Compact project card used as a slide in the mobile swipe deck (skiper48).
 */
export function ProjectSlide({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
    // Projects still loading from the API
    if (!project.title) {
        return (
            <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/[0.2] bg-slate-950">
                <ImagePlaceholder />
            </div>
        );
    }

    return (
        <button
            type="button"
            onClick={() => onOpen(project)}
            className="flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/[0.2] bg-slate-950 text-left shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
        >
            <ProjectImage
                src={project.images[0]}
                alt={project.title}
                className="h-[160px] w-full shrink-0 rounded-none"
            />
            <div className="flex flex-1 flex-col p-4">
                <h3 className="line-clamp-2 text-base font-bold text-blue-100">{project.title}</h3>
                <p className="mt-2 line-clamp-4 text-sm text-slate-400">{project.description}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                    {project.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} className="rounded-sm bg-slate-800/60 px-2 py-1 text-[11px] text-blue-100">
                            {tech}
                        </span>
                    ))}
                </div>
                <span className="mt-3 text-xs font-medium text-custom-purple-icon">Tap to view details →</span>
            </div>
        </button>
    );
}
