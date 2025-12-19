# Task 004: Fix Catalog Translation Keys

**Status:** Completed
**Priority:** High
**Target Files:** `src/lib/catalog.ts`

## 1. Issue Analysis
The homepage catalog displays raw keys (e.g., `home.home.categories.housing`) instead of the translated text.

**Cause:**
1.  In `src/app/[locale]/page.tsx`, the translator is initialized as scoped to the "home" namespace:
    ```typescript
    const tHome = await getTranslations("home");
    ```
2.  In `src/lib/catalog.ts`, the keys are defined with the full namespace:
    ```typescript
    titleKey: "home.categories.housing"
    ```
3.  When `tHome(key)` is called, it resolves to `home.home.categories.housing`, which does not exist.

## 2. Implementation Plan

**Target:** `src/lib/catalog.ts`

**Action:** Remove the `home.` prefix from all `titleKey` and `descKey` values in the `createCatalog` function.

### Example Change

**Before:**
```typescript
{
  id: "housing",
  titleKey: "home.categories.housing", // ❌ WRONG
  items: [
    {
      titleKey: "home.cards.deposit_return.title", // ❌ WRONG
      // ...
    }
  ]
}
```

**After:**
```typescript
{
  id: "housing",
  titleKey: "categories.housing", // ✅ CORRECT (relative to "home" namespace)
  items: [
    {
      titleKey: "cards.deposit_return.title", // ✅ CORRECT
      // ...
    }
  ]
}
```

## 3. Verification
After applying this fix, the keys will correctly resolve to:
-   `home.categories.housing` -> "Housing & Rent"
-   `home.cards.deposit_return.title` -> "Deposit return"

No new translations are needed as the keys already exist in `messages/*.json`.
