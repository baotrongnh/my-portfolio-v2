import Hero from "@/components/sections/hero"
import SelectLanguage from "@/components/select-language"
import { cookies } from "next/headers"

export default async function Home() {
  const cookieStore = await cookies()
  const locale = cookieStore.get('NHBT_LOCALE')?.value || 'en'

  return (
    <div>
      <Hero />
      <SelectLanguage />
    </div>
  )
}
