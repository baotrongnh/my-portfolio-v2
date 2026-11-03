export const siteConfig = {
  name: "Nguyen Huynh Bao Trong",
  shortName: "NHBT",
  role: "Full-stack Developer",
  description:
    "Portfolio of Nguyen Huynh Bao Trong, a Software Engineering graduate and full-stack developer focused on modern web applications, APIs, databases, and IoT-enabled systems.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://nhbt.vercel.app",
  locale: "en_US",
  email: "nhbaotrong@gmail.com",
  github: "https://github.com/baotrongnh",
  messenger: "https://www.facebook.com/baotrong.nguyenhuynh.52/",
  image: "/images/avatar-2.jpg",
  keywords: [
    "Nguyen Huynh Bao Trong",
    "Bao Trong",
    "NHBT",
    "full-stack developer",
    "software engineer",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "NestJS developer",
    "Vietnam developer",
  ],
} as const

export const absoluteUrl = (path = "/") => new URL(path, siteConfig.url).toString()
