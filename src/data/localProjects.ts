import { Project } from "../types/Project";

/**
 * Projects shown alongside the ones served by the portfolio API (Postgres `projects` table).
 * Images are filenames in src/assets/images, resolved the same way as API images.
 * If a project with the same title is later added to the database, the database row wins.
 */
const localProjects: Project[] = [
    {
        title: "FLUNTZ - Online English Learning Platform",
        description:
            "The website and platform for FLUNTZ, an online English academy offering four structured course levels (First Flight to Elite Fluency) plus IELTS & CELPIP preparation. Built from Figma designs with the Next.js App Router: a free 12-question English level test that scores learners and recommends a course, a course catalogue with enrolment checkout, a resources library with articles, student login and dashboard, trainer profiles and certificate verification. A NestJS API on PostgreSQL (Prisma) stores leads, call-back requests and student accounts, and an owners' admin panel with authenticator sign-in manages the inbox, students and orders. Ships with SEO structured data, a strict Content Security Policy and consent-gated Google Analytics.",
        images: ["fluntz1.jpg", "fluntz2.jpg"],
        techStack: ["Next.js", "React", "TypeScript", "NestJS", "PostgreSQL", "Prisma", "Google Analytics"],
        liveUrl: "https://fluntz.com/",
        priority: 0,
    },
];

export { localProjects };
