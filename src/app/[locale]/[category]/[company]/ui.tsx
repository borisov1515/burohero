"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { AppLocale } from "@/i18n/routing";
import { getCompanyBySlug, type Company } from "@/lib/companies";

type CancelTelcoForm = {
  applicant_full_name: string;
  applicant_id: string;
  applicant_address: string;
  contract_number: string;
  cancellation_request_date: string;
  cancellation_request_method: string;
  charge_after_cancellation: "yes" | "no" | "";
  charged_amount_eur: string;
  charged_date: string;
  payment_method: string;
  desired_outcome: string;
  extra_details: string;
};

type DepositReturnForm = {
  tenant_full_name: string;
  tenant_id: string;
  tenant_address: string;
  landlord_full_name: string;
  landlord_id: string;
  landlord_address: string;
  property_address: string;
  lease_start_date: string;
  lease_end_date: string;
  deposit_amount_eur: string;
  move_out_date: string;
  keys_returned_date: string;
  requested_before: "yes" | "no" | "";
  requested_before_details: string;
  refund_iban: string;
  desired_outcome: string;
  extra_details: string;
};

type Return14Form = {
  buyer_full_name: string;
  buyer_id: string;
  buyer_address: string;
  seller_name: string;
  seller_address: string;
  order_number: string;
  product_description: string;
  purchase_date: string;
  delivery_date: string;
  return_request_date: string;
  paid_amount_eur: string;
  payment_method: string;
  refund_iban: string;
  contacted_support_before: "yes" | "no" | "";
  contacted_support_details: string;
  desired_outcome: string;
  extra_details: string;
};

function buildCancelTelcoFacts(form: CancelTelcoForm, company: string) {
  const recipient = getCompanyBySlug(company);
  const lines: string[] = [];
  lines.push(`Use case: cancel telecom contract (${company}).`);
  if (recipient) {
    lines.push(`Recipient (company): ${recipient.name}`);
    lines.push(`Recipient CIF: ${recipient.cif}`);
    lines.push(`Recipient address: ${recipient.address}`);
  }
  if (form.applicant_full_name) lines.push(`Applicant full name: ${form.applicant_full_name}`);
  if (form.applicant_id) lines.push(`Applicant ID (DNI/NIE/Passport): ${form.applicant_id}`);
  if (form.applicant_address) lines.push(`Applicant address: ${form.applicant_address}`);
  if (form.contract_number) lines.push(`Contract number: ${form.contract_number}`);
  if (form.cancellation_request_date) lines.push(`Cancellation requested on: ${form.cancellation_request_date}`);
  if (form.cancellation_request_method) lines.push(`Cancellation request method: ${form.cancellation_request_method}`);
  if (form.charge_after_cancellation === "yes") lines.push(`Provider continued charging after cancellation: yes`);
  if (form.charge_after_cancellation === "no") lines.push(`Provider continued charging after cancellation: no`);
  if (form.charged_amount_eur) lines.push(`Charged amount (EUR): ${form.charged_amount_eur}`);
  if (form.charged_date) lines.push(`Charge date: ${form.charged_date}`);
  if (form.payment_method) lines.push(`Payment method: ${form.payment_method}`);
  if (form.desired_outcome) lines.push(`Desired outcome: ${form.desired_outcome}`);
  if (form.extra_details) lines.push(`Additional details: ${form.extra_details}`);
  return lines.join("\n");
}

function buildDepositReturnFacts(form: DepositReturnForm) {
  const lines: string[] = [];
  lines.push("Use case: housing deposit return (fianza).");
  if (form.tenant_full_name) lines.push(`Tenant full name: ${form.tenant_full_name}`);
  if (form.tenant_id) lines.push(`Tenant ID (DNI/NIE/Passport): ${form.tenant_id}`);
  if (form.tenant_address) lines.push(`Tenant address: ${form.tenant_address}`);
  if (form.landlord_full_name) lines.push(`Landlord full name: ${form.landlord_full_name}`);
  if (form.landlord_id) lines.push(`Landlord ID: ${form.landlord_id}`);
  if (form.landlord_address) lines.push(`Landlord address: ${form.landlord_address}`);
  if (form.property_address) lines.push(`Rented property address: ${form.property_address}`);
  if (form.lease_start_date) lines.push(`Lease start date: ${form.lease_start_date}`);
  if (form.lease_end_date) lines.push(`Lease end date: ${form.lease_end_date}`);
  if (form.deposit_amount_eur) lines.push(`Deposit amount (EUR): ${form.deposit_amount_eur}`);
  if (form.move_out_date) lines.push(`Move-out date: ${form.move_out_date}`);
  if (form.keys_returned_date) lines.push(`Keys returned date: ${form.keys_returned_date}`);
  if (form.requested_before === "yes") lines.push("Deposit return already requested before: yes");
  if (form.requested_before === "no") lines.push("Deposit return already requested before: no");
  if (form.requested_before_details) lines.push(`Previous requests: ${form.requested_before_details}`);
  if (form.refund_iban) lines.push(`Refund IBAN: ${form.refund_iban}`);
  if (form.desired_outcome) lines.push(`Desired outcome: ${form.desired_outcome}`);
  if (form.extra_details) lines.push(`Additional details: ${form.extra_details}`);
  return lines.join("\n");
}

function buildReturn14Facts(form: Return14Form) {
  const lines: string[] = [];
  lines.push("Use case: consumer purchase return within 14 days (derecho de desistimiento).");
  if (form.buyer_full_name) lines.push(`Buyer full name: ${form.buyer_full_name}`);
  if (form.buyer_id) lines.push(`Buyer ID (DNI/NIE/Passport): ${form.buyer_id}`);
  if (form.buyer_address) lines.push(`Buyer address: ${form.buyer_address}`);
  if (form.seller_name) lines.push(`Seller/merchant name: ${form.seller_name}`);
  if (form.seller_address) lines.push(`Seller/merchant address: ${form.seller_address}`);
  if (form.order_number) lines.push(`Order / invoice number: ${form.order_number}`);
  if (form.product_description) lines.push(`Product: ${form.product_description}`);
  if (form.purchase_date) lines.push(`Purchase date: ${form.purchase_date}`);
  if (form.delivery_date) lines.push(`Delivery date: ${form.delivery_date}`);
  if (form.return_request_date) lines.push(`Return request date: ${form.return_request_date}`);
  if (form.paid_amount_eur) lines.push(`Paid amount (EUR): ${form.paid_amount_eur}`);
  if (form.payment_method) lines.push(`Payment method: ${form.payment_method}`);
  if (form.refund_iban) lines.push(`Refund IBAN: ${form.refund_iban}`);
  if (form.contacted_support_before === "yes") lines.push("Contacted support before: yes");
  if (form.contacted_support_before === "no") lines.push("Contacted support before: no");
  if (form.contacted_support_details) lines.push(`Support contact details: ${form.contacted_support_details}`);
  if (form.desired_outcome) lines.push(`Desired outcome: ${form.desired_outcome}`);
  if (form.extra_details) lines.push(`Additional details: ${form.extra_details}`);
  return lines.join("\n");
}

type Props = {
  locale: AppLocale;
  category: string;
  company: string;
};

export default function GeneratorClient({ locale, category, company }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const recipient: Company | null = useMemo(() => getCompanyBySlug(company), [company]);
  const [facts, setFacts] = useState("");
  const [cancelForm, setCancelForm] = useState<CancelTelcoForm>({
    applicant_full_name: "",
    applicant_id: "",
    applicant_address: "",
    contract_number: "",
    cancellation_request_date: "",
    cancellation_request_method: "",
    charge_after_cancellation: "",
    charged_amount_eur: "",
    charged_date: "",
    payment_method: "",
    desired_outcome: "",
    extra_details: "",
  });
  const [depositForm, setDepositForm] = useState<DepositReturnForm>({
    tenant_full_name: "",
    tenant_id: "",
    tenant_address: "",
    landlord_full_name: "",
    landlord_id: "",
    landlord_address: "",
    property_address: "",
    lease_start_date: "",
    lease_end_date: "",
    deposit_amount_eur: "",
    move_out_date: "",
    keys_returned_date: "",
    requested_before: "",
    requested_before_details: "",
    refund_iban: "",
    desired_outcome: "",
    extra_details: "",
  });
  const [return14Form, setReturn14Form] = useState<Return14Form>({
    buyer_full_name: "",
    buyer_id: "",
    buyer_address: "",
    seller_name: "",
    seller_address: "",
    order_number: "",
    product_description: "",
    purchase_date: "",
    delivery_date: "",
    return_request_date: "",
    paid_amount_eur: "",
    payment_method: "",
    refund_iban: "",
    contacted_support_before: "",
    contacted_support_details: "",
    desired_outcome: "",
    extra_details: "",
  });
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
    return facts;
  }, [category, cancelForm, company, depositForm, facts, return14Form]);

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
          <div className="grid gap-4">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-black">
              <div className="font-medium">Recipient</div>
              {recipient ? (
                <div className="mt-2 grid gap-1 text-zinc-700 dark:text-zinc-300">
                  <div>{recipient.name}</div>
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400">CIF:</span>{" "}
                    <span className="font-mono">{recipient.cif}</span>
                  </div>
                  <div>{recipient.address}</div>
                </div>
              ) : (
                <div className="mt-2 text-zinc-600 dark:text-zinc-400">
                  Unknown company slug: <span className="font-mono">{company}</span>
                </div>
              )}
            </div>

            <div>
              <div className="text-sm font-medium">Applicant</div>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                <input
                  className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                  value={cancelForm.applicant_full_name}
                  onChange={(e) =>
                    setCancelForm((p) => ({ ...p, applicant_full_name: e.target.value }))
                  }
                  placeholder="Full name"
                />
                <input
                  className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                  value={cancelForm.applicant_id}
                  onChange={(e) =>
                    setCancelForm((p) => ({ ...p, applicant_id: e.target.value }))
                  }
                  placeholder="DNI/NIE/Passport"
                />
                <input
                  className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                  value={cancelForm.applicant_address}
                  onChange={(e) =>
                    setCancelForm((p) => ({ ...p, applicant_address: e.target.value }))
                  }
                  placeholder="Address"
                />
              </div>
            </div>

            <div>
              <div className="text-sm font-medium">Case details</div>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                <input
                  className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                  value={cancelForm.contract_number}
                  onChange={(e) =>
                    setCancelForm((p) => ({ ...p, contract_number: e.target.value }))
                  }
                  placeholder="Contract number (optional)"
                />
                <input
                  className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                  value={cancelForm.cancellation_request_date}
                  onChange={(e) =>
                    setCancelForm((p) => ({
                      ...p,
                      cancellation_request_date: e.target.value,
                    }))
                  }
                  placeholder="Cancellation request date (YYYY-MM-DD)"
                />
                <input
                  className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                  value={cancelForm.cancellation_request_method}
                  onChange={(e) =>
                    setCancelForm((p) => ({
                      ...p,
                      cancellation_request_method: e.target.value,
                    }))
                  }
                  placeholder="How did you request cancellation? (call/email/web)"
                />
                <select
                  className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                  value={cancelForm.charge_after_cancellation}
                  onChange={(e) =>
                    setCancelForm((p) => ({
                      ...p,
                      charge_after_cancellation: e.target.value as any,
                    }))
                  }
                >
                  <option value="">Charging after cancellation?</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <input
                  className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                  value={cancelForm.charged_amount_eur}
                  onChange={(e) =>
                    setCancelForm((p) => ({ ...p, charged_amount_eur: e.target.value }))
                  }
                  placeholder="Charged amount EUR (optional)"
                />
                <input
                  className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                  value={cancelForm.charged_date}
                  onChange={(e) =>
                    setCancelForm((p) => ({ ...p, charged_date: e.target.value }))
                  }
                  placeholder="Charge date (optional)"
                />
                <input
                  className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                  value={cancelForm.payment_method}
                  onChange={(e) =>
                    setCancelForm((p) => ({ ...p, payment_method: e.target.value }))
                  }
                  placeholder="Payment method (card/IBAN) (optional)"
                />
                <input
                  className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                  value={cancelForm.desired_outcome}
                  onChange={(e) =>
                    setCancelForm((p) => ({ ...p, desired_outcome: e.target.value }))
                  }
                  placeholder="What do you want? (refund, confirmation, etc.)"
                />
              </div>

              <textarea
                className="mt-3 h-28 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={cancelForm.extra_details}
                onChange={(e) =>
                  setCancelForm((p) => ({ ...p, extra_details: e.target.value }))
                }
                placeholder="Extra details (optional)"
              />
            </div>

            <details className="rounded-xl border border-zinc-200 p-4 text-sm dark:border-zinc-800">
              <summary className="cursor-pointer select-none font-medium">
                Debug: facts sent to AI
              </summary>
              <pre className="mt-3 whitespace-pre-wrap text-xs text-zinc-600 dark:text-zinc-400">
                {builtFacts}
              </pre>
            </details>
          </div>
        ) : category === "fianza" ? (
          <div className="grid gap-4">
            <div className="text-sm font-medium">Tenant</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={depositForm.tenant_full_name}
                onChange={(e) =>
                  setDepositForm((p) => ({ ...p, tenant_full_name: e.target.value }))
                }
                placeholder="Tenant full name"
              />
              <input
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={depositForm.tenant_id}
                onChange={(e) =>
                  setDepositForm((p) => ({ ...p, tenant_id: e.target.value }))
                }
                placeholder="Tenant DNI/NIE/Passport"
              />
              <input
                className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={depositForm.tenant_address}
                onChange={(e) =>
                  setDepositForm((p) => ({ ...p, tenant_address: e.target.value }))
                }
                placeholder="Tenant address"
              />
            </div>

            <div className="text-sm font-medium">Landlord / recipient</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={depositForm.landlord_full_name}
                onChange={(e) =>
                  setDepositForm((p) => ({ ...p, landlord_full_name: e.target.value }))
                }
                placeholder="Landlord full name"
              />
              <input
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={depositForm.landlord_id}
                onChange={(e) =>
                  setDepositForm((p) => ({ ...p, landlord_id: e.target.value }))
                }
                placeholder="Landlord ID (optional)"
              />
              <input
                className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={depositForm.landlord_address}
                onChange={(e) =>
                  setDepositForm((p) => ({ ...p, landlord_address: e.target.value }))
                }
                placeholder="Landlord address"
              />
            </div>

            <div className="text-sm font-medium">Lease + deposit</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={depositForm.property_address}
                onChange={(e) =>
                  setDepositForm((p) => ({ ...p, property_address: e.target.value }))
                }
                placeholder="Rented property address"
              />
              <input
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={depositForm.lease_start_date}
                onChange={(e) =>
                  setDepositForm((p) => ({ ...p, lease_start_date: e.target.value }))
                }
                placeholder="Lease start date (YYYY-MM-DD)"
              />
              <input
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={depositForm.lease_end_date}
                onChange={(e) =>
                  setDepositForm((p) => ({ ...p, lease_end_date: e.target.value }))
                }
                placeholder="Lease end date (YYYY-MM-DD)"
              />
              <input
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={depositForm.deposit_amount_eur}
                onChange={(e) =>
                  setDepositForm((p) => ({ ...p, deposit_amount_eur: e.target.value }))
                }
                placeholder="Deposit amount EUR"
              />
              <input
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={depositForm.move_out_date}
                onChange={(e) =>
                  setDepositForm((p) => ({ ...p, move_out_date: e.target.value }))
                }
                placeholder="Move-out date (YYYY-MM-DD)"
              />
              <input
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={depositForm.keys_returned_date}
                onChange={(e) =>
                  setDepositForm((p) => ({ ...p, keys_returned_date: e.target.value }))
                }
                placeholder="Keys returned date (optional)"
              />
              <select
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={depositForm.requested_before}
                onChange={(e) =>
                  setDepositForm((p) => ({ ...p, requested_before: e.target.value as any }))
                }
              >
                <option value="">Requested return before?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <input
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={depositForm.refund_iban}
                onChange={(e) =>
                  setDepositForm((p) => ({ ...p, refund_iban: e.target.value }))
                }
                placeholder="Refund IBAN (optional)"
              />
              <input
                className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={depositForm.desired_outcome}
                onChange={(e) =>
                  setDepositForm((p) => ({ ...p, desired_outcome: e.target.value }))
                }
                placeholder="Desired outcome (refund by date, etc.)"
              />
            </div>

            <textarea
              className="h-28 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
              value={depositForm.extra_details}
              onChange={(e) =>
                setDepositForm((p) => ({ ...p, extra_details: e.target.value }))
              }
              placeholder="Extra details (optional)"
            />

            <details className="rounded-xl border border-zinc-200 p-4 text-sm dark:border-zinc-800">
              <summary className="cursor-pointer select-none font-medium">
                Debug: facts sent to AI
              </summary>
              <pre className="mt-3 whitespace-pre-wrap text-xs text-zinc-600 dark:text-zinc-400">
                {builtFacts}
              </pre>
            </details>
          </div>
        ) : category === "devolucion" ? (
          <div className="grid gap-4">
            <div className="text-sm font-medium">Buyer</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={return14Form.buyer_full_name}
                onChange={(e) =>
                  setReturn14Form((p) => ({ ...p, buyer_full_name: e.target.value }))
                }
                placeholder="Buyer full name"
              />
              <input
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={return14Form.buyer_id}
                onChange={(e) =>
                  setReturn14Form((p) => ({ ...p, buyer_id: e.target.value }))
                }
                placeholder="Buyer DNI/NIE/Passport"
              />
              <input
                className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={return14Form.buyer_address}
                onChange={(e) =>
                  setReturn14Form((p) => ({ ...p, buyer_address: e.target.value }))
                }
                placeholder="Buyer address"
              />
            </div>

            <div className="text-sm font-medium">Seller / merchant</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={return14Form.seller_name}
                onChange={(e) =>
                  setReturn14Form((p) => ({ ...p, seller_name: e.target.value }))
                }
                placeholder="Seller name"
              />
              <input
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={return14Form.order_number}
                onChange={(e) =>
                  setReturn14Form((p) => ({ ...p, order_number: e.target.value }))
                }
                placeholder="Order / invoice number (optional)"
              />
              <input
                className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={return14Form.seller_address}
                onChange={(e) =>
                  setReturn14Form((p) => ({ ...p, seller_address: e.target.value }))
                }
                placeholder="Seller address"
              />
            </div>

            <div className="text-sm font-medium">Purchase</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={return14Form.product_description}
                onChange={(e) =>
                  setReturn14Form((p) => ({ ...p, product_description: e.target.value }))
                }
                placeholder="Product description"
              />
              <input
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={return14Form.purchase_date}
                onChange={(e) =>
                  setReturn14Form((p) => ({ ...p, purchase_date: e.target.value }))
                }
                placeholder="Purchase date (YYYY-MM-DD)"
              />
              <input
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={return14Form.delivery_date}
                onChange={(e) =>
                  setReturn14Form((p) => ({ ...p, delivery_date: e.target.value }))
                }
                placeholder="Delivery date (YYYY-MM-DD)"
              />
              <input
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={return14Form.return_request_date}
                onChange={(e) =>
                  setReturn14Form((p) => ({ ...p, return_request_date: e.target.value }))
                }
                placeholder="Return request date (YYYY-MM-DD)"
              />
              <input
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={return14Form.paid_amount_eur}
                onChange={(e) =>
                  setReturn14Form((p) => ({ ...p, paid_amount_eur: e.target.value }))
                }
                placeholder="Paid amount EUR"
              />
              <input
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={return14Form.payment_method}
                onChange={(e) =>
                  setReturn14Form((p) => ({ ...p, payment_method: e.target.value }))
                }
                placeholder="Payment method (card/PayPal/IBAN)"
              />
              <input
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={return14Form.refund_iban}
                onChange={(e) =>
                  setReturn14Form((p) => ({ ...p, refund_iban: e.target.value }))
                }
                placeholder="Refund IBAN (optional)"
              />
              <select
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={return14Form.contacted_support_before}
                onChange={(e) =>
                  setReturn14Form((p) => ({
                    ...p,
                    contacted_support_before: e.target.value as any,
                  }))
                }
              >
                <option value="">Contacted support before?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <input
                className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={return14Form.desired_outcome}
                onChange={(e) =>
                  setReturn14Form((p) => ({ ...p, desired_outcome: e.target.value }))
                }
                placeholder="Desired outcome (refund, instructions for return, etc.)"
              />
              <textarea
                className="sm:col-span-2 h-28 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
                value={return14Form.contacted_support_details}
                onChange={(e) =>
                  setReturn14Form((p) => ({
                    ...p,
                    contacted_support_details: e.target.value,
                  }))
                }
                placeholder="Support contact details (optional)"
              />
            </div>

            <textarea
              className="h-28 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
              value={return14Form.extra_details}
              onChange={(e) =>
                setReturn14Form((p) => ({ ...p, extra_details: e.target.value }))
              }
              placeholder="Extra details (optional)"
            />

            <details className="rounded-xl border border-zinc-200 p-4 text-sm dark:border-zinc-800">
              <summary className="cursor-pointer select-none font-medium">
                Debug: facts sent to AI
              </summary>
              <pre className="mt-3 whitespace-pre-wrap text-xs text-zinc-600 dark:text-zinc-400">
                {builtFacts}
              </pre>
            </details>
          </div>
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

