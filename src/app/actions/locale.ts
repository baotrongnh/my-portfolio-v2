"use server"

import { cookies } from "next/headers";

export async function setLocale(newLocale: string) {
     (await cookies()).set("NHBT_LOCALE", newLocale, { path: "/" });
     return { success: true, message: "Updated new locale to" + newLocale };
}

export async function getLocale() {
     return (await cookies()).get("NHBT_LOCALE")?.value || "en"
}