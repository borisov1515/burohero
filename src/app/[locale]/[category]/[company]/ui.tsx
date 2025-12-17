"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { AppLocale } from "@/i18n/routing";
import {
  CancelTelcoFormSection,
  buildCancelTelcoFacts,
  defaultCancelTelcoForm,
  type CancelTelcoForm,
} from "./usecases/cancelTelco";
import {
  DepositReturnFormSection,
  buildDepositReturnFacts,
  defaultDepositReturnForm,
  type DepositReturnForm,
} from "./usecases/depositReturn";
import {
  Return14FormSection,
  buildReturn14Facts,
  defaultReturn14Form,
  type Return14Form,
} from "./usecases/return14";
import {
  RepairDemandFormSection,
  buildRepairDemandFacts,
  defaultRepairDemandForm,
  type RepairDemandForm,
} from "./usecases/repairDemand";

type Props = {
  locale: AppLocale;
  category: string;
  company: string;
};

export default function GeneratorClient({ locale, category, company }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [facts, setFacts] = useState("");
  const [cancelForm, setCancelForm] = useState<CancelTelcoForm>(defaultCancelTelcoForm);
  const [depositForm, setDepositForm] = useState<DepositReturnForm>(
    defaultDepositReturnForm,
  );
  const [return14Form, setReturn14Form] = useState<Return14Form>(defaultReturn14Form);
  const [repairForm, setRepairForm] = useState<RepairDemandForm>(defaultRepairDemandForm);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [es, setEs] = useState("");
  const [native, setNative] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [debugLastRequest, setDebugLastRequest] = useState<any>(null);
  const [debugLastResponse, setDebugLastResponse] = useState<any>(null);

  const builtFacts = useMemo(() => {
    if (category === "cancel") return buildCancelTelcoFacts(cancelForm, company);
    if (category === "fianza") return buildDepositReturnFacts(depositForm);
    if (category === "devolucion") return buildReturn14Facts(return14Form);
    if (category === "reparacion") return buildRepairDemandFacts(repairForm);
    return facts;
  }, [category, cancelForm, company, depositForm, facts, return14Form, repairForm]);

  const canGenerate = useMemo(() => builtFacts.trim().length >= 10, [builtFacts]);

  useEffect(() => {
    const id = searchParams.get("orderId");
    if (!id) return;

    let cancelled = false;

    (async () => {
      setError(null);
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/orders/get?orderId=${encodeURIComponent(id)}`,
        );
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error ?? "Failed to load order");

        const snap = (json.content_snapshot ?? {}) as any;
        if (cancelled) return;

        setOrderId(String(json.orderId));
        setIsPaid(json.status === "paid");
        setFacts(String(snap.facts ?? ""));
        if (category === "cancel" && snap.form) {
          const f = snap.form as Partial<CancelTelcoForm>;
          setCancelForm((prev) => ({
            ...prev,
            ...Object.fromEntries(
              Object.entries(f).map(([k, v]) => [k, String(v ?? "")]),
            ),
            charge_after_cancellation:
              f.charge_after_cancellation === "yes" || f.charge_after_cancellation === "no"
                ? f.charge_after_cancellation
                : "",
          }));
        } else if (category === "cancel") {
          // Back-compat: if only facts exist, keep it as extra_details for user visibility
          setCancelForm((prev) => ({ ...prev, extra_details: String(snap.facts ?? "") }));
        } else if (category === "fianza" && snap.form) {
          const f = snap.form as Partial<DepositReturnForm>;
          setDepositForm((prev) => ({
            ...prev,
            ...Object.fromEntries(
              Object.entries(f).map(([k, v]) => [k, String(v ?? "")]),
            ),
            requested_before:
              f.requested_before === "yes" || f.requested_before === "no"
                ? f.requested_before
                : "",
          }));
        } else if (category === "fianza") {
          setDepositForm((prev) => ({ ...prev, extra_details: String(snap.facts ?? "") }));
        } else if (category === "devolucion" && snap.form) {
          const f = snap.form as Partial<Return14Form>;
          setReturn14Form((prev) => ({
            ...prev,
            ...Object.fromEntries(
              Object.entries(f).map(([k, v]) => [k, String(v ?? "")]),
            ),
            contacted_support_before:
              f.contacted_support_before === "yes" || f.contacted_support_before === "no"
                ? f.contacted_support_before
                : "",
          }));
        } else if (category === "devolucion") {
          setReturn14Form((prev) => ({ ...prev, extra_details: String(snap.facts ?? "") }));
        } else if (category === "reparacion" && snap.form) {
          const f = snap.form as Partial<RepairDemandForm>;
          setRepairForm((prev) => ({
            ...prev,
            ...Object.fromEntries(
              Object.entries(f).map(([k, v]) => [k, String(v ?? "")]),
            ),
            urgency:
              f.urgency === "low" || f.urgency === "normal" || f.urgency === "high"
                ? f.urgency
                : "",
          }));
        } else if (category === "reparacion") {
          setRepairForm((prev) => ({ ...prev, extra_details: String(snap.facts ?? "") }));
        }
        setEs(String(snap.spanish_legal_text ?? ""));
        setNative(String(snap.native_user_translation ?? ""));
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Unknown error");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  async function onGenerate() {
    setError(null);
    setIsLoading(true);
    try {
      const payload =
        category === "cancel"
          ? {
              locale,
              category,
              company,
              form: cancelForm,
              facts: builtFacts,
            }
          : category === "fianza"
            ? {
                locale,
                category,
                company,
                form: depositForm,
                facts: builtFacts,
              }
            : category === "devolucion"
              ? {
                  locale,
                  category,
                  company,
                  form: return14Form,
                  facts: builtFacts,
                }
              : category === "reparacion"
                ? {
                    locale,
                    category,
                    company,
                    form: repairForm,
                    facts: builtFacts,
                  }
          : { locale, category, company, facts };

      setDebugLastRequest(payload);
      setDebugLastResponse(null);

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      setDebugLastResponse(json);
      if (!res.ok) throw new Error(json?.error ?? "Generate failed");

      setOrderId(json.orderId);
      setIsPaid(false);
      setEs(json.spanish_legal_text);
      setNative(json.native_user_translation);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }

  async function onMockPay() {
    if (!orderId) return;
    setError(null);
    setIsLoading(true);
    try {
      const res = await fetch("/api/orders/mock-pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Mock pay failed");
      setIsPaid(true);
      router.push(`/${locale}/checkout/result?orderId=${encodeURIComponent(orderId)}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
      <header className="flex flex-col gap-2">
        <div className="text-sm text-zinc-500 dark:text-zinc-400">
          {locale} / {category} / {company}
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Document generator</h1>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        {category === "cancel" ? (
          <CancelTelcoFormSection
            company={company}
            form={cancelForm}
            setForm={(u) => setCancelForm(u)}
            builtFacts={builtFacts}
          />
        ) : category === "fianza" ? (
          <DepositReturnFormSection
            form={depositForm}
            setForm={(u) => setDepositForm(u)}
            builtFacts={builtFacts}
          />
        ) : category === "devolucion" ? (
          <Return14FormSection
            form={return14Form}
            setForm={(u) => setReturn14Form(u)}
            builtFacts={builtFacts}
          />
        ) : category === "reparacion" ? (
          <RepairDemandFormSection
            form={repairForm}
            setForm={(u) => setRepairForm(u)}
            builtFacts={builtFacts}
          />
        ) : (
          <>
            <label className="text-sm font-medium">Your facts (in your language)</label>
            <textarea
              className="mt-2 h-40 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
              value={facts}
              onChange={(e) => setFacts(e.target.value)}
              placeholder="Describe the situation: dates, amounts, contract details, what you want to demand…"
            />
          </>
        )}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            className="inline-flex h-11 items-center justify-center rounded-xl bg-zinc-900 px-5 text-sm font-medium text-white disabled:opacity-50 dark:bg-zinc-50 dark:text-black"
            disabled={!canGenerate || isLoading}
            onClick={onGenerate}
          >
            {isLoading ? "Working…" : "Generate"}
          </button>

          <button
            className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200 px-5 text-sm font-medium disabled:opacity-50 dark:border-zinc-800"
            disabled={!orderId || isLoading}
            onClick={onMockPay}
          >
            Unlock document (mock pay)
          </button>

          {orderId ? (
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              Order: <span className="font-mono">{orderId}</span>
            </div>
          ) : null}
        </div>

        {error ? (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200">
            {error}
          </div>
        ) : null}

        <details className="mt-4 rounded-xl border border-zinc-200 p-4 text-sm dark:border-zinc-800">
          <summary className="cursor-pointer select-none font-medium">
            Debug: last API request/response
          </summary>
          <div className="mt-3 grid gap-3">
            <div>
              <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Request
              </div>
              <pre className="mt-1 whitespace-pre-wrap rounded-lg bg-zinc-50 p-3 text-xs text-zinc-800 dark:bg-black dark:text-zinc-200">
                {debugLastRequest ? JSON.stringify(debugLastRequest, null, 2) : "—"}
              </pre>
            </div>
            <div>
              <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Response
              </div>
              <pre className="mt-1 whitespace-pre-wrap rounded-lg bg-zinc-50 p-3 text-xs text-zinc-800 dark:bg-black dark:text-zinc-200">
                {debugLastResponse ? JSON.stringify(debugLastResponse, null, 2) : "—"}
              </pre>
            </div>
          </div>
        </details>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mb-3 text-sm font-medium">Spanish legal document (blurred until paid)</div>
          <div
            className={[
              "whitespace-pre-wrap text-sm leading-6",
              !es ? "opacity-60" : "",
              !isPaid && es ? "blur-sm select-none" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {es || "Generate to see preview…"}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mb-3 text-sm font-medium">Translation (always visible)</div>
          <div className="whitespace-pre-wrap text-sm leading-6">
            {native || "Generate to see translation…"}
          </div>
        </div>
      </section>
    </main>
  );
}

