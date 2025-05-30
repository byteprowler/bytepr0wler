import { TbSettingsCog } from "react-icons/tb";
import { IoMailOpen, IoLayers } from "react-icons/io5";
import { 
  HiHome
} from 'react-icons/hi2';
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaQuoteLeft,
  FaBitcoin,
  FaEthereum
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiFramer,
  SiPython,
  SiDjango,
  SiTailwindcss,
  SiSqlite,
  SiSolana,
  SiTether,
  SiPinetwork
} from "react-icons/si";
import { BiLogoTypescript } from "react-icons/bi";
import { BsBank } from "react-icons/bs";
import { FaGitAlt, FaRegCircleUser } from "react-icons/fa6";

export const display = [
  {
    url: "/tgn.png",
    title: "TGN",
    id: 1,
    link: "https://tgn-two.vercel.app/",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    description: "A tech blog and community platform for gamers, featuring articles, reviews, and discussions on the latest gaming trends.",
    slug:"tech-gamer-network",
  },
  {
    url: "/de-clothing.png",
    title: "De-Clothing",
    id: 2,
    link: "https://de-clothing.vercel.app",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    description: "An e-commerce platform for clothing and accessories, offering a wide range of products with a user-friendly shopping experience.",
    color: "#FACC15",
    slug:"de-clothing",
  },
  {
    url: "/j&lpowertools.png",
    title: "J&L Powertools",
    id: 3, 
    link: "https://seo-optimized.vercel.app",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    description: "A website for a power tools company, showcasing their products and services with a focus on SEO optimization and user experience.",
    color: "#FACC15",
    slug: "j&lpowertools",
  },
  {
    id: 4,
    url: "/byteprowler.png",
    title: "Portfolio",
    link: "https://byteprowler.vercel.app",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    description: "A personal portfolio website showcasing my projects and skills, designed to highlight my work and attract potential clients.",
    color: "#6b21a8",
    slug: "byteprowler",
  },
  {
    id: 5,
    url: "/blank.jpg",
    title: "Project 5",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    description: "A project description goes here. This is a placeholder for the actual project details.",
    link: "",
  },
  {
    id: 6,
    url: "/blank.jpg",
    title: "Project 6",
  },
  {
    id: 7,
    url: "/blank.jpg",
    title: "Project 7",
    link: "",
  },
];

export const aboutData = [
  {
    title: 'skills',
    info: [
      {
        title: 'Frontend Developer',
        icons: [
          { id: 'html', icon: <FaHtml5 className='text-[#E34F26]' /> },
          { id: 'css', icon: <FaCss3 className="text-[#38BDF8]" /> },
          { id: 'taiwindcss', icon: <SiTailwindcss className="text-[#0055FF]" /> },
          { id: 'js', icon: <FaJs className="text-[#F7DF1E]" /> },
          { id: 'ts', icon: <BiLogoTypescript className="text-blue-700" /> },
          { id: 'react', icon: <FaReact className="text-[#61DAFB]" /> },
          { id: 'nextjs', icon: <SiNextdotjs className="" /> },
          { id: 'framer', icon: <SiFramer className="text-[#0055FF]" /> },
        ],
      },
      {
        title: 'Backend Developer',
        icons: [
          { id: 'python', icon: <SiPython className='text-[#e0e326]' /> },
          { id: 'django', icon: <SiDjango className="text-[#38BDF8]" /> },
          { id: 'sqlite', icon: <SiSqlite className="text-[#e5f838]" /> },
        ],
      },
      {
        title: 'Version Control',
        icons: [
          { id: 'git', icon: <FaGitAlt className="devicon-git-plain colored text-[#F05032]" /> },
        ],
      },
    ],
  },
  {
    title: 'experience',
    info: [
      {
        title: 'Fullstack Developer (Freelance)',
        stage: '2024 - current',
      },
    ],
  },
  {
    title: 'credentials',
    info: [
      {
        title: 'Mobile Engineer - Samford Dc Phone Hub',
        stage: '2023',
      },
      {
        title: 'Full-stack Web Development - Univelcity, Yaba, Lagos',
        stage: '2024',
      },
    ],
  },
];

export const wallets = [
    {
      name: "Bitcoin",
      icon: <FaBitcoin className="text-orange-500" />, 
      networks: [{ network: "Mainnet", address: "bc1qy3nmk8uauha969qk953g2z9teqcxktl7aqk95z" }],
    },
    {
      name: "Ethereum",
      icon: <FaEthereum className="text-purple-500" />, 
      networks: [
        { network: "ERC-20", address: "0x679BAd07Ea83253D25373f69963cf61f458800cb" },
        { network: "BEP-20", address: "0x1f5424b0f838e3fbb61edeba5fd0f39b8c5eae46" },
      ],
    },
    {
      name: "Pi Network",
      icon: <SiPinetwork className="text-yellow-500" />, 
      networks: [{ network: "Pi Network", address: "MDFNWH6ZFJVHJDLBMNOUT35X4EEKQVJAO3ZDL4NL7VQJLC4PJOQFWAAAAABC4YPK734CE" }],
    },
    {
      name: "Solana",
      icon: <SiSolana className="text-purple-500" />, 
      networks: [{ network: "SOL", address: "9H3WYyqTtryoP49hW52cpJE7PArtEk4Uz4SSt6wcW2pk" }],
    },
    {
      name: "USDT",
      icon: <SiTether className="text-green-600" />, 
      networks: [{ network: "BEP-20", address: "0x1f5424b0f838e3fbb61edeba5fd0f39b8c5eae46" }],
    },
];


export const banks = [
  {
    name: "Guaranty Trust Bank",
    icon: <BsBank className="text-blue-500" />,
    NUBAN: "1015207029",
    accountName: "Ogo Joshua Agama",
  },
  {
    name: "Kuda MFB",
    icon: <BsBank className="text-purple-800" />,
    NUBAN: "2078636332",
    accountName: "Ogo Joshua Agama",
  },
  {
    name: "Globus Bank",
    icon: <BsBank className="text-green-500" />,
    NUBAN: "3994834344",
    accountName: "Ogo Joshua Agama",
  },
];


export const botNav = [
  { name: 'Home', path: '/', icon: <HiHome />, title: "Home", ariaLabel: 'Home' },
  { name: 'About', path: '/about', icon: <FaRegCircleUser />, title: "About", ariaLabel: 'About' },
  { name: 'Projects', path: '/projects', icon: <IoLayers />, title: "Projects", ariaLabel: 'Projects' },
  { name: 'Services', path: '/services', title: "Services", icon: <TbSettingsCog />, ariaLabel: 'Services' },
  { name: 'Testimonials', path: '/testimonials', icon: <FaQuoteLeft />, title: "Testimonials", ariaLabel: 'Testimonial' },
  { name: 'Contact', path: '/contact', icon: <IoMailOpen />, title: "Contact", ariaLabel: 'Contact' },
];
