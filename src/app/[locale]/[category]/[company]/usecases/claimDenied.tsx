"use client";

export type ClaimDeniedForm = {
  policyholder_full_name: string;
  policyholder_id: string;
  policyholder_address: string;
  insurer_name: string;
  policy_number: string;
  claim_number: string;
  incident_date: string;
  incident_description: string;
  claimed_amount_eur: string;
  denial_date: string;
  denial_reason: string;
  contacted_before: "yes" | "no" | "";
  contacted_details: string;
  desired_outcome: string;
  iban: string;
  extra_details: string;
};

export const defaultClaimDeniedForm: ClaimDeniedForm = {
  policyholder_full_name: "",
  policyholder_id: "",
  policyholder_address: "",
  insurer_name: "",
  policy_number: "",
  claim_number: "",
  incident_date: "",
  incident_description: "",
  claimed_amount_eur: "",
  denial_date: "",
  denial_reason: "",
  contacted_before: "",
  contacted_details: "",
  desired_outcome: "",
  iban: "",
  extra_details: "",
};

export function buildClaimDeniedFacts(form: ClaimDeniedForm, companySlug: string) {
  const lines: string[] = [];
  lines.push(`Use case: insurance claim denied / refusal to pay (${companySlug}).`);
  if (form.policyholder_full_name) lines.push(`Policyholder full name: ${form.policyholder_full_name}`);
  if (form.policyholder_id) lines.push(`Policyholder ID (DNI/NIE/Passport): ${form.policyholder_id}`);
  if (form.policyholder_address) lines.push(`Policyholder address: ${form.policyholder_address}`);
  if (form.insurer_name) lines.push(`Insurer name: ${form.insurer_name}`);
  if (form.policy_number) lines.push(`Policy number: ${form.policy_number}`);
  if (form.claim_number) lines.push(`Claim number: ${form.claim_number}`);
  if (form.incident_date) lines.push(`Incident date: ${form.incident_date}`);
  if (form.incident_description) lines.push(`Incident description: ${form.incident_description}`);
  if (form.claimed_amount_eur) lines.push(`Claimed amount (EUR): ${form.claimed_amount_eur}`);
  if (form.denial_date) lines.push(`Denial date: ${form.denial_date}`);
  if (form.denial_reason) lines.push(`Denial reason (as stated): ${form.denial_reason}`);
  if (form.contacted_before === "yes") lines.push("Contacted insurer before: yes");
  if (form.contacted_before === "no") lines.push("Contacted insurer before: no");
  if (form.contacted_details) lines.push(`Previous communication: ${form.contacted_details}`);
  if (form.desired_outcome) lines.push(`Desired outcome: ${form.desired_outcome}`);
  if (form.iban) lines.push(`IBAN for payment (optional): ${form.iban}`);
  if (form.extra_details) lines.push(`Additional details: ${form.extra_details}`);
  return lines.join("\\n");
}

export function ClaimDeniedFormSection({
  form,
  setForm,
  builtFacts,
}: {
  form: ClaimDeniedForm;
  setForm: (updater: (prev: ClaimDeniedForm) => ClaimDeniedForm) => void;
  builtFacts: string;
}) {
  return (
    <div className="grid gap-4">
      <div className="text-sm font-medium">Policyholder</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.policyholder_full_name}
          onChange={(e) => setForm((p) => ({ ...p, policyholder_full_name: e.target.value }))}
          placeholder="Full name"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.policyholder_id}
          onChange={(e) => setForm((p) => ({ ...p, policyholder_id: e.target.value }))}
          placeholder="DNI/NIE/Passport (optional)"
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.policyholder_address}
          onChange={(e) => setForm((p) => ({ ...p, policyholder_address: e.target.value }))}
          placeholder="Address (optional)"
        />
      </div>

      <div className="text-sm font-medium">Policy + claim</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.insurer_name}
          onChange={(e) => setForm((p) => ({ ...p, insurer_name: e.target.value }))}
          placeholder="Insurer name (optional)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.policy_number}
          onChange={(e) => setForm((p) => ({ ...p, policy_number: e.target.value }))}
          placeholder="Policy number (optional)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.claim_number}
          onChange={(e) => setForm((p) => ({ ...p, claim_number: e.target.value }))}
          placeholder="Claim number (optional)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.claimed_amount_eur}
          onChange={(e) => setForm((p) => ({ ...p, claimed_amount_eur: e.target.value }))}
          placeholder="Claimed amount EUR (optional)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.incident_date}
          onChange={(e) => setForm((p) => ({ ...p, incident_date: e.target.value }))}
          placeholder="Incident date (optional)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.denial_date}
          onChange={(e) => setForm((p) => ({ ...p, denial_date: e.target.value }))}
          placeholder="Denial date (optional)"
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.iban}
          onChange={(e) => setForm((p) => ({ ...p, iban: e.target.value }))}
          placeholder="IBAN for payment (optional)"
        />
      </div>

      <textarea
        className="h-28 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
        value={form.incident_description}
        onChange={(e) => setForm((p) => ({ ...p, incident_description: e.target.value }))}
        placeholder="Incident description (what happened, damages, documents)…"
      />
      <textarea
        className="h-24 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
        value={form.denial_reason}
        onChange={(e) => setForm((p) => ({ ...p, denial_reason: e.target.value }))}
        placeholder="Denial reason (as stated by insurer)…"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <select
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.contacted_before}
          onChange={(e) => setForm((p) => ({ ...p, contacted_before: e.target.value as any }))}
        >
          <option value="">Contacted insurer before?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.desired_outcome}
          onChange={(e) => setForm((p) => ({ ...p, desired_outcome: e.target.value }))}
          placeholder="Desired outcome (pay claim, reconsider, provide report, etc.)"
        />
        <textarea
          className="sm:col-span-2 h-24 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.contacted_details}
          onChange={(e) => setForm((p) => ({ ...p, contacted_details: e.target.value }))}
          placeholder="Previous communication details (optional)"
        />
      </div>

      <textarea
        className="h-24 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
        value={form.extra_details}
        onChange={(e) => setForm((p) => ({ ...p, extra_details: e.target.value }))}
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
  );
}

