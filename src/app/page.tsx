import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/routing";

// Fallback only: normally `src/proxy.ts` will locale-redirect based on Accept-Language.
export default function Home() {
  redirect(`/${defaultLocale}`);
}
