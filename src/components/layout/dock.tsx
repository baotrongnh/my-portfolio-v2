import { FloatingDock } from "@/components/ui/floating-dock"
import { Bug, CodeXml, Contact, FolderOpenDot, User } from "lucide-react"

export function Dock() {
     const links = [
          {
               title: "About",
               icon: (
                    <User />
               ),
               href: "/about",
          },
          {
               title: "Skill",
               icon: (
                    <Bug />
               ),
               href: "/skill",
          },
          {
               title: "HERO",
               icon: (
                    <CodeXml />
               ),
               href: "/",
          },
          {
               title: "Project",
               icon: (
                    <FolderOpenDot />
               ),
               href: "/project",
          },
          {
               title: "Contact",
               icon: (
                    <Contact />
               ),
               href: "/contact",
          },
     ]

     return (
          <div className="w-full flex justify-center">
               <div className="absolute bottom-3">
                    <FloatingDock
                         items={links}
                    />
               </div>
          </div>
     )
}
