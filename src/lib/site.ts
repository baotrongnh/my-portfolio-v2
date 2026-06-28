export const siteConfig = {
  name: "Bao Trong Nguyen Huynh",
  shortName: "NHBT",
  role: "Front-end Developer",
  description:
    "Personal portfolio of Bao Trong Nguyen Huynh, a front-end developer building accessible, performant, and polished web experiences with React, Next.js, TypeScript, and Tailwind CSS.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://baotrong.dev",
  locale: "en_US",
  email: "hello@baotrong.dev",
  github: "https://github.com/baotrongnh",
  messenger: "https://m.me/baotrong.nguyenhuynh.52",
  image: "/images/avatar-2.jpg",
  keywords: [
    "Bao Trong",
    "Nguyen Huynh Bao Trong",
    "NHBT",
    "front-end developer",
    "frontend developer portfolio",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "Tailwind CSS",
    "Vietnam developer",
  ],
} as const

export const absoluteUrl = (path = "/") => new URL(path, siteConfig.url).toString()
