export interface Member {
  slug: string;
  num: string;
  name: string;
  nameFa: string;
  role: string;
  roleFa: string;
  tagline: string;
  taglineFa: string;
  avatar: string;
  links: {
    github?: string;
    website?: string;
    email?: string;
    telegram?: string;
    linkedin?: string;
    twitter?: string;
    devto?: string;
  };
  bio: {
    en: string;
    fa: string;
  };
  workingOn: {
    en: string[];
    fa: string[];
  };
  education: {
    en: string[];
    fa: string[];
  };
  skills: {
    languages: string[];
    tools: string[];
    learning: string[];
  };
  works?: {
    title: string;
    titleFa: string;
    tag: string;
    tagFa: string;
    body: string;
    bodyFa: string;
    tech: string[];
  }[];
}

export const members: Member[] = [
  {
    slug: "elshan-ghozali",
    num: "01",
    name: "Elshan Ghozali",
    nameFa: "الشن گوزلی",
    role: "SEO-Coder",
    roleFa: "بهینه‌سازی و کدنویسی",
    tagline: "Web visibility, content strategy & full-stack development",
    taglineFa: "دید وب، استراتژی محتوا و توسعه فول‌استک",
    avatar: "https://ui-avatars.com/api/?name=Elshan+Ghozali&background=c4602a&color=fff&size=200&font-size=0.35&bold=true",
    links: {
      github: "https://github.com/ELSHAN-GO",
      website: "https://elshanghozali.ir",
    },
    bio: {
      en: "Hi! I'm Elshan Ghozali, a Computer Engineering student at Tabriz Azad University and a SEO Specialist & Content Creator at SEO Tabriz Company. I've been working in the field of SEO and digital content strategy for over 2 years, where I focus on optimizing web visibility, content performance, and user engagement.\n\nBeyond my professional role, I'm deeply passionate about web development and software engineering. I graduated from a high school specializing in Networking and Programming, and ever since, I've continued expanding my skill set in both frontend and backend technologies.",
      fa: "سلام! من الشن گوزلی هستم، دانشجوی مهندسی کامپیوتر دانشگاه آزاد تبریز و متخصص سئو و تولید محتوا در شرکت سئو تبریز. بیش از ۲ سال در زمینه سئو و استراتژی محتوای دیجیتال فعالیت می‌کنم و روی بهینه‌سازی دید وب، عملکرد محتوا و تعامل کاربر تمرکز دارم.\n\nفراتر از نقش حرفه‌ای‌ام، علاقه‌ی عمیقی به توسعه وب و مهندسی نرم‌افزار دارم. از دبیرستان شبکه و برنامه‌نویسی فارغ‌التحصیل شدم و از اون موقع به‌طور مداوم مهارت‌هام رو در هر دو حوزه فرانت‌اند و بک‌اند گسترش دادم.",
    },
    workingOn: {
      en: [
        "Developing projects in Node.js, JavaScript, TypeScript, and PHP",
        "Experimenting with web-based applications and API integrations",
        "Sharing code and small projects while learning",
        "Exploring modern frameworks and tools to improve workflow",
      ],
      fa: [
        "توسعه پروژه‌ها با Node.js، JavaScript، TypeScript و PHP",
        "آزمایش اپلیکیشن‌های وب‌محور و یکپارچه‌سازی API",
        "اشتراک‌گذاری کد و پروژه‌های کوچک حین یادگیری",
        "کاوش فریم‌ورک‌ها و ابزارهای مدرن برای بهبود گردش کار",
      ],
    },
    education: {
      en: [
        "B.Sc. in Computer Engineering — Tabriz Azad University",
        "High School Graduate in Networking & Programming",
        "Multiple Python bootcamps: automation, data analysis, web backends",
      ],
      fa: [
        "کارشناسی مهندسی کامپیوتر — دانشگاه آزاد تبریز",
        "فارغ‌التحصیل دبیرستان شبکه و برنامه‌نویسی",
        "چندین بوت‌کمپ پایتون: اتوماسیون، تحلیل داده، بک‌اند وب",
      ],
    },
    skills: {
      languages: ["JavaScript", "TypeScript", "Node.js", "PHP", "Python"],
      tools: ["Git", "GitHub", "VS Code", "REST APIs", "HTML/CSS", "MySQL"],
      learning: ["Advanced backend development", "Modern JS frameworks"],
    },
  },
  {
    slug: "ehsan-fazli",
    num: "02",
    name: "Ehsan Fazli",
    nameFa: "احسان فضلی",
    role: "Full-Stack / DevOps",
    roleFa: "فول‌استک / دواپس",
    tagline: "Web platforms, cloud infrastructure & embedded systems",
    taglineFa: "پلتفرم‌های وب، زیرساخت ابری و سیستم‌های امبدد",
    avatar: "https://ui-avatars.com/api/?name=Ehsan+Fazli&background=7a9e8e&color=fff&size=200&font-size=0.35&bold=true",
    links: {
      github: "https://github.com/TssHack",
      website: "https://ehsanjs.ir",
      email: "ehsanfazlinejad@gmail.com",
      telegram: "https://t.me/devehsan",
      linkedin: "https://linkedin.com/in/ehsanfazliii",
      twitter: "https://x.com/ehsanfazliii",
      devto: "https://dev.to/devehsan",
    },
    bio: {
      en: "I'm Ehsan Fazli — a Full-Stack Developer, DevOps Engineer, and embedded systems enthusiast. I build web platforms with React and Next.js, orchestrate cloud infrastructure with Docker and Kubernetes, and write firmware for ESP32 microcontrollers.\n\nMy approach is simple: ship real things that work. I don't just write code — I design architectures that scale, set up CI/CD pipelines that don't break, and create user experiences that feel right. From AI & Machine Learning to IoT & Edge Computing, I explore the full spectrum of modern engineering.",
      fa: "من احسان فضلی هستم — توسعه‌دهنده فول‌استک، مهندس دواپس و علاقه‌مند به سیستم‌های امبدد. پلتفرم‌های وب با React و Next.js می‌سازم، زیرساخت ابری با Docker و Kubernetes مدیریت می‌کنم، و فریم‌ور برای میکروکنترلرهای ESP32 می‌نویسم.\n\nرویکرد من ساده‌ست: چیز واقعی بساز که کار کنه. من فقط کد نمی‌نویسم — معماری‌هایی طراحی می‌کنم که مقیاس‌پذیر باشن، پایپ‌لاین‌های CI/CD می‌چینم که خراب نشن، و تجربه‌های کاربری خلق می‌کنم که درست حس بشن. از هوش مصنوعی و یادگیری ماشین تا IoT و رایانش لبه‌ای، طیف کامل مهندسی مدرن رو کاوش می‌کنم.",
    },
    workingOn: {
      en: [
        "AI & Machine Learning applications",
        "Cloud Native Development",
        "Open Source Contributions",
        "IoT & Edge Computing projects",
        "Web3 & Blockchain exploration",
      ],
      fa: [
        "اپلیکیشن‌های هوش مصنوعی و یادگیری ماشین",
        "توسعه Cloud Native",
        "مشارکت‌های متن‌باز",
        "پروژه‌های IoT و رایانش لبه‌ای",
        "کاوش Web3 و بلاکچین",
      ],
    },
    education: {
      en: [
        "Computer Engineering — Tabriz Azad University",
        "AWS Certified Solutions Architect",
        "Google Cloud Professional",
        "Microsoft Certified Azure Developer",
        "Certified Kubernetes Administrator",
        "Terraform Associate",
      ],
      fa: [
        "مهندسی کامپیوتر — دانشگاه آزاد تبریز",
        "AWS Certified Solutions Architect",
        "Google Cloud Professional",
        "Microsoft Certified Azure Developer",
        "Certified Kubernetes Administrator",
        "Terraform Associate",
      ],
    },
    skills: {
      languages: ["JavaScript", "TypeScript", "Node.js", "Python", "PHP", "Go", "Rust", "Java", "C++", "Dart"],
      tools: ["React", "Next.js", "Docker", "Kubernetes", "Terraform", "Ansible", "AWS", "GCP", "Azure", "Nginx", "Flutter", "ESP-IDF"],
      learning: ["AI/ML", "Quantum Computing", "Cybersecurity"],
    },
    works: [
      {
        title: "Fazl Learning Platform",
        titleFa: "پلتفرم آموزشی فضل",
        tag: "Platform",
        tagFa: "پلتفرم",
        body: "Arabic language education platform with lesson gating, exam flows, and student tracking.",
        bodyFa: "پلتفرم آموزش زبان عربی با قفل درس، جریان آزمون و پیگیری دانش‌آموز.",
        tech: ["Next.js", "MySQL", "TypeScript"],
      },
      {
        title: "V2Ray Config Bot",
        titleFa: "ربات فروش V2Ray",
        tag: "Bot",
        tagFa: "ربات",
        body: "Full-featured VPN config sales bot with modular admin panel, referral system, and receipt verification.",
        bodyFa: "ربات فروش کانفیگ VPN با پنل ادمین ماژولار، سیستم ارجاع و تأیید رسید.",
        tech: ["Python", "Telethon", "SQLite"],
      },
      {
        title: "ESP32 IoT Controller",
        titleFa: "کنترلر IoT با ESP32",
        tag: "Hardware",
        tagFa: "سخت‌افزار",
        body: "Custom firmware for industrial monitoring with MQTT, OTA updates, and a web dashboard.",
        bodyFa: "فریم‌ور سفارشی برای مانیتورینگ صنعتی با MQTT، به‌روزرسانی OTA و داشبورد وب.",
        tech: ["C++", "ESP-IDF", "React"],
      },
    ],
  },
  {
    slug: "amirmahdi-shahbazi",
    num: "03",
    name: "Amirmahdi Shahbazi",
    nameFa: "امیرمهدی شهبازی",
    role: "Linux / AI / Unity",
    roleFa: "لینوکس / هوش مصنوعی / یونیتی",
    tagline: "Systems engineering, artificial intelligence & game dev",
    taglineFa: "مهندسی سیستم، هوش مصنوعی و توسعه بازی",
    avatar: "https://ui-avatars.com/api/?name=Amirmahdi+Shahbazi&background=d4789a&color=fff&size=200&font-size=0.3&bold=true",
    links: {
      github: "https://github.com/amirmwhdi",
    },
    bio: {
      en: "I'm Amirmahdi Shahbazi — a Linux systems engineer with a deep interest in artificial intelligence and game development using Unity. I work at the intersection of systems programming and intelligent applications.\n\nMy expertise spans Linux system administration, C++ and Unity development, and exploring AI/ML algorithms. I believe the future lies in systems that can think, adapt, and interact — and I'm building pieces of that future every day.",
      fa: "من امیرمهدی شهبازی هستم — مهندس سیستم لینوکس با علاقه‌ی عمیق به هوش مصنوعی و توسعه بازی با یونیتی. در تقاطع برنامه‌نویسی سیستم و اپلیکیشن‌های هوشمند کار می‌کنم.\n\nتخصص من شامل مدیریت سیستم لینوکس، توسعه C++ و یونیتی، و کاوش الگوریتم‌های AI/ML میشه. باور دارم آینده در سیستم‌هایی هست که می‌تونن فکر کنن، تطبیق پیدا کنن و تعامل برقرار کنن — و هر روز قطعاتی از اون آینده رو می‌سازم.",
    },
    workingOn: {
      en: [
        "Linux system engineering & hardening",
        "AI/ML model development and training",
        "Unity game development projects",
        "C++ systems programming",
        "Idee creation and prototyping",
      ],
      fa: [
        "مهندسی و سخت‌سازی سیستم لینوکس",
        "توسعه و آموزش مدل‌های AI/ML",
        "پروژه‌های توسعه بازی با یونیتی",
        "برنامه‌نویسی سیستم C++",
        "ایده‌پردازی و ساخت نمونه اولیه",
      ],
    },
    education: {
      en: [
        "Computer Engineering — Tabriz Azad University",
      ],
      fa: [
        "مهندسی کامپیوتر — دانشگاه آزاد تبریز",
      ],
    },
    skills: {
      languages: ["C++", "Python", "C#", "Bash"],
      tools: ["Linux", "Unity", "Docker", "Git", "AI/ML Frameworks"],
      learning: ["Advanced AI architectures", "Game engine internals"],
    },
  },
];

export function getMemberBySlug(slug: string): Member | undefined {
  return members.find((m) => m.slug === slug);
}

export function getAllSlugs(): string[] {
  return members.map((m) => m.slug);
}