# Task 001: Homepage Redesign & Catalog Structure

**Status:** Completed
**Priority:** High
**Target File:** `src/app/[locale]/page.tsx`

## 1. Overview
The current homepage is a placeholder list. We need to transform it into a high-converting SaaS landing page that immediately explains the value proposition ("Spanish Bureaucracy in Your Language") and directs users to the correct generator (Use Case).

## 2. Page Structure (Layout)

The page should consist of 4 main sections:

### 2.1 Hero Section
- **Goal:** Immediately explain what BuroHero is.
- **Elements:**
  - **H1 Headline:** "Spanish Bureaucracy, handled in {Language}." (Localized)
  - **Subheadline:** "Generate formal legal claims and letters (Burofax) instantly. We translate your problem into Spanish legal terms."
  - **Visual:** Abstract illustration or a clean mockup showing the "Dual View" (Split screen document).

### 2.2 "How It Works" (3 Steps)
- **Step 1:** Choose your problem (Select from catalog).
- **Step 2:** Fill the form in your language.
- **Step 3:** Download official Spanish PDF + Translation.

### 2.3 The Catalog (Main Functionality)
A responsive grid (1 col mobile, 2 col tablet, 3 col desktop) displaying all 17 use cases grouped by category.

**Group 1: Housing (Vivienda)**
- Return Deposit (Fianza)
- Request Repairs
- Terminate Lease

**Group 2: Services & Utilities (Suministros)**
- Cancel Contract (Telco/Gym/Alarm)
- Dispute Bill (Electricity/Water)

**Group 3: Shopping (Compras)**
- Return Product (14 days)
- Warranty Claim (3 years)
- Non-Delivery

**Group 4: Travel & Insurance (Viajes y Seguros)**
- Flight Delay
- Cancel Insurance
- Claim Denied

**Group 5: Traffic (Tráfico) [NEW]**
- Appeal Traffic Fine
- Car Sale Notification

**Group 6: Work (Trabajo) [NEW]**
- Unpaid Wages
- Voluntary Resignation
- Vacation Request

### 2.4 Trust & Footer
- Disclaimer: "BuroHero is a technology provider, not a law firm."
- Links: Privacy Policy, Terms of Service.

## 3. Content Strategy & Localization Keys

We need to add these keys to `messages/{locale}.json`.

**Namespace: `home`**

```json
{
  "hero": {
    "title": "Spanish Bureaucracy. Solved.",
    "subtitle": "Create professional legal documents in minutes. No lawyers, no language barrier."
  },
  "steps": {
    "title": "How it works",
    "step1": "Select a topic",
    "step2": "Answer in {language}",
    "step3": "Get legal PDF"
  },
  "categories": {
    "housing": "Housing & Rent",
    "services": "Services & Utilities",
    "shopping": "Consumer Rights",
    "travel": "Travel & Insurance",
    "traffic": "Traffic & Vehicles",
    "work": "Work & Employment"
  },
  "cards": {
    "cancel_title": "Cancel Contract",
    "cancel_desc": "Internet, Gym, Alarm systems",
    "fianza_title": "Deposit Return",
    "fianza_desc": "Recover your rental deposit",
    "traffic_fine_title": "Traffic Fine Appeal",
    "traffic_fine_desc": "Appeal DGT or local fines"
    // ... add keys for all 17 cases
  }
}
```

## 4. Technical Implementation Details

1.  **Component:** `src/app/[locale]/page.tsx`
2.  **Icons:** Use `lucide-react` for category icons (e.g., `Home`, `Wifi`, `ShoppingBag`, `Plane`, `Car`, `Briefcase`).
3.  **Data Structure:**
    Create a strictly typed array in a separate file (e.g., `src/lib/catalog.ts` or inside `page.tsx`) to map categories to URLs.

    ```typescript
    const categories = [
      {
        id: "housing",
        icon: HomeIcon,
        items: [
          { slug: "fianza/landlord", titleKey: "fianza_title", descKey: "fianza_desc" },
          { slug: "reparacion/landlord", ... },
          // ...
        ]
      },
      // ...
    ]
    ```

4.  **Routing:**
    Links must use the dynamic locale: `Link href=/{locale}/{slug}`.

## 5. Design System (Tailwind)
- **Background:** White / Zinc-50 for sections.
- **Cards:** White bg, `border-zinc-200`, `hover:border-zinc-400`, `transition-all`.
- **Typography:** `Inter` (default sans). H1 should be `text-4xl font-bold tracking-tight`.
