# Task 005: Programmatic SEO Engine (pSEO)

**Status:** Pending
**Priority:** High
**Target Files:** `src/data/pseo.json`, `src/lib/pseo.ts`, `src/app/[locale]/[category]/[company]/page.tsx`, `src/app/[locale]/directory/page.tsx`

## 1. Overview
We will transform the generator route (`[category]/[company]`) into a Programmatic SEO engine capable of generating thousands of landing pages (e.g., "Cancel Vodafone", "Deposit Return Madrid", "Flight Delay Ryanair").

## 2. Scaling Strategy (Entities)
Each Use Case maps to a specific **Entity Type** for scaling.

### Group 1: Companies (Telecom, Utilities, Banks)
-   **Use Cases:** `cancel` (Telco), `factura` (Bills), `comisiones` (Fees).
-   **Entity:** **Company Name** (Vodafone, Orange, Endesa, BBVA).
-   **URL:** `/cancel/vodafone`, `/factura/endesa`.

### Group 2: Retailers (Shopping)
-   **Use Cases:** `devolucion` (Returns), `garantia` (Warranty), `noentrega` (Non-delivery).
-   **Entity:** **Store Name** (Amazon, Zara, MediaMarkt, Apple).
-   **URL:** `/garantia/apple`, `/devolucion/zara`.

### Group 3: Airlines & Insurers (Travel)
-   **Use Cases:** `vuelo` (Delay), `seguro` (Cancel), `denegacion` (Claim Denied).
-   **Entity:** **Airline/Insurer** (Ryanair, Vueling, Mapfre, Allianz).
-   **URL:** `/vuelo/ryanair`, `/seguro/mapfre`.

### Group 4: Cities (Housing, Traffic, Work)
-   **Use Cases:** `fianza` (Deposit), `reparacion`, `rescision` (Housing); `trafico` (Fines); `trabajo` (Wages, Resignation).
-   **Entity:** **City Name** (Madrid, Barcelona, Valencia, Alicante).
-   **URL:** `/fianza/madrid`, `/trafico/barcelona` (Note: `trafico` currently uses 'multa'/'venta' as slugs, we might need to support `/trafico/multa-madrid` or stick to generic for now and expand later. **Decision:** For now, keep `multa`/`venta` as static, and add cities as new slugs if needed, OR focus pSEO only on Company/Retailer/Airline first).
    *   *Correction:* For `housing` and `work`, "City" is the best keyword. For MVP, we can add 5 major Spanish cities.

---

## 3. Data Layer Implementation

### 3.1 `src/data/pseo.json`
Create a master database of entities.

```json
{
  "companies": [
    { "slug": "vodafone", "name": "Vodafone", "category": "telecom" },
    { "slug": "orange", "name": "Orange", "category": "telecom" },
    { "slug": "endesa", "name": "Endesa", "category": "energy" },
    { "slug": "bbva", "name": "BBVA", "category": "bank" }
  ],
  "retailers": [
    { "slug": "amazon", "name": "Amazon", "category": "ecommerce" },
    { "slug": "zara", "name": "Zara", "category": "fashion" }
  ],
  "airlines": [
    { "slug": "ryanair", "name": "Ryanair", "category": "airline" },
    { "slug": "vueling", "name": "Vueling", "category": "airline" }
  ],
  "cities": [
    { "slug": "madrid", "name": "Madrid", "category": "city" },
    { "slug": "barcelona", "name": "Barcelona", "category": "city" },
    { "slug": "valencia", "name": "Valencia", "category": "city" }
  ]
}
```

### 3.2 `src/lib/pseo.ts`
Utility to fetch valid paths for `generateStaticParams`.

```typescript
import pseoData from "@/data/pseo.json";

export function getPseoPaths() {
  const paths: { category: string; company: string }[] = [];

  // Map Use Cases to Data Sources
  const mappings = [
    { useCases: ["cancel"], data: pseoData.companies }, // Telco
    { useCases: ["factura"], data: pseoData.companies }, // Energy
    { useCases: ["comisiones"], data: pseoData.companies }, // Banks
    { useCases: ["devolucion", "garantia", "noentrega"], data: pseoData.retailers },
    { useCases: ["vuelo"], data: pseoData.airlines },
    { useCases: ["seguro", "denegacion"], data: pseoData.companies }, // Insurers (add to companies or airlines json?) -> Assume companies for now
    { useCases: ["fianza", "reparacion", "rescision", "trafico", "trabajo"], data: pseoData.cities }
  ];

  mappings.forEach((m) => {
    m.useCases.forEach((uc) => {
      m.data.forEach((entity) => {
        paths.push({ category: uc, company: entity.slug });
      });
    });
  });

  return paths;
}

export function getEntityName(slug: string): string {
  // Helper to find name by slug across all arrays
  // ...
}
```

---

## 4. Routing & Static Generation

**Target:** `src/app/[locale]/[category]/[company]/page.tsx`

### 4.1 `generateStaticParams`
```typescript
export async function generateStaticParams() {
  const paths = getPseoPaths();
  const locales = ["en", "es", "de", ...]; // Import from routing

  const params = [];
  for (const locale of locales) {
    for (const path of paths) {
      params.push({ locale, ...path });
    }
  }
  return params;
}
```

### 4.2 `generateMetadata`
Dynamically generate SEO titles.
-   **Pattern:** `{Action} {Entity} in Spain: Legal Template ({Year})`
-   **Example:** "Cancel Vodafone Contract in Spain: Legal Template (2025)"
-   **Localized:** "Cancelar contrato Vodafone: Modelo Burofax (2025)"

---

## 5. Directory Page (HTML Sitemap)

**Target:** `src/app/[locale]/directory/page.tsx`

A simple public page listing all generated URLs to ensure Google indexes them.

-   **H1:** "Legal Document Directory"
-   **Content:** Grouped list of links.
    -   **Telecom:** Cancel Vodafone, Cancel Orange...
    -   **Cities:** Deposit Return Madrid, Deposit Return Barcelona...
-   **Implementation:** Fetch `getPseoPaths()`, group by Category, render `<Link>`.

---

## 6. Execution Steps
1.  Create `src/data/pseo.json` with dummy data.
2.  Create `src/lib/pseo.ts`.
3.  Update `src/app/[locale]/[category]/[company]/page.tsx` with `generateStaticParams` and `generateMetadata`.
4.  Create `src/app/[locale]/directory/page.tsx`.
