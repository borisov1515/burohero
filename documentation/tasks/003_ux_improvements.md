# Task 003: Generator UX Improvements (Context & Descriptions)

**Status:** Completed
**Priority:** Medium
**Target Files:** `src/app/[locale]/[category]/[company]/ui.tsx`, `messages/*.json`

## 1. Overview
The current generator pages are too generic ("Document generator") and lack context. Users are thrown directly into a form without knowing what they need.

We need to:
1.  **Dynamic Headers:** Display the specific Use Case Title and Description (reuse `home.cards` keys).
2.  **"What you need" Section:** Add a small checklist above the form so users can prepare their documents (Contract, ID, etc.).
3.  **Better Hints:** Add sub-labels to the Preview section to clarify which document is legal and which is for reference.

## 2. Technical Implementation (`ui.tsx`)

### 2.1 Configuration Mapping
Create a mapping object inside `ui.tsx` (or a separate config file) to link the URL parameters (`category`, `company`) to:
1.  The **Card Key** (for Title/Subtitle) from `home.cards`.
2.  The **Requirement Key** (for the checklist) from the new `generator.requirements` section.

```typescript
// Example mapping structure
const useCaseConfig: Record<string, { cardKey: string; reqKey: string }> = {
  "cancel": { cardKey: "cancel_contract", reqKey: "services" },
  "fianza": { cardKey: "deposit_return", reqKey: "housing" },
  "devolucion": { cardKey: "return_14_days", reqKey: "shopping" },
  "reparacion": { cardKey: "request_repairs", reqKey: "housing" },
  "rescision": { cardKey: "terminate_lease", reqKey: "housing" },
  "factura": { cardKey: "dispute_bill", reqKey: "services" },
  "garantia": { cardKey: "warranty_3_years", reqKey: "shopping" },
  "noentrega": { cardKey: "non_delivery", reqKey: "shopping" },
  "vuelo": { cardKey: "flight_delay", reqKey: "travel" },
  "seguro": { cardKey: "cancel_insurance", reqKey: "insurance" },
  "denegacion": { cardKey: "claim_denied", reqKey: "insurance" },
  "comisiones": { cardKey: "bank_fees_refund", reqKey: "services" },
  // Traffic needs logic based on company ('multa' vs 'venta')
  "trafico_multa": { cardKey: "traffic_fine_appeal", reqKey: "traffic" },
  "trafico_venta": { cardKey: "car_sale_notification", reqKey: "traffic" },
  // Work needs logic based on company
  "trabajo_salarios": { cardKey: "unpaid_wages", reqKey: "work" },
  "trabajo_baja": { cardKey: "voluntary_resignation", reqKey: "work" },
  "trabajo_vacaciones": { cardKey: "vacation_request", reqKey: "work" },
};
```

### 2.2 Component Updates
-   **Replace** `<h1 ...>{tGen("title")}</h1>` with the dynamic title from `useCaseConfig`.
-   **Add** the description text below the title.
-   **Insert** a new component `<RequirementsList items={tGen.raw("requirements." + reqKey)} />` above the form.

---

## 3. New Content & Translations

**Instructions:** Add the following `requirements` and `hints` sections to the `generator` namespace in each `messages/{locale}.json` file.

### 3.1 English (en.json)
```json
"generator": {
  "hints": {
    "spanishDoc": "This is the official legal document to send.",
    "translation": "This is for your understanding only."
  },
  "requirements": {
    "title": "What you need:",
    "housing": ["Rental contract details", "Landlord's address", "Dates (Start/End/Move-out)"],
    "services": ["Customer or Contract number", "Last bill or invoice", "Provider's address"],
    "shopping": ["Order confirmation or Invoice", "Purchase date", "Seller's details"],
    "travel": ["Flight number", "Booking reference", "Travel dates"],
    "insurance": ["Policy number", "Insurer's name", "Claim details (if any)"],
    "traffic": ["Fine notification (for appeals)", "Vehicle license plate", "Driver's license"],
    "work": ["Employment contract", "Company details", "Payroll/Payslip information"]
  },
  // ... existing keys ...
}
```

### 3.2 Spanish (es.json)
```json
"generator": {
  "hints": {
    "spanishDoc": "Este es el documento legal oficial para enviar.",
    "translation": "Esto es solo para su comprensión."
  },
  "requirements": {
    "title": "Lo que necesitas:",
    "housing": ["Detalles del contrato de alquiler", "Dirección del propietario", "Fechas (Inicio/Fin/Salida)"],
    "services": ["Número de cliente o contrato", "Última factura", "Dirección del proveedor"],
    "shopping": ["Confirmación de pedido o factura", "Fecha de compra", "Detalles del vendedor"],
    "travel": ["Número de vuelo", "Referencia de reserva", "Fechas de viaje"],
    "insurance": ["Número de póliza", "Nombre de la aseguradora", "Detalles del reclamo (si los hay)"],
    "traffic": ["Notificación de multa (para recursos)", "Matrícula del vehículo", "Permiso de conducir"],
    "work": ["Contrato de trabajo", "Detalles de la empresa", "Información de nómina"]
  },
  // ...
}
```

### 3.3 German (de.json)
```json
"generator": {
  "hints": {
    "spanishDoc": "Dies ist das offizielle Dokument zum Versenden.",
    "translation": "Dies dient nur zu Ihrem Verständnis."
  },
  "requirements": {
    "title": "Was Sie brauchen:",
    "housing": ["Mietvertragsdetails", "Adresse des Vermieters", "Daten (Beginn/Ende/Auszug)"],
    "services": ["Kunden- oder Vertragsnummer", "Letzte Rechnung", "Adresse des Anbieters"],
    "shopping": ["Bestellbestätigung oder Rechnung", "Kaufdatum", "Verkäuferdaten"],
    "travel": ["Flugnummer", "Buchungsnummer", "Reisedaten"],
    "insurance": ["Versicherungsnummer", "Name des Versicherers", "Schadensdetails (falls vorhanden)"],
    "traffic": ["Bußgeldbescheid (für Einsprüche)", "Kfz-Kennzeichen", "Führerschein"],
    "work": ["Arbeitsvertrag", "Firmendaten", "Gehaltsabrechnungen"]
  }
}
```

### 3.4 French (fr.json)
```json
"generator": {
  "hints": {
    "spanishDoc": "Ceci est le document officiel à envoyer.",
    "translation": "Ceci est pour votre compréhension uniquement."
  },
  "requirements": {
    "title": "Ce dont vous avez besoin :",
    "housing": ["Détails du bail", "Adresse du propriétaire", "Dates (Début/Fin/Départ)"],
    "services": ["Numéro de client ou de contrat", "Dernière facture", "Adresse du fournisseur"],
    "shopping": ["Confirmation de commande ou facture", "Date d'achat", "Détails du vendeur"],
    "travel": ["Numéro de vol", "Référence de réservation", "Dates de voyage"],
    "insurance": ["Numéro de police", "Nom de l'assureur", "Détails du sinistre"],
    "traffic": ["Avis de contravention", "Plaque d'immatriculation", "Permis de conduire"],
    "work": ["Contrat de travail", "Détails de l'entreprise", "Fiches de paie"]
  }
}
```

### 3.5 Italian (it.json)
```json
"generator": {
  "hints": {
    "spanishDoc": "Questo è il documento ufficiale da inviare.",
    "translation": "Questo è solo per tua comprensione."
  },
  "requirements": {
    "title": "Cosa ti serve:",
    "housing": ["Dettagli del contratto d'affitto", "Indirizzo del proprietario", "Date (Inizio/Fine/Uscita)"],
    "services": ["Numero cliente o contratto", "Ultima bolletta", "Indirizzo del fornitore"],
    "shopping": ["Conferma ordine o fattura", "Data di acquisto", "Dettagli del venditore"],
    "travel": ["Numero del volo", "Riferimento prenotazione", "Date del viaggio"],
    "insurance": ["Numero polizza", "Nome assicuratore", "Dettagli sinistro"],
    "traffic": ["Notifica multa", "Targa del veicolo", "Patente di guida"],
    "work": ["Contratto di lavoro", "Dettagli azienda", "Buste paga"]
  }
}
```

### 3.6 Dutch (nl.json)
```json
"generator": {
  "hints": {
    "spanishDoc": "Dit is het officiële document om te versturen.",
    "translation": "Dit is alleen voor uw begrip."
  },
  "requirements": {
    "title": "Wat u nodig heeft:",
    "housing": ["Huurcontract details", "Adres verhuurder", "Data (Start/Einde/Verhuizing)"],
    "services": ["Klant- of contractnummer", "Laatste rekening", "Adres aanbieder"],
    "shopping": ["Bestelbevestiging of factuur", "Aankoopdatum", "Gegevens verkoper"],
    "travel": ["Vluchtnummer", "Boekingsreferentie", "Reisdata"],
    "insurance": ["Polisnummer", "Naam verzekeraar", "Schadedetails"],
    "traffic": ["Boetebeschikking", "Kentekenplaat", "Rijbewijs"],
    "work": ["Arbeidsovereenkomst", "Bedrijfsgegevens", "Loonstroken"]
  }
}
```

### 3.7 Polish (pl.json)
```json
"generator": {
  "hints": {
    "spanishDoc": "To jest oficjalny dokument do wysłania.",
    "translation": "To służy tylko do Twojej wiadomości."
  },
  "requirements": {
    "title": "Czego potrzebujesz:",
    "housing": ["Szczegóły umowy najmu", "Adres wynajmującego", "Daty (Start/Koniec/Wyprowadzka)"],
    "services": ["Numer klienta lub umowy", "Ostatni rachunek", "Adres dostawcy"],
    "shopping": ["Potwierdzenie zamówienia lub faktura", "Data zakupu", "Dane sprzedawcy"],
    "travel": ["Numer lotu", "Numer rezerwacji", "Daty podróży"],
    "insurance": ["Numer polisy", "Nazwa ubezpieczyciela", "Szczegóły roszczenia"],
    "traffic": ["Powiadomienie o mandacie", "Numer rejestracyjny", "Prawo jazdy"],
    "work": ["Umowa o pracę", "Dane firmy", "Odcinki wypłaty"]
  }
}
```

### 3.8 Romanian (ro.json)
```json
"generator": {
  "hints": {
    "spanishDoc": "Acesta este documentul oficial de trimis.",
    "translation": "Acesta este doar pentru informarea dvs."
  },
  "requirements": {
    "title": "De ce aveți nevoie:",
    "housing": ["Detalii contract închiriere", "Adresa proprietarului", "Date (Început/Sfârșit/Mutare)"],
    "services": ["Număr client sau contract", "Ultima factură", "Adresa furnizorului"],
    "shopping": ["Confirmare comandă sau factură", "Data achiziției", "Detalii vânzător"],
    "travel": ["Număr zbor", "Referință rezervare", "Date călătorie"],
    "insurance": ["Număr poliță", "Nume asigurător", "Detalii daună"],
    "traffic": ["Notificare amendă", "Număr de înmatriculare", "Permis de conducere"],
    "work": ["Contract de muncă", "Detalii companie", "Fluturași de salariu"]
  }
}
```

### 3.9 Swedish (sv.json)
```json
"generator": {
  "hints": {
    "spanishDoc": "Detta är det officiella dokumentet att skicka.",
    "translation": "Detta är endast för din förståelse."
  },
  "requirements": {
    "title": "Vad du behöver:",
    "housing": ["Hyreskontrakt", "Hyresvärdens adress", "Datum (Start/Slut/Flytt)"],
    "services": ["Kund- eller kontraktsnummer", "Senaste fakturan", "Leverantörens adress"],
    "shopping": ["Orderbekräftelse eller faktura", "Köpdatum", "Säljarens uppgifter"],
    "travel": ["Flygnummer", "Bokningsreferens", "Resedatum"],
    "insurance": ["Försäkringsnummer", "Försäkringsbolagets namn", "Skadeuppgifter"],
    "traffic": ["Bötesavi", "Registreringsnummer", "Körkort"],
    "work": ["Anställningsavtal", "Företagsuppgifter", "Lönespecifikationer"]
  }
}
```

### 3.10 Ukrainian (uk.json)
```json
"generator": {
  "hints": {
    "spanishDoc": "Це офіційний документ для відправки.",
    "translation": "Це лише для вашого ознайомлення."
  },
  "requirements": {
    "title": "Що вам знадобиться:",
    "housing": ["Деталі договору оренди", "Адреса орендодавця", "Дати (Початок/Кінець/Виїзд)"],
    "services": ["Номер клієнта або договору", "Остання квитанція/рахунок", "Адреса провайдера"],
    "shopping": ["Підтвердження замовлення або чек", "Дата покупки", "Дані продавця"],
    "travel": ["Номер рейсу", "Код бронювання", "Дати подорожі"],
    "insurance": ["Номер полісу", "Назва страхової", "Деталі страхового випадку"],
    "traffic": ["Повідомлення про штраф", "Номерний знак авто", "Водійське посвідчення"],
    "work": ["Трудовий договір", "Дані компанії", "Інформація про зарплату"]
  }
}
```
