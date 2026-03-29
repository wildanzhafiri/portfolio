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
  // {
  //   year: '2023',
  //   label: 'Foundation',
  //   title: 'Entering the World of Information Technology',
  //   context: 'Early Exploration and Direction',
  //   story: 'Explored multiple areas of IT, learned fundamentals of web and software development, and began developing a strong interest in frontend development.',
  //   highlights: ['Explored multiple areas of information technology', 'Learned fundamental concepts of web and software development', 'Began understanding frontend development in real projects'],
  //   image: `${BASE}images/dokum maba.png`,
  //   imageOrientation: 'portrait',
  // },
  {
    year: '2024',
    label: 'Milestone',
    title: 'First Place at Teknovistafest Web Design Competition',
    context: 'Universitas Airlangga',
    story: 'Contributed as a Front-End Developer in a team project called “Kenal Batik”, an interactive web platform introducing Indonesian batik culture with gamification features such as quizzes and  experience points ',
    highlights: ['Worked as frontend developer using React', 'Integrated REST APIs and handled dynamic data', 'Collaborated in a team under tight competition deadlines'],
    image: `${BASE}images/dokum teknovistafest.png`,
    imageOrientation: 'portrait',
  },
  {
    year: '2025',
    label: 'Organization',
    title: 'Expert Staff at Communication and Information Center',
    context: 'Eksekutif Mahasiswa Universitas Brawijaya',
    story: 'Rebuilt the official EM UB website and introduced new features to support internal programs, while guiding internship staff through an SDGs-based project as part of their learning process.',
    highlights: [
      'Implemented program registration system using dynamic forms with autosave',
      'Developed announcement feature for publishing student selection results',
      'Mentored internship staff by guiding them through an SDGs-based project',
    ],
    image: `${BASE}images/dokum ptpd.png`,
    imageOrientation: 'landscape',
  },
  {
    year: '2025',
    label: 'Lab Assistant',
    title: 'Lab Assistant for Web Application Programming',
    context: 'Teaching Environment',
    story: 'Assisted students during web development practicum sessions by guiding them through concepts and helping resolve technical issues.',
    highlights: ['Led weekly practicum sessions on web development topics', 'Explained HTML, CSS, JavaScript, PHP, and Laravel fundamentals', 'Reviewed and evaluated student assignments'],
    image: `${BASE}images/dokum asprak.png`,
    imageOrientation: 'landscape',
  },
  {
    year: '2026',
    label: 'Internship',
    title: 'Frontend Engineer Intern at PT. Jalin Mayantara Indonesia',
    context: 'Industry Experience',
    story:
      'Contributed to the development of a microservices based crowdfunding system and an alumni community network platform, involving both feature planning and implementation while learning industry standard practices and professional workflows.',
    highlights: [
      'Planned and developed core features for a crowdfunding system including admin panel, partner management, authentication, and campaign management',
      'Implemented donation features for an alumni community network platform',
      'Integrated frontend with multiple backend services',
    ],
    image: `${BASE}images/dokum jalin.png`,
    imageOrientation: 'landscape',
  },
];
