# Task 002: Content Verification & Translation Audit

**Status:** Completed
**Priority:** High
**Target Files:** `messages/*.json`, `public/fonts/`, `src/app/[locale]/privacy/page.tsx`, `src/app/[locale]/terms/page.tsx`

## 1. Audit Results

### 1.1 Functional Translations (UI & Generators)
- **Status:** ✅ Complete
- **Details:** All 17 use cases (including Batch 2: Traffic & Work) are correctly translated across all 10 languages. Keys `home.cards` and `home.steps` are present.

### 1.2 Legal Content (Privacy & Terms)
- **Status:** ❌ Missing / Placeholders
- **Details:** The keys `home.legal.privacyBody` and `home.legal.termsBody` currently contain placeholder text (e.g., "Privacy Policy content here...") in all language files.
- **Action:** Full legal text needs to be injected (see Section 3 below).

### 1.3 Assets (Fonts)
- **Status:** ❌ Missing
- **Details:** The PDF generator (`CheckoutDownloads.tsx`) looks for `/fonts/NotoSans-Regular.ttf` to support Cyrillic characters (Ukrainian, Russian, Bulgarian). This file is missing in `public/fonts/`.
- **Impact:** PDFs generated in Ukrainian or referencing Russian names will likely show garbled text (tofus) or fallback to Times New Roman which may look inconsistent.

### 1.4 Rendering Logic
- **Issue:** The current `PrivacyPage` and `TermsPage` render text inside a single `<p>` tag without whitespace handling.
- **Fix:** We must add `whitespace-pre-line` to the class list to ensure the paragraphs in the legal text are preserved.

---

## 2. Implementation Tasks

### 2.1 Fix Text Rendering
**Target:** `src/app/[locale]/privacy/page.tsx` AND `src/app/[locale]/terms/page.tsx`
**Change:** Add `whitespace-pre-line` to the `<p>` className.
```tsx
// Before
<p className="mt-4 text-sm leading-7 text-[#475569]">
// After
<p className="mt-4 text-sm leading-7 text-[#475569] whitespace-pre-line">
```

### 2.2 Add Font Asset
**Target:** `public/fonts/NotoSans-Regular.ttf`
**Action:** Download `NotoSans-Regular.ttf` (Google Fonts) and save it to `public/fonts/`.

---

## 3. Missing Content & Translations (Legal)

**Instructions:** Update the `home.legal` section in each `messages/{locale}.json` file with the content below.

### 3.1 English (en.json)
```json
"legal": {
  "privacyTitle": "Privacy Policy",
  "privacyBody": "Last Updated: December 2025\n\n1. Introduction\nBuroHero ('we', 'us') respects your privacy. This policy explains how we handle your data when you use our document generation service.\n\n2. Data Collection\nWe collect information you provide directly: form answers (for document generation), email address (for delivery), and payment details (processed securely by our payment provider).\n\n3. Use of Data\nWe use your data solely to:\n- Generate the legal documents you request.\n- Send you the PDF files via email.\n- Improve our service functionality.\n\n4. Data Sharing\nWe do not sell your personal data. We share data only with necessary service providers (e.g., payment processors, email delivery services) who are bound by confidentiality.\n\n5. Your Rights\nUnder GDPR, you have the right to access, correct, or delete your personal data. Contact us at support@burohero.com for requests.",
  "termsTitle": "Terms of Service",
  "termsBody": "Last Updated: December 2025\n\n1. Service Description\nBuroHero provides an automated tool for generating simplified legal documents and translations. We are a technology provider, not a law firm.\n\n2. No Legal Advice\nThe documents and translations generated are for informational purposes only. They do not constitute legal advice or guarantee any specific outcome in legal proceedings. Consult a qualified attorney for legal matters.\n\n3. User Responsibility\nYou are responsible for the accuracy of the information you enter. BuroHero is not liable for errors resulting from incorrect user input or the use of generated documents.\n\n4. Refunds\nRefunds are provided only in cases of technical failure where the document could not be generated or downloaded. Contact support for assistance.\n\n5. Intellectual Property\nThe content and software of BuroHero are owned by us. You are granted a limited license to use the generated documents for personal use."
}
```

### 3.2 Spanish (es.json)
```json
"legal": {
  "privacyTitle": "Política de Privacidad",
  "privacyBody": "Última actualización: Diciembre 2025\n\n1. Introducción\nBuroHero ('nosotros') respeta su privacidad. Esta política explica cómo manejamos sus datos cuando utiliza nuestro servicio de generación de documentos.\n\n2. Recopilación de Datos\nRecopilamos la información que usted proporciona directamente: respuestas del formulario (para la generación del documento), dirección de correo electrónico (para la entrega) y detalles de pago (procesados de forma segura por nuestro proveedor).\n\n3. Uso de los Datos\nUtilizamos sus datos únicamente para:\n- Generar los documentos legales que solicita.\n- Enviarle los archivos PDF por correo electrónico.\n- Mejorar la funcionalidad de nuestro servicio.\n\n4. Compartir Datos\nNo vendemos sus datos personales. Compartimos datos solo con proveedores de servicios necesarios (por ejemplo, procesadores de pagos, servicios de entrega de correo) que están obligados a la confidencialidad.\n\n5. Sus Derechos\nBajo el RGPD, tiene derecho a acceder, corregir o eliminar sus datos personales. Contáctenos en support@burohero.com para solicitudes.",
  "termsTitle": "Términos de Servicio",
  "termsBody": "Última actualización: Diciembre 2025\n\n1. Descripción del Servicio\nBuroHero proporciona una herramienta automatizada para generar documentos legales simplificados y traducciones. Somos un proveedor de tecnología, no un bufete de abogados.\n\n2. No es Asesoramiento Legal\nLos documentos y traducciones generados son solo para fines informativos. No constituyen asesoramiento legal ni garantizan ningún resultado específico en procedimientos legales. Consulte a un abogado calificado para asuntos legales.\n\n3. Responsabilidad del Usuario\nUsted es responsable de la precisión de la información que ingresa. BuroHero no se hace responsable de errores resultantes de entradas incorrectas del usuario o del uso de documentos generados.\n\n4. Reembolsos\nLos reembolsos se proporcionan solo en casos de falla técnica donde el documento no pudo ser generado o descargado. Contacte a soporte para asistencia.\n\n5. Propiedad Intelectual\nEl contenido y software de BuroHero son propiedad nuestra. Se le otorga una licencia limitada para usar los documentos generados para uso personal."
}
```

### 3.3 German (de.json)
```json
"legal": {
  "privacyTitle": "Datenschutzerklärung",
  "privacyBody": "Letzte Aktualisierung: Dezember 2025\n\n1. Einführung\nBuroHero ('wir') respektiert Ihre Privatsphäre. Diese Richtlinie erklärt, wie wir Ihre Daten behandeln.\n\n2. Datenerfassung\nWir erfassen Informationen, die Sie bereitstellen: Formularantworten, E-Mail-Adresse und Zahlungsdaten.\n\n3. Datennutzung\nWir verwenden Ihre Daten nur, um:\n- Die angeforderten Dokumente zu erstellen.\n- Ihnen die PDFs per E-Mail zu senden.\n\n4. Datenweitergabe\nWir verkaufen Ihre Daten nicht. Wir teilen sie nur mit notwendigen Dienstleistern (z. B. Zahlungsabwicklern).\n\n5. Ihre Rechte\nGemäß DSGVO haben Sie das Recht auf Auskunft, Berichtigung oder Löschung Ihrer Daten. Kontakt: support@burohero.com.",
  "termsTitle": "Nutzungsbedingungen",
  "termsBody": "Letzte Aktualisierung: Dezember 2025\n\n1. Servicebeschreibung\nBuroHero ist ein Technologiedienstleister, keine Anwaltskanzlei.\n\n2. Keine Rechtsberatung\nDie generierten Dokumente dienen nur zu Informationszwecken. Sie stellen keine Rechtsberatung dar.\n\n3. Nutzerverantwortung\nSie sind für die Richtigkeit Ihrer Eingaben verantwortlich.\n\n4. Rückerstattungen\nRückerstattungen gibt es nur bei technischen Fehlern.\n\n5. Geistiges Eigentum\nDas Eigentum an Software und Inhalten liegt bei uns."
}
```

### 3.4 French (fr.json)
```json
"legal": {
  "privacyTitle": "Politique de Confidentialité",
  "privacyBody": "Mise à jour : Décembre 2025\n\n1. Introduction\nBuroHero respecte votre vie privée. Cette politique explique comment nous traitons vos données.\n\n2. Collecte de Données\nNous collectons : vos réponses aux formulaires, votre adresse e-mail et vos informations de paiement.\n\n3. Utilisation des Données\nNous utilisons vos données pour :\n- Générer les documents demandés.\n- Vous envoyer les PDF par e-mail.\n\n4. Partage des Données\nNous ne vendons pas vos données. Nous les partageons uniquement avec les prestataires nécessaires (paiement, e-mail).\n\n5. Vos Droits\nSelon le RGPD, vous avez un droit d'accès, de rectification et de suppression. Contact : support@burohero.com.",
  "termsTitle": "Conditions d'Utilisation",
  "termsBody": "Mise à jour : Décembre 2025\n\n1. Description du Service\nBuroHero est un fournisseur de technologie, pas un cabinet d'avocats.\n\n2. Pas de Conseil Juridique\nLes documents sont à titre informatif et ne remplacent pas un avocat.\n\n3. Responsabilité\nVous êtes responsable de l'exactitude des informations saisies.\n\n4. Remboursements\nRemboursement uniquement en cas d'erreur technique.\n\n5. Propriété Intellectuelle\nBuroHero détient les droits sur le logiciel et le contenu."
}
```

### 3.5 Italian (it.json)
```json
"legal": {
  "privacyTitle": "Informativa sulla Privacy",
  "privacyBody": "Ultimo aggiornamento: Dicembre 2025\n\n1. Introduzione\nBuroHero rispetta la tua privacy. Questa informativa spiega come gestiamo i tuoi dati.\n\n2. Raccolta Dati\nRaccogliamo: risposte ai moduli, indirizzo email e dettagli di pagamento.\n\n3. Uso dei Dati\nUsiamo i dati per:\n- Generare i documenti richiesti.\n- Inviarti i PDF via email.\n\n4. Condivisione Dati\nNon vendiamo i tuoi dati. Li condividiamo solo con fornitori necessari (es. pagamenti).\n\n5. I Tuoi Diritti\nSecondo il GDPR, hai diritto di accesso, rettifica e cancellazione. Contatto: support@burohero.com.",
  "termsTitle": "Termini di Servizio",
  "termsBody": "Ultimo aggiornamento: Dicembre 2025\n\n1. Descrizione del Servizio\nBuroHero è un fornitore di tecnologia, non uno studio legale.\n\n2. Nessuna Consulenza Legale\nI documenti sono a scopo informativo e non costituiscono consulenza legale.\n\n3. Responsabilità\nSei responsabile della correttezza dei dati inseriti.\n\n4. Rimborsi\nRimborsi solo in caso di guasto tecnico.\n\n5. Proprietà Intellettuale\nBuroHero detiene i diritti sul software e sui contenuti."
}
```

### 3.6 Dutch (nl.json)
```json
"legal": {
  "privacyTitle": "Privacybeleid",
  "privacyBody": "Laatst bijgewerkt: December 2025\n\n1. Inleiding\nBuroHero respecteert uw privacy. Dit beleid legt uit hoe wij met uw gegevens omgaan.\n\n2. Gegevensverzameling\nWij verzamelen: formulierantwoorden, e-mailadres en betalingsgegevens.\n\n3. Gegevensgebruik\nWij gebruiken uw gegevens om:\n- De gevraagde documenten te genereren.\n- De PDF's te e-mailen.\n\n4. Delen van Gegevens\nWij verkopen uw gegevens niet. Wij delen deze alleen met noodzakelijke dienstverleners.\n\n5. Uw Rechten\nOnder de AVG heeft u recht op inzage, correctie en verwijdering. Contact: support@burohero.com.",
  "termsTitle": "Algemene Voorwaarden",
  "termsBody": "Laatst bijgewerkt: December 2025\n\n1. Dienstbeschrijving\nBuroHero is een technologieleverancier, geen advocatenkantoor.\n\n2. Geen Juridisch Advies\nDe documenten zijn informatief en vervangen geen juridisch advies.\n\n3. Verantwoordelijkheid\nU bent verantwoordelijk voor de juistheid van uw invoer.\n\n4. Restitutie\nRestitutie alleen bij technische fouten.\n\n5. Intellectueel Eigendom\nAlle rechten voorbehouden aan BuroHero."
}
```

### 3.7 Polish (pl.json)
```json
"legal": {
  "privacyTitle": "Polityka Prywatności",
  "privacyBody": "Ostatnia aktualizacja: Grudzień 2025\n\n1. Wstęp\nBuroHero szanuje Twoją prywatność. Wyjaśniamy tutaj, jak przetwarzamy Twoje dane.\n\n2. Zbieranie Danych\nZbieramy: odpowiedzi z formularzy, adres e-mail i dane płatności.\n\n3. Wykorzystanie Danych\nUżywamy danych, aby:\n- Wygenerować dokumenty.\n- Wysłać pliki PDF mailem.\n\n4. Udostępnianie Danych\nNie sprzedajemy danych. Udostępniamy je tylko niezbędnym dostawcom usług (np. płatności).\n\n5. Twoje Prawa\nZgodnie z RODO masz prawo do dostępu, poprawiania i usuwania danych. Kontakt: support@burohero.com.",
  "termsTitle": "Regulamin",
  "termsBody": "Ostatnia aktualizacja: Grudzień 2025\n\n1. Opis Usługi\nBuroHero to dostawca technologii, nie kancelaria prawna.\n\n2. Brak Porady Prawnej\nDokumenty mają charakter informacyjny i nie stanowią porady prawnej.\n\n3. Odpowiedzialność\nOdpowiadasz za poprawność wprowadzonych danych.\n\n4. Zwroty\nZwroty tylko w przypadku błędu technicznego.\n\n5. Własność Intelektualna\nWszelkie prawa zastrzeżone dla BuroHero."
}
```

### 3.8 Romanian (ro.json)
```json
"legal": {
  "privacyTitle": "Politica de Confidențialitate",
  "privacyBody": "Ultima actualizare: Decembrie 2025\n\n1. Introducere\nBuroHero vă respectă confidențialitatea. Această politică explică modul în care gestionăm datele dvs.\n\n2. Colectarea Datelor\nColectăm: răspunsurile din formulare, adresa de e-mail și detaliile de plată.\n\n3. Utilizarea Datelor\nFolosim datele pentru:\n- A genera documentele solicitate.\n- A trimite PDF-urile prin e-mail.\n\n4. Partajarea Datelor\nNu vindem datele dvs. Le partajăm doar cu furnizorii necesari (ex. procesatori de plăți).\n\n5. Drepturile Dvs.\nConform GDPR, aveți dreptul de acces, rectificare și ștergere. Contact: support@burohero.com.",
  "termsTitle": "Termeni și Condiții",
  "termsBody": "Ultima actualizare: Decembrie 2025\n\n1. Descrierea Serviciului\nBuroHero este un furnizor de tehnologie, nu o firmă de avocatură.\n\n2. Nu este Consultanță Juridică\nDocumentele sunt informative și nu constituie consultanță juridică.\n\n3. Responsabilitate\nSunteți responsabil pentru corectitudinea datelor introduse.\n\n4. Rambursări\nRambursări doar în caz de eroare tehnică.\n\n5. Proprietate Intelectuală\nToate drepturile rezervate BuroHero."
}
```

### 3.9 Swedish (sv.json)
```json
"legal": {
  "privacyTitle": "Integritetspolicy",
  "privacyBody": "Senast uppdaterad: December 2025\n\n1. Introduktion\nBuroHero respekterar din integritet. Denna policy förklarar hur vi hanterar dina data.\n\n2. Datainsamling\nVi samlar in: formulärsvar, e-postadress och betalningsuppgifter.\n\n3. Dataanvändning\nVi använder data för att:\n- Skapa dokumenten.\n- Skicka PDF-filer via e-post.\n\n4. Datadelning\nVi säljer inte dina data. Vi delar endast med nödvändiga leverantörer (t.ex. betalningar).\n\n5. Dina Rättigheter\nEnligt GDPR har du rätt till tillgång, rättelse och radering. Kontakt: support@burohero.com.",
  "termsTitle": "Användarvillkor",
  "termsBody": "Senast uppdaterad: December 2025\n\n1. Tjänstebeskrivning\nBuroHero är en teknikleverantör, inte en advokatbyrå.\n\n2. Ingen Juridisk Rådgivning\nDokumenten är endast för informationsändamål och utgör inte juridisk rådgivning.\n\n3. Ansvar\nDu ansvarar för att informationen du anger är korrekt.\n\n4. Återbetalningar\nÅterbetalning endast vid tekniskt fel.\n\n5. Immateriella Rättigheter\nAlla rättigheter förbehålls BuroHero."
}
```

### 3.10 Ukrainian (uk.json)
```json
"legal": {
  "privacyTitle": "Політика конфіденційності",
  "privacyBody": "Останнє оновлення: Грудень 2025\n\n1. Вступ\nBuroHero поважає вашу конфіденційність. Ця політика пояснює, як ми обробляємо ваші дані.\n\n2. Збір даних\nМи збираємо: відповіді у формах, email та платіжні дані.\n\n3. Використання даних\nМи використовуємо дані для:\n- Генерації документів.\n- Відправки PDF файлів.\n\n4. Обмін даними\nМи не продаємо ваші дані. Ми передаємо їх лише необхідним сервісам (наприклад, платіжним системам).\n\n5. Ваші права\nЗгідно з GDPR, ви маєте право на доступ, виправлення та видалення даних. Контакт: support@burohero.com.",
  "termsTitle": "Умови використання",
  "termsBody": "Останнє оновлення: Грудень 2025\n\n1. Опис послуги\nBuroHero — це технологічний провайдер, а не юридична фірма.\n\n2. Не є юридичною консультацією\nДокументи надаються в інформаційних цілях і не є юридичною порадою.\n\n3. Відповідальність\nВи несете відповідальність за правильність введених даних.\n\n4. Повернення коштів\nПовернення лише у випадку технічної помилки.\n\n5. Інтелектуальна власність\nВсі права належать BuroHero."
}
```
