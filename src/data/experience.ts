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
    year: '2023',
    label: 'Foundation',
    title: 'Entering the World of Information Technology',
    context: 'Early Exploration and Direction',
    story:
      'Explored multiple areas of IT, learned fundamentals of web and software development, and began developing a strong interest in frontend development.',
    highlights: [
      'Explored multiple areas of information technology',
      'Learned fundamental concepts of web and software development',
      'Began understanding frontend development in real projects',
    ],
    image: `${BASE}images/dokum maba.png`,
    imageOrientation: 'portrait',
  },
  {
    year: '2024',
    label: 'Milestone',
    title: 'First Place at Teknovistafest Web Design Competition',
    context: 'Universitas Airlangga',
    story:
      'Implemented design into real code using React and REST APIs, collaborated in a team as frontend developer under tight deadlines.',
    highlights: [
      'Worked as frontend developer using React',
      'Integrated REST APIs and handled dynamic data',
      'Collaborated in a team under tight competition deadlines',
    ],
    image: `${BASE}images/dokum teknovistafest.png`,
    imageOrientation: 'portrait',
  },
  {
    year: '2025',
    label: 'Organization',
    title: 'Expert Staff at Communication and Information Center',
    context: 'Eksekutif Mahasiswa Universitas Brawijaya',
    story:
      'Developed features for the official EM UB website including program registration with autosave, guided internship staff, and collaborated across divisions.',
    highlights: [
      'Developed and implemented new features for the official website',
      'Guided internship staff during development',
      'Worked closely with different divisions',
    ],
    image: `${BASE}images/dokum ptpd.png`,
    imageOrientation: 'landscape',
  },
  {
    year: '2025',
    label: 'Lab Assistant',
    title: 'Lab Assistant for Web Application Programming',
    context: 'Teaching Environment',
    story:
      'Guided students through weekly web development practicum, helped with debugging, and reinforced fundamentals through teaching and mentoring.',
    highlights: [
      'Guided students through weekly practicum sessions',
      'Assisted students in debugging and completing tasks',
      'Reinforced core fundamentals through teaching',
    ],
    image: `${BASE}images/dokum asprak.png`,
    imageOrientation: 'landscape',
  },
];
