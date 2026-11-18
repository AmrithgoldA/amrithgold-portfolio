/**
 * Skills shown in the Expertise strip alongside the ones served by the portfolio API
 * (Postgres `userskills` table). Logos are filenames in src/assets/images.
 * If a skill with the same name is later added to the database, the database row wins.
 */
type Skill = {
    skill_name: string;
    firebase_file_name: string;
    official_website?: string;
};

const localSkills: Skill[] = [
    { skill_name: "Next.js", firebase_file_name: "Next.js.svg", official_website: "https://nextjs.org/" },
    { skill_name: "React Native", firebase_file_name: "ReactNative.svg", official_website: "https://reactnative.dev/" },
    { skill_name: "Express", firebase_file_name: "Express.svg", official_website: "https://expressjs.com/" },
    { skill_name: "NestJS", firebase_file_name: "NestJS.svg", official_website: "https://nestjs.com/" },
    { skill_name: "PostgreSQL", firebase_file_name: "PostgreSQL.svg", official_website: "https://www.postgresql.org/" },
    { skill_name: "Prisma", firebase_file_name: "Prisma.svg", official_website: "https://www.prisma.io/" },
    { skill_name: "Supabase", firebase_file_name: "Supabase.svg", official_website: "https://supabase.com/" },
    { skill_name: "Zustand", firebase_file_name: "Zustand.svg", official_website: "https://zustand.docs.pmnd.rs/" },
    { skill_name: "GSAP", firebase_file_name: "GSAP.svg", official_website: "https://gsap.com/" },
    { skill_name: "Framer Motion", firebase_file_name: "FramerMotion.svg", official_website: "https://motion.dev/" },
];

export type { Skill };
export { localSkills };
