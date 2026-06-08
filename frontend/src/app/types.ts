export type Screen =
  | 'splash' | 'onboarding' | 'auth'
  | 'home' | 'jobs' | 'jobDetail' | 'applications' | 'interviews' | 'profile'
  | 'resume' | 'coverLetter' | 'careerInsights'
  | 'notifications' | 'settings'
  | 'postJob' | 'manageJobs' | 'applicantTracking' | 'recruiterDashboard' | 'roleSelect';

export type Tab = 'home' | 'jobs' | 'applications' | 'interviews' | 'profile';

export interface NavProps {
  navigate: (screen: Screen, params?: Record<string, string>) => void;
  goBack: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  params?: Record<string, string>;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  initials: string;
  color: string;
  salary: string;
  location: string;
  type: string;
  match: number;
  saved: boolean;
  posted: string;
  tags: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  skills: string[];
}

export const JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Product Designer',
    company: 'Google',
    initials: 'G',
    color: '#4285F4',
    salary: '$160k–$190k',
    location: 'Remote',
    type: 'Remote',
    match: 92,
    saved: true,
    posted: '2d ago',
    tags: ['Figma', 'User Research', 'Design Systems'],
    description: 'Lead design for Google\'s core consumer products, collaborating closely with product and engineering to shape millions of user experiences daily. You\'ll work on challenges that span multiple platforms, user types, and global markets.',
    responsibilities: [
      'Define product vision and design strategy for key Google products',
      'Lead end-to-end design process from discovery to delivery',
      'Build and mentor a team of 3–5 product designers',
      'Partner with cross-functional leads in PM, engineering, and research',
      'Drive design system contributions and best practices',
    ],
    requirements: [
      '6+ years of product design experience',
      'Strong portfolio demonstrating systems thinking',
      'Expert-level Figma skills',
      'Experience leading design teams',
      'Excellent communication and stakeholder management',
    ],
    benefits: [
      '$160k–$190k base salary + equity',
      'Comprehensive health, dental & vision',
      'Generous PTO + 20 paid holidays',
      '$5,000 annual L&D budget',
      'Remote-first with quarterly offsites',
    ],
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Leadership'],
  },
  {
    id: '2',
    title: 'UX Lead',
    company: 'Stripe',
    initials: 'S',
    color: '#635BFF',
    salary: '$150k–$180k',
    location: 'San Francisco',
    type: 'Hybrid',
    match: 88,
    saved: false,
    posted: '1d ago',
    tags: ['UX Strategy', 'Dashboards', 'B2B'],
    description: 'Drive UX excellence across Stripe\'s developer-facing products. This is a high-impact role shaping how hundreds of thousands of developers build with Stripe\'s APIs and financial infrastructure.',
    responsibilities: [
      'Own UX strategy for Stripe Dashboard and developer tools',
      'Establish UX quality bars and review processes',
      'Collaborate with product and engineering leadership',
      'Conduct and synthesize user research at scale',
      'Champion accessibility and inclusive design',
    ],
    requirements: [
      '7+ years UX design experience',
      'Strong B2B / developer tool experience',
      'Demonstrated experience leading UX on complex products',
      'Deep user research skills',
      'Ability to influence without authority',
    ],
    benefits: [
      '$150k–$180k + meaningful equity',
      'Top-tier health coverage',
      'Hybrid SF office (2 days/week)',
      'Annual hardware allowance',
      '401k with 6% match',
    ],
    skills: ['UX Strategy', 'Research', 'Figma', 'Developer Tools', 'Leadership'],
  },
  {
    id: '3',
    title: 'Product Designer',
    company: 'Airbnb',
    initials: 'A',
    color: '#FF5A5F',
    salary: '$140k–$165k',
    location: 'Remote',
    type: 'Remote',
    match: 85,
    saved: true,
    posted: '3d ago',
    tags: ['Mobile Design', 'Travel', 'Consumer'],
    description: 'Shape travel experiences for hundreds of millions of guests and hosts worldwide. You\'ll work on Airbnb\'s mobile-first product suite, designing interactions that feel delightful, intuitive, and culturally aware.',
    responsibilities: [
      'Design end-to-end flows for Airbnb guest and host apps',
      'Drive mobile-first design thinking across the team',
      'Collaborate with global research and localization teams',
      'Deliver high-fidelity prototypes for engineering handoff',
      'Contribute to Airbnb\'s DLS design system',
    ],
    requirements: [
      '4+ years product design experience',
      'Strong mobile design portfolio (iOS/Android)',
      'Proficiency in Figma and prototyping tools',
      'Passion for travel and global cultures',
      'Experience with consumer apps at scale',
    ],
    benefits: [
      '$140k–$165k salary',
      'Annual travel credit',
      'Full remote flexibility',
      'Equity package',
      'Wellness & mental health benefits',
    ],
    skills: ['Mobile Design', 'Figma', 'Consumer UX', 'Prototyping', 'Design Systems'],
  },
  {
    id: '4',
    title: 'UI/UX Designer',
    company: 'Figma',
    initials: 'F',
    color: '#1ABCFE',
    salary: '$130k–$155k',
    location: 'SF / Remote',
    type: 'Remote',
    match: 91,
    saved: false,
    posted: '4d ago',
    tags: ['Design Tools', 'Collaboration', 'SaaS'],
    description: 'Design the future of collaborative design tools at Figma. You\'ll work on features used by millions of designers globally, with a direct impact on how the world designs software.',
    responsibilities: [
      'Design new features for Figma\'s core editor and plugins ecosystem',
      'Prototype and iterate rapidly based on user feedback',
      'Partner closely with engineers in agile sprints',
      'Run usability tests and synthesize insights',
      'Contribute to Figma\'s internal design system',
    ],
    requirements: [
      '3+ years of product design experience',
      'Deep proficiency in Figma',
      'Strong visual design and interaction skills',
      'Excellent communication skills',
      'Self-starter attitude in a fast-paced environment',
    ],
    benefits: [
      '$130k–$155k + equity',
      'Hybrid or remote flexibility',
      'Top-tier health & dental',
      'Design conference budget',
      'Unlimited PTO',
    ],
    skills: ['Figma', 'Visual Design', 'Interaction Design', 'Prototyping', 'SaaS'],
  },
  {
    id: '5',
    title: 'Design Systems Lead',
    company: 'Linear',
    initials: 'L',
    color: '#5E6AD2',
    salary: '$155k–$185k',
    location: 'Remote',
    type: 'Remote',
    match: 87,
    saved: false,
    posted: '5d ago',
    tags: ['Design Systems', 'Tokens', 'Engineering'],
    description: 'Own and evolve Linear\'s design system used by thousands of engineering teams. You\'ll bridge design and engineering to create consistent, scalable components that power Linear\'s product.',
    responsibilities: [
      'Lead design and development of Linear\'s component library',
      'Define token architecture and theming system',
      'Collaborate with engineers to ship design system components',
      'Write and maintain design system documentation',
      'Educate and enable the broader product team',
    ],
    requirements: [
      '5+ years design systems experience',
      'Strong knowledge of design tokens and component APIs',
      'Experience with React and TypeScript a plus',
      'Portfolio showcasing systems design work',
      'Excellent written communication',
    ],
    benefits: [
      '$155k–$185k + equity',
      'Fully remote, async-first culture',
      'Top-of-market health benefits',
      'Home office setup budget',
      'Annual team retreats',
    ],
    skills: ['Design Systems', 'Tokens', 'Figma', 'React', 'Documentation'],
  },
  {
    id: '100',
    title: 'Frontend Developer',
    company: 'Google',
    initials: 'G',
    color: '#4285F4',
    salary: '$120k',
    location: 'Remote',
    type: 'Remote',
    match: 95,
    saved: false,
    posted: 'Today',
    tags: ['React', 'TypeScript'],
    description: 'React Developer Position',
    responsibilities: ['Build UI'],
    requirements: ['React'],
    benefits: ['Remote Work'],
    skills: ['React', 'TypeScript']
  }
];
