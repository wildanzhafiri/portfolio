export interface TechItem {
  name: string;
  category: 'frontend' | 'data-api' | 'tools' | 'also-used';
}

export const techStack: TechItem[] = [
  { name: 'React.js', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'Vue.js', category: 'frontend' },
  { name: 'Nuxt.js', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },

  { name: 'REST APIs', category: 'data-api' },
  { name: 'GraphQL', category: 'data-api' },
  { name: 'Firebase', category: 'data-api' },
  { name: 'Supabase', category: 'data-api' },

  { name: 'Git', category: 'tools' },
  { name: 'GitHub', category: 'tools' },
  { name: 'Postman', category: 'tools' },
  { name: 'Figma', category: 'tools' },

  { name: 'Laravel', category: 'also-used' },
  { name: 'TypeScript', category: 'also-used' },
  { name: 'Express.js', category: 'also-used' },
  { name: 'InertiaJS', category: 'also-used' },
  { name: 'Midtrans', category: 'also-used' },
];

export const softSkills = ['Problem Solving', 'Team Collaboration', 'Product Management', 'Adaptability', 'Continuous Learning'];

export const categoryLabels: Record<TechItem['category'], string> = {
  frontend: 'Frontend',
  'data-api': 'Data / API',
  tools: 'Tools',
  'also-used': 'Also Used',
};
