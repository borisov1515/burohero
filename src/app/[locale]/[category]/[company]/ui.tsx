"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
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
import {
  LeaseTerminationFormSection,
  buildLeaseTerminationFacts,
  defaultLeaseTerminationForm,
  type LeaseTerminationForm,
} from "./usecases/leaseTermination";
import {
  BillComplaintFormSection,
  buildBillComplaintFacts,
  defaultBillComplaintForm,
  type BillComplaintForm,
} from "./usecases/billComplaint";
import {
  Warranty3yFormSection,
  buildWarranty3yFacts,
  defaultWarranty3yForm,
  type Warranty3yForm,
} from "./usecases/warranty3y";
import {
  NonDeliveryFormSection,
  buildNonDeliveryFacts,
  defaultNonDeliveryForm,
  type NonDeliveryForm,
} from "./usecases/nonDelivery";
import {
  FlightDelayFormSection,
  buildFlightDelayFacts,
  defaultFlightDelayForm,
  type FlightDelayForm,
} from "./usecases/flightDelay";
import {
  InsuranceCancelFormSection,
  buildInsuranceCancelFacts,
  defaultInsuranceCancelForm,
  type InsuranceCancelForm,
} from "./usecases/insuranceCancel";
import {
  ClaimDeniedFormSection,
  buildClaimDeniedFacts,
  defaultClaimDeniedForm,
  type ClaimDeniedForm,
} from "./usecases/claimDenied";
import {
  FeesRefundFormSection,
  buildFeesRefundFacts,
  defaultFeesRefundForm,
  type FeesRefundForm,
} from "./usecases/feesRefund";
import {
  TrafficFineAppealFormSection,
  buildTrafficFineAppealFacts,
  defaultTrafficFineAppealForm,
  type TrafficFineAppealForm,
} from "./usecases/trafficFineAppeal";
import {
  CarSaleNotificationFormSection,
  buildCarSaleNotificationFacts,
  defaultCarSaleNotificationForm,
  type CarSaleNotificationForm,
} from "./usecases/carSaleNotification";
import {
  UnpaidWagesFormSection,
  buildUnpaidWagesFacts,
  defaultUnpaidWagesForm,
  type UnpaidWagesForm,
} from "./usecases/unpaidWages";
import {
  VoluntaryResignationFormSection,
  buildVoluntaryResignationFacts,
  defaultVoluntaryResignationForm,
  type VoluntaryResignationForm,
} from "./usecases/voluntaryResignation";
import {
  VacationRequestFormSection,
  buildVacationRequestFacts,
  defaultVacationRequestForm,
  type VacationRequestForm,
} from "./usecases/vacationRequest";

type Props = {
  locale: AppLocale;
  category: string;
  company: string;
};

const useCaseConfig: Record<string, { cardKey: string; reqKey: string }> = {
  cancel: { cardKey: "cancel_contract", reqKey: "services" },
  fianza: { cardKey: "deposit_return", reqKey: "housing" },
  devolucion: { cardKey: "return_14_days", reqKey: "shopping" },
  reparacion: { cardKey: "request_repairs", reqKey: "housing" },
  rescicion: { cardKey: "terminate_lease", reqKey: "housing" },
  factura: { cardKey: "dispute_bill", reqKey: "services" },
  garantia: { cardKey: "warranty_3_years", reqKey: "shopping" },
  noentrega: { cardKey: "non_delivery", reqKey: "shopping" },
  vuelo: { cardKey: "flight_delay", reqKey: "travel" },
  seguro: { cardKey: "cancel_insurance", reqKey: "insurance" },
  denegacion: { cardKey: "claim_denied", reqKey: "insurance" },
  comisiones: { cardKey: "bank_fees_refund", reqKey: "services" },
  trafico_multa: { cardKey: "traffic_fine_appeal", reqKey: "traffic" },
  trafico_venta: { cardKey: "car_sale_notification", reqKey: "traffic" },
  trabajo_salarios: { cardKey: "unpaid_wages", reqKey: "work" },
  trabajo_baja: { cardKey: "voluntary_resignation", reqKey: "work" },
  trabajo_vacaciones: { cardKey: "vacation_request", reqKey: "work" },
};

function RequirementsList({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="mt-3 grid gap-2 text-sm text-[#475569]">
      {items.map((it, idx) => (
        <li key={`${idx}-${it}`} className="flex items-start gap-2">
          <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#1E40AF]" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export default function GeneratorClient({ locale, category, company }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tApp = useTranslations("app");
  const tGen = useTranslations("generator");
  const tHome = useTranslations("home");
  const [mobileTab, setMobileTab] = useState<"document" | "translation">("translation");
  const [facts, setFacts] = useState("");
  const [cancelForm, setCancelForm] = useState<CancelTelcoForm>(defaultCancelTelcoForm);
  const [depositForm, setDepositForm] = useState<DepositReturnForm>(
    defaultDepositReturnForm,
  );
  const [return14Form, setReturn14Form] = useState<Return14Form>(defaultReturn14Form);
  const [repairForm, setRepairForm] = useState<RepairDemandForm>(defaultRepairDemandForm);
  const [leaseTerminationForm, setLeaseTerminationForm] = useState<LeaseTerminationForm>(
    defaultLeaseTerminationForm,
  );
  const [billComplaintForm, setBillComplaintForm] = useState<BillComplaintForm>(
    defaultBillComplaintForm,
  );
  const [warranty3yForm, setWarranty3yForm] = useState<Warranty3yForm>(defaultWarranty3yForm);
  const [nonDeliveryForm, setNonDeliveryForm] = useState<NonDeliveryForm>(defaultNonDeliveryForm);
  const [flightDelayForm, setFlightDelayForm] = useState<FlightDelayForm>(defaultFlightDelayForm);
  const [insuranceCancelForm, setInsuranceCancelForm] = useState<InsuranceCancelForm>(
    defaultInsuranceCancelForm,
  );
  const [claimDeniedForm, setClaimDeniedForm] = useState<ClaimDeniedForm>(defaultClaimDeniedForm);
  const [feesRefundForm, setFeesRefundForm] = useState<FeesRefundForm>(defaultFeesRefundForm);
  const [trafficFineAppealForm, setTrafficFineAppealForm] = useState<TrafficFineAppealForm>(
    defaultTrafficFineAppealForm,
  );
  const [carSaleNotificationForm, setCarSaleNotificationForm] = useState<CarSaleNotificationForm>(
    defaultCarSaleNotificationForm,
  );
  const [unpaidWagesForm, setUnpaidWagesForm] = useState<UnpaidWagesForm>(defaultUnpaidWagesForm);
  const [voluntaryResignationForm, setVoluntaryResignationForm] = useState<VoluntaryResignationForm>(
    defaultVoluntaryResignationForm,
  );
  const [vacationRequestForm, setVacationRequestForm] = useState<VacationRequestForm>(
    defaultVacationRequestForm,
  );
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
    if (category === "rescision") return buildLeaseTerminationFacts(leaseTerminationForm);
    if (category === "factura") return buildBillComplaintFacts(billComplaintForm, company);
    if (category === "garantia") return buildWarranty3yFacts(warranty3yForm, company);
    if (category === "noentrega") return buildNonDeliveryFacts(nonDeliveryForm, company);
    if (category === "vuelo") return buildFlightDelayFacts(flightDelayForm, company);
    if (category === "seguro") return buildInsuranceCancelFacts(insuranceCancelForm, company);
    if (category === "denegacion") return buildClaimDeniedFacts(claimDeniedForm, company);
    if (category === "comisiones") return buildFeesRefundFacts(feesRefundForm, company);
    if (category === "trafico" && company === "multa")
      return buildTrafficFineAppealFacts(trafficFineAppealForm);
    if (category === "trafico" && company === "venta")
      return buildCarSaleNotificationFacts(carSaleNotificationForm);
    if (category === "trabajo" && company === "salarios") return buildUnpaidWagesFacts(unpaidWagesForm);
    if (category === "trabajo" && company === "baja")
      return buildVoluntaryResignationFacts(voluntaryResignationForm);
    if (category === "trabajo" && company === "vacaciones")
      return buildVacationRequestFacts(vacationRequestForm);
    return facts;
  }, [
    category,
    cancelForm,
    company,
    depositForm,
    facts,
    return14Form,
    repairForm,
    leaseTerminationForm,
    billComplaintForm,
    warranty3yForm,
    nonDeliveryForm,
    flightDelayForm,
    insuranceCancelForm,
    claimDeniedForm,
    feesRefundForm,
    trafficFineAppealForm,
    carSaleNotificationForm,
    unpaidWagesForm,
    voluntaryResignationForm,
    vacationRequestForm,
  ]);

  const canGenerate = useMemo(() => builtFacts.trim().length >= 10, [builtFacts]);

  const configKey =
    category === "trafico" || category === "trabajo" ? `${category}_${company}` : category;
  const config = useCaseConfig[configKey];
  const useCaseTitle = config ? tHome(`cards.${config.cardKey}.title`) : tGen("title");
  const useCaseDesc = config ? tHome(`cards.${config.cardKey}.desc`) : "";
  const reqItems = (() => {
    if (!config) return [] as string[];
    const raw = tGen.raw(`requirements.${config.reqKey}`);
    return Array.isArray(raw) ? (raw as string[]) : [];
  })();

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
        if (!res.ok) {
          const msg =
            json?.errorCode === "INVALID_ORDER_ID"
              ? tGen("errors.invalidOrderId")
              : json?.errorCode === "ORDER_NOT_FOUND"
                ? tGen("errors.orderNotFound")
                : tGen("errors.failedToLoadOrder");
          throw new Error(msg);
        }

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
        } else if (category === "rescision" && snap.form) {
          const f = snap.form as Partial<LeaseTerminationForm>;
          setLeaseTerminationForm((prev) => ({
            ...prev,
            ...Object.fromEntries(
              Object.entries(f).map(([k, v]) => [k, String(v ?? "")]),
            ),
          }));
        } else if (category === "rescision") {
          setLeaseTerminationForm((prev) => ({ ...prev, extra_details: String(snap.facts ?? "") }));
        } else if (category === "factura" && snap.form) {
          const f = snap.form as Partial<BillComplaintForm>;
          setBillComplaintForm((prev) => ({
            ...prev,
            ...Object.fromEntries(
              Object.entries(f).map(([k, v]) => [k, String(v ?? "")]),
            ),
            contacted_before:
              f.contacted_before === "yes" || f.contacted_before === "no" ? f.contacted_before : "",
            payment_status:
              f.payment_status === "paid" || f.payment_status === "unpaid" || f.payment_status === "partially_paid"
                ? f.payment_status
                : "",
            issue_type:
              f.issue_type === "overcharge" ||
              f.issue_type === "wrong_reading" ||
              f.issue_type === "duplicate" ||
              f.issue_type === "service_not_provided" ||
              f.issue_type === "other"
                ? f.issue_type
                : "",
          }));
        } else if (category === "factura") {
          setBillComplaintForm((prev) => ({ ...prev, extra_details: String(snap.facts ?? "") }));
        } else if (category === "garantia" && snap.form) {
          const f = snap.form as Partial<Warranty3yForm>;
          setWarranty3yForm((prev) => ({
            ...prev,
            ...Object.fromEntries(
              Object.entries(f).map(([k, v]) => [k, String(v ?? "")]),
            ),
            contacted_support_before:
              f.contacted_support_before === "yes" || f.contacted_support_before === "no"
                ? f.contacted_support_before
                : "",
            requested_solution:
              f.requested_solution === "repair" ||
              f.requested_solution === "replacement" ||
              f.requested_solution === "refund" ||
              f.requested_solution === "price_reduction"
                ? f.requested_solution
                : "",
          }));
        } else if (category === "garantia") {
          setWarranty3yForm((prev) => ({ ...prev, extra_details: String(snap.facts ?? "") }));
        } else if (category === "noentrega" && snap.form) {
          const f = snap.form as Partial<NonDeliveryForm>;
          setNonDeliveryForm((prev) => ({
            ...prev,
            ...Object.fromEntries(
              Object.entries(f).map(([k, v]) => [k, String(v ?? "")]),
            ),
            contacted_seller_before:
              f.contacted_seller_before === "yes" || f.contacted_seller_before === "no"
                ? f.contacted_seller_before
                : "",
            delivery_status:
              f.delivery_status === "not_delivered" ||
              f.delivery_status === "lost" ||
              f.delivery_status === "delivered_but_not_received"
                ? f.delivery_status
                : "",
            desired_outcome:
              f.desired_outcome === "deliver" ||
              f.desired_outcome === "refund" ||
              f.desired_outcome === "replacement"
                ? f.desired_outcome
                : "",
          }));
        } else if (category === "noentrega") {
          setNonDeliveryForm((prev) => ({ ...prev, extra_details: String(snap.facts ?? "") }));
        } else if (category === "vuelo" && snap.form) {
          const f = snap.form as Partial<FlightDelayForm>;
          setFlightDelayForm((prev) => ({
            ...prev,
            ...Object.fromEntries(
              Object.entries(f).map(([k, v]) => [k, String(v ?? "")]),
            ),
            contacted_airline_before:
              f.contacted_airline_before === "yes" || f.contacted_airline_before === "no"
                ? f.contacted_airline_before
                : "",
          }));
        } else if (category === "vuelo") {
          setFlightDelayForm((prev) => ({ ...prev, extra_details: String(snap.facts ?? "") }));
        } else if (category === "seguro" && snap.form) {
          const f = snap.form as Partial<InsuranceCancelForm>;
          setInsuranceCancelForm((prev) => ({
            ...prev,
            ...Object.fromEntries(
              Object.entries(f).map(([k, v]) => [k, String(v ?? "")]),
            ),
          }));
        } else if (category === "seguro") {
          setInsuranceCancelForm((prev) => ({ ...prev, extra_details: String(snap.facts ?? "") }));
        } else if (category === "denegacion" && snap.form) {
          const f = snap.form as Partial<ClaimDeniedForm>;
          setClaimDeniedForm((prev) => ({
            ...prev,
            ...Object.fromEntries(
              Object.entries(f).map(([k, v]) => [k, String(v ?? "")]),
            ),
            contacted_before:
              f.contacted_before === "yes" || f.contacted_before === "no" ? f.contacted_before : "",
          }));
        } else if (category === "denegacion") {
          setClaimDeniedForm((prev) => ({ ...prev, extra_details: String(snap.facts ?? "") }));
        } else if (category === "comisiones" && snap.form) {
          const f = snap.form as Partial<FeesRefundForm>;
          setFeesRefundForm((prev) => ({
            ...prev,
            ...Object.fromEntries(
              Object.entries(f).map(([k, v]) => [k, String(v ?? "")]),
            ),
            contacted_before:
              f.contacted_before === "yes" || f.contacted_before === "no" ? f.contacted_before : "",
            product_type:
              f.product_type === "account" ||
              f.product_type === "card" ||
              f.product_type === "mortgage" ||
              f.product_type === "loan" ||
              f.product_type === "other"
                ? f.product_type
                : "",
            fee_type:
              f.fee_type === "maintenance" ||
              f.fee_type === "card" ||
              f.fee_type === "overdraft" ||
              f.fee_type === "transfer" ||
              f.fee_type === "opening" ||
              f.fee_type === "other"
                ? f.fee_type
                : "",
          }));
        } else if (category === "comisiones") {
          setFeesRefundForm((prev) => ({ ...prev, extra_details: String(snap.facts ?? "") }));
        } else if (category === "trafico" && company === "multa" && snap.form) {
          const f = snap.form as Partial<TrafficFineAppealForm>;
          setTrafficFineAppealForm((prev) => ({
            ...prev,
            ...Object.fromEntries(Object.entries(f).map(([k, v]) => [k, String(v ?? "")])),
            appeal_reason:
              f.appeal_reason === "no_notification" ||
              f.appeal_reason === "not_driver" ||
              f.appeal_reason === "no_evidence" ||
              f.appeal_reason === "incorrect_data"
                ? f.appeal_reason
                : "",
          }));
        } else if (category === "trafico" && company === "multa") {
          setTrafficFineAppealForm((prev) => ({ ...prev, additional_details: String(snap.facts ?? "") }));
        } else if (category === "trafico" && company === "venta" && snap.form) {
          const f = snap.form as Partial<CarSaleNotificationForm>;
          setCarSaleNotificationForm((prev) => ({
            ...prev,
            ...Object.fromEntries(Object.entries(f).map(([k, v]) => [k, String(v ?? "")])),
          }));
        } else if (category === "trafico" && company === "venta") {
          setCarSaleNotificationForm((prev) => ({ ...prev, additional_details: String(snap.facts ?? "") }));
        } else if (category === "trabajo" && company === "salarios" && snap.form) {
          const f = snap.form as Partial<UnpaidWagesForm>;
          setUnpaidWagesForm((prev) => ({
            ...prev,
            ...Object.fromEntries(Object.entries(f).map(([k, v]) => [k, String(v ?? "")])),
            contract_type:
              f.contract_type === "indefinido" || f.contract_type === "temporal" || f.contract_type === "sin_contrato"
                ? f.contract_type
                : "",
          }));
        } else if (category === "trabajo" && company === "salarios") {
          setUnpaidWagesForm((prev) => ({ ...prev, additional_details: String(snap.facts ?? "") }));
        } else if (category === "trabajo" && company === "baja" && snap.form) {
          const f = snap.form as Partial<VoluntaryResignationForm>;
          setVoluntaryResignationForm((prev) => ({
            ...prev,
            ...Object.fromEntries(Object.entries(f).map(([k, v]) => [k, String(v ?? "")])),
            notice_given:
              f.notice_given === "15_days" || f.notice_given === "per_contract" || f.notice_given === "immediate"
                ? f.notice_given
                : "",
            request_settlement: f.request_settlement === "yes" || f.request_settlement === "no" ? f.request_settlement : "yes",
          }));
        } else if (category === "trabajo" && company === "baja") {
          setVoluntaryResignationForm((prev) => ({ ...prev, additional_details: String(snap.facts ?? "") }));
        } else if (category === "trabajo" && company === "vacaciones" && snap.form) {
          const f = snap.form as Partial<VacationRequestForm>;
          setVacationRequestForm((prev) => ({
            ...prev,
            ...Object.fromEntries(Object.entries(f).map(([k, v]) => [k, String(v ?? "")])),
          }));
        } else if (category === "trabajo" && company === "vacaciones") {
          setVacationRequestForm((prev) => ({ ...prev, additional_details: String(snap.facts ?? "") }));
        }
        setEs(String(snap.spanish_legal_text ?? ""));
        setNative(String(snap.native_user_translation ?? ""));
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : tGen("errors.unknown"));
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
                : category === "rescision"
                  ? {
                      locale,
                      category,
                      company,
                      form: leaseTerminationForm,
                      facts: builtFacts,
                    }
                  : category === "factura"
                    ? {
                        locale,
                        category,
                        company,
                        form: billComplaintForm,
                        facts: builtFacts,
                      }
                    : category === "garantia"
                      ? {
                          locale,
                          category,
                          company,
                          form: warranty3yForm,
                          facts: builtFacts,
                        }
                      : category === "noentrega"
                        ? {
                            locale,
                            category,
                            company,
                            form: nonDeliveryForm,
                            facts: builtFacts,
                          }
                        : category === "vuelo"
                          ? {
                              locale,
                              category,
                              company,
                              form: flightDelayForm,
                              facts: builtFacts,
                            }
                          : category === "seguro"
                            ? {
                                locale,
                                category,
                                company,
                                form: insuranceCancelForm,
                                facts: builtFacts,
                              }
                            : category === "denegacion"
                              ? {
                                  locale,
                                  category,
                                  company,
                                  form: claimDeniedForm,
                                  facts: builtFacts,
                                }
                              : category === "comisiones"
                                ? {
                                    locale,
                                    category,
                                    company,
                                    form: feesRefundForm,
                                    facts: builtFacts,
                                  }
                                : category === "trafico" && company === "multa"
                                  ? {
                                      locale,
                                      category,
                                      company,
                                      form: trafficFineAppealForm,
                                      facts: builtFacts,
                                    }
                                  : category === "trafico" && company === "venta"
                                    ? {
                                        locale,
                                        category,
                                        company,
                                        form: carSaleNotificationForm,
                                        facts: builtFacts,
                                      }
                                    : category === "trabajo" && company === "salarios"
                                      ? {
                                          locale,
                                          category,
                                          company,
                                          form: unpaidWagesForm,
                                          facts: builtFacts,
                                        }
                                      : category === "trabajo" && company === "baja"
                                        ? {
                                            locale,
                                            category,
                                            company,
                                            form: voluntaryResignationForm,
                                            facts: builtFacts,
                                          }
                                        : category === "trabajo" && company === "vacaciones"
                                          ? {
                                              locale,
                                              category,
                                              company,
                                              form: vacationRequestForm,
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
      if (!res.ok) {
        const msg =
          json?.errorCode === "RATE_LIMIT_EXCEEDED"
            ? tGen("errors.rateLimitExceeded")
            : json?.errorCode === "FORM_VALIDATION_ERROR"
              ? tGen("errors.invalidForm")
              : json?.errorCode === "INVALID_REQUEST"
                ? tGen("errors.invalidRequest")
                : json?.errorCode === "FACTS_REQUIRED"
                  ? tGen("errors.factsRequired")
                  : tGen("errors.generateFailed");
        throw new Error(msg);
      }

      setOrderId(json.orderId);
      setIsPaid(false);
      setEs(json.spanish_legal_text);
      setNative(json.native_user_translation);
    } catch (e) {
      setError(e instanceof Error ? e.message : tGen("errors.unknown"));
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
      if (!res.ok) {
        const msg =
          json?.errorCode === "MOCK_PAYMENTS_DISABLED"
            ? tGen("errors.mockPaymentsDisabled")
            : json?.errorCode === "INVALID_ORDER_ID"
              ? tGen("errors.invalidOrderId")
              : json?.errorCode === "ORDER_NOT_FOUND"
                ? tGen("errors.orderNotFound")
                : tGen("errors.mockPayFailed");
        throw new Error(msg);
      }
      setIsPaid(true);
      router.push(`/${locale}/checkout/result?orderId=${encodeURIComponent(orderId)}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : tGen("errors.unknown"));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
      <header className="flex flex-col gap-2">
        <div className="text-sm text-[#64748B]">
          {locale} / {category} / {company}
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">{useCaseTitle}</h1>
        {useCaseDesc ? <p className="text-sm text-[#475569]">{useCaseDesc}</p> : null}
      </header>

      <section className="rounded-2xl border border-[#DCE6FF] bg-white p-6 shadow-sm">
        {reqItems.length ? (
          <div className="mb-6 rounded-2xl border border-[#DCE6FF] bg-[#F5F8FF] p-5">
            <div className="text-sm font-semibold text-[#0F172A]">
              {tGen("requirements.title")}
            </div>
            <RequirementsList items={reqItems} />
          </div>
        ) : null}

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
        ) : category === "rescision" ? (
          <LeaseTerminationFormSection
            form={leaseTerminationForm}
            setForm={(u) => setLeaseTerminationForm(u)}
            builtFacts={builtFacts}
          />
        ) : category === "factura" ? (
          <BillComplaintFormSection
            form={billComplaintForm}
            setForm={(u) => setBillComplaintForm(u)}
            builtFacts={builtFacts}
          />
        ) : category === "garantia" ? (
          <Warranty3yFormSection
            form={warranty3yForm}
            setForm={(u) => setWarranty3yForm(u)}
            builtFacts={builtFacts}
          />
        ) : category === "noentrega" ? (
          <NonDeliveryFormSection
            form={nonDeliveryForm}
            setForm={(u) => setNonDeliveryForm(u)}
            builtFacts={builtFacts}
          />
        ) : category === "vuelo" ? (
          <FlightDelayFormSection
            form={flightDelayForm}
            setForm={(u) => setFlightDelayForm(u)}
            builtFacts={builtFacts}
          />
        ) : category === "seguro" ? (
          <InsuranceCancelFormSection
            form={insuranceCancelForm}
            setForm={(u) => setInsuranceCancelForm(u)}
            builtFacts={builtFacts}
          />
        ) : category === "denegacion" ? (
          <ClaimDeniedFormSection
            form={claimDeniedForm}
            setForm={(u) => setClaimDeniedForm(u)}
            builtFacts={builtFacts}
          />
        ) : category === "comisiones" ? (
          <FeesRefundFormSection
            form={feesRefundForm}
            setForm={(u) => setFeesRefundForm(u)}
            builtFacts={builtFacts}
          />
        ) : category === "trafico" && company === "multa" ? (
          <TrafficFineAppealFormSection
            form={trafficFineAppealForm}
            setForm={(u) => setTrafficFineAppealForm(u)}
            builtFacts={builtFacts}
          />
        ) : category === "trafico" && company === "venta" ? (
          <CarSaleNotificationFormSection
            form={carSaleNotificationForm}
            setForm={(u) => setCarSaleNotificationForm(u)}
            builtFacts={builtFacts}
          />
        ) : category === "trabajo" && company === "salarios" ? (
          <UnpaidWagesFormSection
            form={unpaidWagesForm}
            setForm={(u) => setUnpaidWagesForm(u)}
            builtFacts={builtFacts}
          />
        ) : category === "trabajo" && company === "baja" ? (
          <VoluntaryResignationFormSection
            form={voluntaryResignationForm}
            setForm={(u) => setVoluntaryResignationForm(u)}
            builtFacts={builtFacts}
          />
        ) : category === "trabajo" && company === "vacaciones" ? (
          <VacationRequestFormSection
            form={vacationRequestForm}
            setForm={(u) => setVacationRequestForm(u)}
            builtFacts={builtFacts}
          />
        ) : (
          <>
            <label className="text-sm font-medium">{tGen("fallbackFacts.label")}</label>
            <textarea
              className="mt-2 h-40 w-full resize-y rounded-xl border border-[#DCE6FF] bg-white p-3 text-sm outline-none placeholder:text-[#94A3B8] focus:ring-2 focus:ring-[#1D4ED8]/15"
              value={facts}
              onChange={(e) => setFacts(e.target.value)}
              placeholder={tGen("fallbackFacts.placeholder")}
            />
          </>
        )}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#1E40AF] px-5 text-sm font-medium text-white hover:bg-[#1E3A8A] disabled:opacity-50"
            disabled={!canGenerate || isLoading}
            onClick={onGenerate}
          >
            {isLoading ? tGen("actions.working") : tGen("actions.generate")}
          </button>

          <button
            className="inline-flex h-11 items-center justify-center rounded-xl border border-[#DCE6FF] bg-white px-5 text-sm font-medium text-[#0F172A] hover:border-[#BFD2FF] disabled:opacity-50"
            disabled={!orderId || isLoading}
            onClick={onMockPay}
          >
            {tGen("actions.unlockMockPay")}
          </button>

          {orderId ? (
            <div className="text-xs text-[#64748B]">
              {tGen("labels.order")}: <span className="font-mono">{orderId}</span>
            </div>
          ) : null}
        </div>

        {error ? (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <details className="mt-4 rounded-xl border border-[#DCE6FF] p-4 text-sm">
          <summary className="cursor-pointer select-none font-medium">
            {tGen("debug.lastApi")}
          </summary>
          <div className="mt-3 grid gap-3">
            <div>
              <div className="text-xs font-medium text-[#64748B]">
                {tGen("debug.request")}
              </div>
              <pre className="mt-1 whitespace-pre-wrap rounded-lg bg-[#F5F8FF] p-3 text-xs text-[#0F172A]">
                {debugLastRequest ? JSON.stringify(debugLastRequest, null, 2) : "—"}
              </pre>
            </div>
            <div>
              <div className="text-xs font-medium text-[#64748B]">
                {tGen("debug.response")}
              </div>
              <pre className="mt-1 whitespace-pre-wrap rounded-lg bg-[#F5F8FF] p-3 text-xs text-[#0F172A]">
                {debugLastResponse ? JSON.stringify(debugLastResponse, null, 2) : "—"}
              </pre>
            </div>
          </div>
        </details>
      </section>

      {/* Desktop: dual pane */}
      <section className="hidden gap-4 lg:grid lg:grid-cols-2">
        <div className="rounded-2xl border border-[#DCE6FF] bg-white p-6 shadow-sm">
          <div className="mb-3 text-sm font-medium">{tGen("labels.spanishDoc")}</div>
          <div className="-mt-2 mb-3 text-xs text-[#64748B]">{tGen("hints.spanishDoc")}</div>
          <div
            className={[
              "whitespace-pre-wrap text-sm leading-6",
              !es ? "opacity-60" : "",
              !isPaid && es ? "blur-sm select-none" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {es || tGen("states.previewDoc")}
          </div>
        </div>

        <div className="rounded-2xl border border-[#DCE6FF] bg-white p-6 shadow-sm">
          <div className="mb-3 text-sm font-medium">{tGen("labels.translation")}</div>
          <div className="-mt-2 mb-3 text-xs text-[#64748B]">{tGen("hints.translation")}</div>
          <div className="whitespace-pre-wrap text-sm leading-6">
            {native || tGen("states.previewTranslation")}
          </div>
        </div>
      </section>

      {/* Mobile: tabs */}
      <section className="grid gap-4 lg:hidden">
        <div className="flex w-full items-center gap-2 rounded-xl border border-[#DCE6FF] bg-white p-2 shadow-sm">
          <button
            type="button"
            className={[
              "flex-1 rounded-lg px-3 py-2 text-sm font-medium",
              mobileTab === "document"
                ? "bg-[#1E40AF] text-white"
                : "text-[#475569]",
            ].join(" ")}
            onClick={() => setMobileTab("document")}
          >
            {tApp("tabs.document")}
          </button>
          <button
            type="button"
            className={[
              "flex-1 rounded-lg px-3 py-2 text-sm font-medium",
              mobileTab === "translation"
                ? "bg-[#1E40AF] text-white"
                : "text-[#475569]",
            ].join(" ")}
            onClick={() => setMobileTab("translation")}
          >
            {tApp("tabs.translation")}
          </button>
        </div>

        {mobileTab === "document" ? (
          <div className="rounded-2xl border border-[#DCE6FF] bg-white p-6 shadow-sm">
            <div className="mb-3 text-sm font-medium">{tGen("labels.spanishDoc")}</div>
            <div className="-mt-2 mb-3 text-xs text-[#64748B]">{tGen("hints.spanishDoc")}</div>
            <div
              className={[
                "whitespace-pre-wrap text-sm leading-6",
                !es ? "opacity-60" : "",
                !isPaid && es ? "blur-sm select-none" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {es || tGen("states.previewDoc")}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-[#DCE6FF] bg-white p-6 shadow-sm">
            <div className="mb-3 text-sm font-medium">{tGen("labels.translation")}</div>
            <div className="-mt-2 mb-3 text-xs text-[#64748B]">{tGen("hints.translation")}</div>
            <div className="whitespace-pre-wrap text-sm leading-6">
              {native || tGen("states.previewTranslation")}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

