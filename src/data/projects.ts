export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  thumbnail: string;
  images: string[];
  techStack: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  year: number;
  category: 'frontend' | 'fullstack';
}

const BASE = import.meta.env.BASE_URL;

export const projects: Project[] = [
  {
    slug: 'bulkyhub',
    title: 'BulkyHub',
    tagline: 'Bulky Waste Pickup Platform',
    description:
      'A scheduling and tracking platform for bulky waste pickup: residents submit requests, pick slots by RW capacity, and track status using a booking code.',
    role: 'Front-end Developer',
    thumbnail: `${BASE}projects/bulkyhub/bulkyhub-landingpage.png`,
    images: [
      `${BASE}projects/bulkyhub/bulkyhub-landingpage.png`,
      `${BASE}projects/bulkyhub/bulkyhub-form.png`,
      `${BASE}projects/bulkyhub/bulkyhub-formdetail.png`,
      `${BASE}projects/bulkyhub/bulkyhub-verif.png`,
      `${BASE}projects/bulkyhub/bulkyhub-uploadproof.png`,
      `${BASE}projects/bulkyhub/bulkyhub-track.png`,
      `${BASE}projects/bulkyhub/bulkyhub-loginadmin.png`,
      `${BASE}projects/bulkyhub/bulkyhub-dashboard.png`,
      `${BASE}projects/bulkyhub/bulkyhub-pickuprequest.png`,
      `${BASE}projects/bulkyhub/bulkyhub-schedule.png`,
      `${BASE}projects/bulkyhub/bulkyhub-assignment.png`,
      `${BASE}projects/bulkyhub/bulkyhub-detailassignment.png`,
      `${BASE}projects/bulkyhub/bulkyhub-truckmanagement.png`,
    ],
    techStack: ['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'REST API'],
    features: [
      'Multi-step pickup request flow',
      'Slot-based scheduling per RW capacity',
      'Tracking page using booking code',
      'Admin slot management',
    ],
    githubUrl: 'https://github.com/wildanzhafiri/BulkyHub-FE',
    year: 2025,
    category: 'frontend',
  },
  {
    slug: 'laporin',
    title: 'LaporIn',
    tagline: 'Public Complaint Reporting System',
    description:
      'A smart-city reporting web app where citizens submit complaints with a ticket number and track status, while admins verify and resolve reports.',
    role: 'Front-end Developer',
    thumbnail: `${BASE}projects/laporin/laporin1.png`,
    images: Array.from({ length: 10 }, (_, i) => `${BASE}projects/laporin/laporin${i + 1}.png`),
    techStack: ['React', 'TypeScript', 'Tailwind', 'REST API'],
    features: [
      'Complaint submission with validation and photo upload',
      'Report history with status tracking',
      'Admin dashboard for verification',
    ],
    liveUrl: 'https://laporin.bccdev.id/admin',
    githubUrl: 'https://github.com/wildanzhafiri/fe-LaporIn',
    year: 2025,
    category: 'frontend',
  },
  {
    slug: 'em-ub-2025',
    title: 'EM UB 2025',
    tagline: 'Official Organizational Profile Website',
    description:
      'A profile website for Eksekutif Mahasiswa Universitas Brawijaya 2025 featuring programs, organizational structure, about section, magazine content, and work program registration.',
    role: 'Front-end Developer',
    thumbnail: `${BASE}projects/em/em1.png`,
    images: Array.from({ length: 11 }, (_, i) => `${BASE}projects/em/em${i + 1}.png`),
    techStack: ['Next.js', 'TypeScript', 'Tailwind', 'GraphQL', 'Framer Motion'],
    features: [
      'Landing page & core navigation',
      'Work program pages',
      'Announcement feature',
      'Registration form with autosave',
      'Google authentication',
      'GraphQL data handling',
    ],
    liveUrl: 'https://em.ub.ac.id',
    year: 2025,
    category: 'frontend',
  },
  {
    slug: 'kenal-batik',
    title: 'Kenal Batik',
    tagline: 'Cultural Education & Interactive Learning',
    description:
      'An educational platform to explore Indonesian batik motifs with story-based content, interactive quizzes, and a curated catalog with marketplace directions.',
    role: 'Front-end Developer',
    thumbnail: `${BASE}projects/kenalbatik/kenakbatik1.png`,
    images: [
      ...Array.from({ length: 7 }, (_, i) => `${BASE}projects/kenalbatik/kenakbatik${i + 1}.png`),
      ...Array.from({ length: 4 }, (_, i) => `${BASE}projects/kenalbatik/kenalbatik${i + 8}.png`),
    ],
    techStack: ['React', 'InertiaJS', 'Laravel', 'Tailwind', 'Framer Motion'],
    features: [
      'Batik motif catalog',
      'Gamified quiz module',
      'Admin dashboard for managing content',
      'Marketplace direction for purchasing',
    ],
    githubUrl: 'https://github.com/bektiyuda/KenalBatik',
    year: 2024,
    category: 'fullstack',
  },
  {
    slug: 'ticketbuzz',
    title: 'TicketBuzz',
    tagline: 'Concert Ticketing Platform',
    description:
      'A web-based concert ticketing platform focused on simplicity, featuring real-time payments via Midtrans and organizer tools for managing events and sales.',
    role: 'Front-end Developer',
    thumbnail: `${BASE}projects/ticketbuzz/ticketbuzz1.png`,
    images: [
      `${BASE}projects/ticketbuzz/ticketbuzz1.png`,
      `${BASE}projects/ticketbuzz/ticketbuzz4.png`,
      `${BASE}projects/ticketbuzz/ticketbuzz2.png`,
      `${BASE}projects/ticketbuzz/ticketbuzz3.png`,
      `${BASE}projects/ticketbuzz/ticketbuzz5.png`,
      `${BASE}projects/ticketbuzz/ticketbuzz6.png`,
      `${BASE}projects/ticketbuzz/ticketbuzz7.png`,
    ],
    techStack: ['React', 'TypeScript', 'Tailwind', 'Midtrans', 'REST API'],
    features: [
      'Streamlined booking flow',
      'Event catalog',
      'Midtrans payment gateway integration',
      'Purchase history',
    ],
    githubUrl: 'https://github.com/wildanzhafiri/TicketBuzz',
    year: 2024,
    category: 'frontend',
  },
  {
    slug: 'lentara',
    title: 'Lentara',
    tagline: 'Rental Marketplace Platform',
    description:
      'A web-based rental marketplace built to make item renting more accessible and organized, helping users find what they need while enabling providers to manage their rental listings.',
    role: 'Front-end Developer',
    thumbnail: `${BASE}projects/lentara/lentara1.png`,
    images: Array.from({ length: 10 }, (_, i) => `${BASE}projects/lentara/lentara${i + 1}.png`),
    techStack: ['React', 'TypeScript', 'Tailwind', 'REST API', 'Midtrans'],
    features: [
      'Category filter homepage',
      'Product filtering by category/rating/price',
      'Product detail with rental duration/quantity',
      'Checkout with voucher',
      'Provider dashboard',
    ],
    liveUrl: 'https://fe-intern-bcc.vercel.app',
    githubUrl: 'https://github.com/wildanzhafiri/fe-intern-bcc',
    year: 2024,
    category: 'frontend',
  },
  {
    slug: 'domma',
    title: 'DOMMA',
    tagline: 'UMKM Cashier & Inventory Management',
    description:
      'A web-based management system built to help UMKM run daily operations more efficiently by centralizing business processes into a single application.',
    role: 'Front-end Developer',
    thumbnail: `${BASE}projects/domma/domma1.png`,
    images: [
      `${BASE}projects/domma/domma1.png`,
      `${BASE}projects/domma/domma2.png`,
      `${BASE}projects/domma/domma3.png`,
      `${BASE}projects/domma/domma4.png`,
      `${BASE}projects/domma/domma5.png`,
      `${BASE}projects/domma/domma6.png`,
      `${BASE}projects/domma/domma9.png`,
      `${BASE}projects/domma/domma10.png`,
      `${BASE}projects/domma/domma11.png`,
      `${BASE}projects/domma/domma12.png`,
      `${BASE}projects/domma/domma13.png`,
      `${BASE}projects/domma/domma7.png`,
      `${BASE}projects/domma/domma8.png`,
    ],
    techStack: ['React', 'TypeScript', 'Tailwind', 'InertiaJS', 'Laravel'],
    features: [
      'Product CRUD',
      'Fast cashier workflow',
      'Real-time inventory sync',
      'Dashboard summary (profit/daily sales/low-stock)',
      'Automatic receipt generation',
      'Role-based access control',
    ],
    githubUrl: 'https://github.com/AiFahri/domma',
    year: 2024,
    category: 'fullstack',
  },
];
