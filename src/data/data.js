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
  FaEthereum,
  FaAccessibleIcon, 
  FaLaptop 
} from "react-icons/fa";
import {IoMdColorPalette, IoMdSearch} from 'react-icons/io'
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
import { AiOutlineMobile } from "react-icons/ai";
import { BiLogoTypescript } from "react-icons/bi";
import { BsBank, BsLaptop, BsTools } from "react-icons/bs";
import { FaGitAlt, FaRegCircleUser } from "react-icons/fa6";
import {
  RxPencil2,
  RxDesktop,
  RxReader,
  RxRocket,
  RxArrowTopRight,
  RxGlobe,
  RxHome,
  RxGear,
  RxLaptop,
} from "react-icons/rx";

export const display = [
  {
    url: "/tgn.png",
    title: "TGN",
    id: 1,
    link: "https://tgn-two.vercel.app/",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    description: "A tech blog and community platform for gamers, featuring articles, reviews, and discussions on the latest gaming trends.",
    sourceCode: "https://github.com/byteprowler/univelcityproject",
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
    sourceCode: "https://github.com/byteprowler/DE-Clothing",
    slug:"de-clothing",
  },
  {
    url: "/j&lpowertools.png",
    title: "J&L Powertools",
    id: 3, 
    link: "https://www.jlpowertools.biz",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    description: "A website for a power tools company, showcasing their products and services with a focus on SEO optimization and user experience.",
    color: "#FACC15",
    sourceCode: "https://github.com/byteprowler/jlpowertools",
    slug: "j&lpowertools",
  },
  {
    id: 4,
    url: "/byteprowler.png",
    title: "Portfolio",
    link: "https://byteprowler.vercel.app",
    sourceCode: "https://github.com/byteprowler/bytepr0wler",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    description: "A personal portfolio website showcasing my projects and skills, designed to highlight my work and attract potential clients.",
    color: "#6b21a8",
    slug: "byteprowler",
  },
  {
    id: 5,
    url: "/blank.jpg",
    title: "Landing Page",
    sourceCode: "https://github.com/byteprowler/mentorled-landing",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    description: "A project description goes here. This is a placeholder for the actual project details.",
    link: "https://mentorled-landing-nine.vercel.app/",
  },
  {
    id: 6,
    url: "/blank.jpg",
    title: "Admin Interface",
    sourceCode: "https://github.com/byteprowler/mentorled-admin",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    description: "An Admin Interface for an E-Commerce Site.",
    link: "https://mentorled-admin.vercel.app/",
  },
  {
    id: 7,
    url: "/blank.jpg",
    sourceCode: "https://github.com/byteprowler/mentorled-form",
    title: "Multi-Step Form",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    description: "A multi-step form for collecting user information, designed to enhance user experience and streamline data entry.",
    link: "https://mentorled-form.vercel.app/",
  },
  {
    id: 8,
    url: "/blank.jpg",
    sourceCode: "https://github.com/byteprowler/mentorled-product",
    title: "Multi-Step Form",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    description: "A product showcase page for an e-commerce site, featuring product details, images, and purchase options.",
    link: "https://mentorled-product.vercel.app/",
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

export const COLORS_TOP = ["#f0f0f0", "#00000", "#d310", "#f15090"];

export const testimonials = [
  {
    id: 1,
    image: "/micode.jpg",
    name: "Miracle King",
    position: "Backend Tutor",
    message: "Awaiting Response.",
    rating: 5,
    date: "2023-01-15",
  },
  {
    id: 2,
    image: "/t-avt-2.png",
    name: "Coderite",
    position: "Frontend Tutor",
    message: "Awaiting Response.",
    rating: 4,
    date: "2023-02-10",
  },
  {
    id: 3,
    image: "/byteprowler.jpeg",
    name: "ByteProwler",
    position: "Myself",
    message:
    "Byte once said, 'Good things take time. Don’t feel pressured by peers chasing quick money through fraud. Stay focused, stay consistent, and success will come.",
    rating: 5,
    date: "2023-03-05",
  },
  {
    id: 4,
    image: "/t-avt-2.png",
    name: "Charles Chibuzo Igweze",
    position: "Backend Classmate",
    message: "Awaiting Response.",
    rating: 4,
    date: "2025-05-31",
  },
];

export const serviceData = [
  {
    icon: <RxGlobe />,
    title: 'Website Design and Development',
    description: 'Create stunning, responsive websites that look great on any device, tailored to meet your business needs.',
  },
  {
    icon: <IoMdColorPalette />,
    title: 'UI/UX Design',
    description: 'Design intuitive and engaging user interfaces that provide an exceptional user experience through thoughtful research and testing.',
  },
  {
    icon: <RxDesktop />,
    title: 'Web App Development',
    description: 'Build dynamic and interactive web applications that offer seamless performance and integrate smoothly with backend services.',
  },
  {
    icon: <RxReader />,
    title: 'Copywriting',
    description: 'Craft compelling and persuasive content that engages your audience, enhances your brand voice, and drives conversions.',
  },
  {
    icon: <IoMdSearch />,
    title: 'SEO Optimization',
    description: 'Improve your website’s search engine rankings through effective keyword research, on-page and technical SEO, and quality content creation.',
  },
  {
    icon: <RxRocket />,
    title: 'Performance Optimization',
    description: 'Enhance website speed and performance through comprehensive audits and optimizations to ensure fast loading times and smooth user experience.',
  },
  {
    icon: <AiOutlineMobile />,
    title: 'Responsive Design',
    description: 'Ensure your website is fully responsive and mobile-friendly, providing an optimal viewing experience across all devices.',
  },
  {
    icon: <RxHome />,
    title: 'Landing Page Design',
    description: 'Develop high-converting landing pages optimized for marketing campaigns to drive user engagement and conversions.',
  },
  {
    icon: <RxPencil2 />,
    title: 'HTML/CSS Development',
    description: 'Convert design mockups into clean, efficient HTML and CSS code, ensuring your website is visually appealing and functional.',
  },
  {
    icon: <RxGear />,
    title: 'JavaScript Development',
    description: 'Convert design mockups into clean, efficient HTML and CSS code, ensuring your website is visually appealing and functional.',
  },
  {
    icon: <BsTools />,
    title: 'Website Maintenance',
    description: 'Provide ongoing website maintenance and support, including regular updates, security checks, and bug fixes to keep your site running smoothly.',
  },
  {
    icon: <FaAccessibleIcon />,
    title: 'Accessibility Optimization',
    description: 'Ensure your website meets accessibility standards, making it usable for everyone, including people with disabilities. ',
  },
  
  {
    icon: <RxLaptop />,
    title: 'Freelance',
    description: 'Flexible and professional freelance web development services tailored to meet the specific needs and timelines of your projects.',
  },
];
