import type { AppLocale } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

type Palette = {
  id: "A" | "B" | "C" | "D";
  name: string;
  description: string;
  pageBg: string;
  sectionBg: string;
  heroBg: string;
  cardBg: string;
  border: string;
  text: string;
  mutedText: string;
  primaryBtn: string;
  secondaryBtn: string;
  link: string;
  badge: string;
  input: string;
};

const palettes: Palette[] = [
  {
    id: "A",
    name: "Clean Zinc",
    description: "Нейтральный SaaS, максимум читабельности.",
    pageBg: "bg-white",
    sectionBg: "bg-zinc-50",
    heroBg: "bg-zinc-50",
    cardBg: "bg-white",
    border: "border-zinc-200",
    text: "text-zinc-900",
    mutedText: "text-zinc-600",
    primaryBtn:
      "bg-zinc-900 text-white hover:bg-zinc-800",
    secondaryBtn:
      "bg-white text-zinc-900 border border-zinc-200 hover:border-zinc-300",
    link: "text-zinc-900 underline underline-offset-4 hover:text-zinc-700",
    badge: "bg-white border border-zinc-200 text-zinc-700",
    input:
      "bg-white border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-900/10",
  },
  {
    id: "B",
    name: "Warm Paper",
    description: "Тёплая «бумага», более дружелюбно для бюрократии/доков.",
    pageBg: "bg-[#FFFDF7]",
    sectionBg: "bg-[#FAF6EE]",
    heroBg: "bg-[#FAF6EE]",
    cardBg: "bg-[#FFFEFB]",
    border: "border-[#E7DFC9]",
    text: "text-[#1F1E1B]",
    mutedText: "text-[#5B554A]",
    primaryBtn:
      "bg-[#1F1E1B] text-[#FFFDF7] hover:bg-[#2C2A26]",
    secondaryBtn:
      "bg-[#FFFEFB] text-[#1F1E1B] border border-[#E7DFC9] hover:border-[#D6CBB0]",
    link: "text-[#1F1E1B] underline underline-offset-4 hover:text-[#5B554A]",
    badge: "bg-[#FFFEFB] border border-[#E7DFC9] text-[#5B554A]",
    input:
      "bg-[#FFFEFB] border border-[#E7DFC9] text-[#1F1E1B] placeholder:text-[#9B9486] focus:ring-2 focus:ring-[#1F1E1B]/10",
  },
  {
    id: "C",
    name: "Blue Trust",
    description: "Юридически‑банковский вайб доверия: нейтраль + синий акцент.",
    pageBg: "bg-white",
    sectionBg: "bg-[#F5F8FF]",
    heroBg: "bg-[#F5F8FF]",
    cardBg: "bg-white",
    border: "border-[#DCE6FF]",
    text: "text-[#0F172A]",
    mutedText: "text-[#475569]",
    primaryBtn:
      "bg-[#1D4ED8] text-white hover:bg-[#1E40AF]",
    secondaryBtn:
      "bg-white text-[#0F172A] border border-[#DCE6FF] hover:border-[#BFD2FF]",
    link: "text-[#1D4ED8] underline underline-offset-4 hover:text-[#1E40AF]",
    badge: "bg-white border border-[#DCE6FF] text-[#475569]",
    input:
      "bg-white border border-[#DCE6FF] text-[#0F172A] placeholder:text-[#94A3B8] focus:ring-2 focus:ring-[#1D4ED8]/15",
  },
  {
    id: "D",
    name: "Soft Gradient",
    description: "Современный лёгкий градиент в hero, дальше чистый белый.",
    pageBg: "bg-white",
    sectionBg: "bg-white",
    heroBg: "bg-gradient-to-b from-[#F5F8FF] to-white",
    cardBg: "bg-white",
    border: "border-zinc-200",
    text: "text-zinc-900",
    mutedText: "text-zinc-600",
    primaryBtn:
      "bg-[#6D28D9] text-white hover:bg-[#5B21B6]",
    secondaryBtn:
      "bg-white text-zinc-900 border border-zinc-200 hover:border-zinc-300",
    link: "text-[#6D28D9] underline underline-offset-4 hover:text-[#5B21B6]",
    badge: "bg-white border border-zinc-200 text-zinc-700",
    input:
      "bg-white border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:ring-2 focus:ring-[#6D28D9]/15",
  },
];

function Card({
  title,
  desc,
  p,
}: {
  title: string;
  desc: string;
  p: Palette;
}) {
  return (
    <div className={`rounded-2xl border ${p.border} ${p.cardBg} p-5 shadow-sm`}>
      <div className={`text-sm font-semibold ${p.text}`}>{title}</div>
      <div className={`mt-2 text-sm ${p.mutedText}`}>{desc}</div>
      <div className="mt-4 flex items-center gap-3">
        <button className={`h-10 rounded-xl px-4 text-sm font-medium ${p.primaryBtn}`}>
          Primary
        </button>
        <button className={`h-10 rounded-xl px-4 text-sm font-medium ${p.secondaryBtn}`}>
          Secondary
        </button>
      </div>
    </div>
  );
}

export default async function PalettePreviewPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Palette previews</h1>
        <p className="text-sm text-zinc-600">
          Быстрые мок‑примеры (не прод‑дизайн). Выбираем A/B/C/D и переносим на главную.
        </p>
        <p className="text-xs text-zinc-500">
          URL: <span className="font-mono">/{locale}/design/palettes</span>
        </p>
      </header>

      <div className="mt-8 grid gap-8">
        {palettes.map((p) => (
          <section key={p.id} className={`rounded-3xl border ${p.border} overflow-hidden`}>
            <div className={`${p.pageBg} ${p.text}`}>
              {/* hero */}
              <div className={`${p.heroBg} border-b ${p.border}`}>
                <div className="mx-auto w-full px-6 py-10">
                  <div
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ${p.badge}`}
                  >
                    <span className="font-medium">BuroHero</span>
                    <span className="opacity-60">•</span>
                    <span>Preview {p.id}</span>
                  </div>
                  <div className="mt-4 text-3xl font-bold tracking-tight">
                    Spanish Bureaucracy, handled in your language.
                  </div>
                  <div className={`mt-3 max-w-3xl text-sm leading-7 ${p.mutedText}`}>
                    Generate formal legal letters in minutes. Dual Spanish + translation view. No lawyers.
                  </div>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button className={`h-11 rounded-xl px-5 text-sm font-medium ${p.primaryBtn}`}>
                      Start now
                    </button>
                    <button className={`h-11 rounded-xl px-5 text-sm font-medium ${p.secondaryBtn}`}>
                      Browse catalog
                    </button>
                    <a className={`h-11 inline-flex items-center ${p.link}`} href="#elements">
                      Link example
                    </a>
                  </div>
                </div>
              </div>

              {/* section */}
              <div id="elements" className={`${p.sectionBg}`}>
                <div className="mx-auto w-full px-6 py-10">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm font-semibold">
                      {p.name} <span className="opacity-60">({p.id})</span>
                    </div>
                    <div className={`text-sm ${p.mutedText}`}>{p.description}</div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <Card
                      p={p}
                      title="Catalog card"
                      desc="Short description of the use case. This is secondary text."
                    />
                    <div className={`rounded-2xl border ${p.border} ${p.cardBg} p-5 shadow-sm`}>
                      <div className={`text-sm font-semibold ${p.text}`}>Form elements</div>
                      <div className={`mt-2 text-sm ${p.mutedText}`}>
                        Input / select / textarea samples
                      </div>
                      <div className="mt-4 grid gap-3">
                        <input className={`h-11 w-full rounded-xl px-3 text-sm outline-none ${p.input}`} placeholder="Full name" />
                        <select className={`h-11 w-full rounded-xl px-3 text-sm outline-none ${p.input}`}>
                          <option>Option A</option>
                          <option>Option B</option>
                        </select>
                        <textarea className={`h-24 w-full resize-y rounded-xl px-3 py-2 text-sm outline-none ${p.input}`} placeholder="Details (optional)" />
                      </div>
                    </div>
                    <div className={`rounded-2xl border ${p.border} ${p.cardBg} p-5 shadow-sm`}>
                      <div className={`text-sm font-semibold ${p.text}`}>Trust / disclaimer</div>
                      <div className={`mt-2 text-sm leading-7 ${p.mutedText}`}>
                        Disclaimer: BuroHero is a technology provider, not a law firm. Documents are generated automatically.
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className={`rounded-full border ${p.border} ${p.cardBg} px-3 py-1 text-xs ${p.mutedText}`}>
                          Badge
                        </span>
                        <span className={`rounded-full border ${p.border} ${p.cardBg} px-3 py-1 text-xs ${p.mutedText}`}>
                          Secondary badge
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

