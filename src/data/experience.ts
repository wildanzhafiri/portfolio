export interface Experience {
  year: string;
  label: string;
  title: string;
  context: string;
  story: string;
  highlights?: string[];
  image: string;
  imageOrientation: 'portrait' | 'landscape';
}

const BASE = import.meta.env.BASE_URL;

export const experiences: Experience[] = [
  {
    year: '2024',
    label: 'Milestone',
    title: 'First Place at Teknovistafest Web Design Competition',
    context: 'Universitas Airlangga',
    story: 'Contributed as a Front-End Developer in a team project called “Kenal Batik”, an interactive web platform introducing Indonesian batik culture with gamification features such as quizzes and  experience points ',
    highlights: ['Worked as frontend developer using React', 'Integrated REST APIs and handled dynamic data', 'Collaborated in a team under tight competition deadlines'],
    image: `${BASE}images/dokum teknovistafest.webp`,
    imageOrientation: 'portrait',
  },
  {
    year: '2025',
    label: 'Organization',
    title: 'Expert Staff at Communication and Information Center',
    context: 'Eksekutif Mahasiswa Universitas Brawijaya',
    story: 'Rebuilt the official EM UB website using Next.js, TypeScript, and GraphQL. The platform supported more than 1,300 users and served as a central channel for program registration and selection announcements.',
    highlights: [
      'Built a program registration system with dynamic forms, autosave functionality, and GraphQL integration',
      'Developed an announcement feature for publishing program selection results',
      'Created reusable UI components, page navigation, and user interaction flows',
      'Mentored internship staff in implementing front-end concepts for SDGs-related web projects',
    ],
    image: `${BASE}images/dokum ptpd.webp`,
    imageOrientation: 'landscape',
  },
  {
    year: '2025',
    label: 'Lab Assistant',
    title: 'Lab Assistant for Web Application Programming',
    context: 'Faculty of Computer Science, Universitas Brawijaya',
    story: 'Assisted students during web development practicum sessions by guiding them through concepts and helping resolve technical issues.',
    highlights: ['Led weekly practicum sessions on web development topics', 'Explained HTML, CSS, JavaScript, PHP, and Laravel fundamentals', 'Reviewed and evaluated student assignments'],
    image: `${BASE}images/dokum asprak.webp`,
    imageOrientation: 'landscape',
  },
  {
    year: '2026',
    label: 'Internship',
    title: 'Frontend Developer Intern at PT. Jalin Mayantara Indonesia',
    context: 'PT. Jalin Mayantara Indonesia',
    story:
      'Developed frontend features for a microservice-based digital education ecosystem and several internal products. Contributed to student examination workflows, AI-powered learning analysis, and the complete feature delivery process while collaborating with designers, backend engineers, and the team leader.',
    highlights: [
      'Built exam flows, teacher dashboards, pre-test and post-test experiences, onboarding, and AI-based question generation features',
      'Integrated APIs and handled page states, mobile-lock layouts, and exam result mapping to help teachers identify learning groups, topics requiring reinforcement, and recommended follow-up actions',
      'Supported feature delivery from implementation and review through testing, UAT, internal demos, and post-release bug fixing',
      'Developed donation, campaign management, report download, and question digitalization features across Vue, Nuxt, and Next.js codebases',
    ],
    image: `${BASE}images/dokum jalin.webp`,
    imageOrientation: 'landscape',
  },
];
