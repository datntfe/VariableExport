# VARIABLE STORYBOOK - COMPLETE SYSTEM ANALYSIS

## 📁 1. FOLDER STRUCTURE

```
/src
  /components
    /layout
      - AppLayout.tsx      → Main layout wrapper with Header + Sidebar + Content
      - Header.tsx         → Fixed topbar with Brand/Mode switchers
      - Sidebar.tsx        → Navigation menu (HOME, FOUNDATIONS, THEMING, COMPONENTS, EXPORT)
      - NavigationItem.tsx → Reusable nav item component
      - Container.tsx      → Layout container (unused in current DS pages)
      - Section.tsx        → Layout section (unused in current DS pages)
    /system
      - TokenTable.tsx     → Displays token data in table format
      - ColorSwatch.tsx    → Displays color tokens visually
    /ui
      - button.tsx         → shadcn/ui Button component
      - card.tsx           → shadcn/ui Card component
      - dropdown-menu.tsx  → shadcn/ui DropdownMenu
      - input.tsx          → shadcn/ui Input component
      - separator.tsx      → shadcn/ui Separator
      - sheet.tsx          → shadcn/ui Sheet (mobile sidebar)
  /lib
    - token-parser.ts      → Parses Tokens Studio JSON → DesignTokens structure
    - token-store.tsx      → Global state (Context) for parsed tokens
    - token-helpers.ts     → Helper functions to query tokens
    - tokens.ts            → ⚠️ OLD mock data (still used by some pages)
    - theme-context.tsx    → Theme state (brand, mode, accent, radius, scale)
    - utils.ts             → cn() utility for class merging
  /pages
    - Import.tsx           → JSON import screen
    - Overview.tsx         → ✅ Uses parsed tokens via token-helpers
    - Export.tsx           → ✅ Uses parsed tokens
    - Theming.tsx          → ⚠️ Uses hardcoded values, not tokens
    /foundations
      - Borders.tsx        → ✅ Uses parsed tokens
      - Radius.tsx         → ✅ Uses parsed tokens
      - Icons.tsx          → ✅ Uses parsed tokens
      - Spacing.tsx        → ✅ Uses parsed tokens
      - Colors.tsx         → ⚠️ Uses OLD mock data from /lib/tokens.ts
      - Appearance.tsx     → ⚠️ Uses OLD mock data from /lib/tokens.ts
      - Typography.tsx     → ⚠️ Uses OLD mock data from /lib/tokens.ts
    /components
      - Buttons.tsx        → ⚠️ Uses OLD mock data
      - Cards.tsx          → ⚠️ Uses OLD mock data
      - Inputs.tsx         → ⚠️ Uses OLD mock data
  /config
    - theme-config.ts      → Placeholder (unused)
  /styles
    - globals.css          → CSS variables for theme
    - tailwind.css         → Tailwind imports
```

---

## 🔄 2. DATA FLOW ARCHITECTURE

### Current Flow:
```
JSON File Upload
    ↓
Import.tsx (validate & parse)
    ↓
token-store.tsx (setRawTokens + parseTokens)
    ↓
token-parser.ts (parseTokensStudioJSON)
    ↓
DesignTokens object structure
    ↓
token-store.tsx (setDesignTokens)
    ↓
token-helpers.ts (query functions)
    ↓
UI Pages (via useTokenStore + helpers)
```

### State Management:
- **TokenStoreProvider**: Global context for parsed tokens
  - `rawTokens`: Original JSON
  - `designTokens`: Parsed DesignTokens structure
  - `hasTokens`: Boolean flag for routing protection

- **ThemeProvider**: Global theme settings
  - `brand`: Selected brand (Iris, Confidant, Default)
  - `mode`: Light/Dark/System
  - Persisted in localStorage

---

## 📊 3. PARSER OUTPUT SCHEMA (Current)

```typescript
interface DesignTokens {
  borders: Record<string, DesignToken>      // border.width.* tokens
  radius: Record<string, DesignToken>       // radius.* tokens
  icons: Record<string, DesignToken>        // icon.size.* tokens
  spacing: Record<string, DesignToken>      // spacing.* tokens
  appearance: {
    light: Record<string, DesignToken>      // Light mode colors
    dark: Record<string, DesignToken>       // Dark mode colors
  }
  colors: Record<string, DesignToken>       // Base/grayscale colors
  typography: Record<string, DesignToken>   // Font tokens
}

interface DesignToken {
  name: string          // Full token path (e.g., "border.width.1")
  category: string      // "border" | "radius" | "icon" | "spacing" | "color" | "typography"
  group: string         // "border-width" | "border-radius" | "icon-size" | etc.
  type: string          // "dimension" | "color" | "string" | "number"
  value: string | number // Resolved value (e.g., "1px", "#ffffff", "0.5rem")
  mode?: string         // "light" | "dark" | "default"
  scope?: string        // Optional usage scope
  usage?: string        // Optional usage notes
  rawValue?: any        // Original token object from JSON
}
```

---

## 🎯 4. UI COMPONENT EXPECTATIONS

### TokenTable Component:
**Expects:**
- `tokens: DesignToken[]`
- Fields displayed: name, category, group, type, value, mode

**Status:** ✅ Ready - Works with parsed tokens

### ColorSwatch Component:
**Expects:**
- `name: string`
- `value: string` (color value: hex, hsl, rgb)
- `mode?: string`

**Status:** ✅ Ready - Works with parsed tokens

### Foundation Pages Requirements:

#### Borders.tsx:
**Expects:**
- Array of tokens with `category === 'border'`
- Each token has `value` (e.g., "1px", "2px")
- Uses `token.value` for borderWidth style

**Status:** ✅ Uses parsed tokens via `getTokensByCategory(designTokens, 'border')`

#### Radius.tsx:
**Expects:**
- Array of tokens with `category === 'radius'`
- Each token has `value` (e.g., "0.5rem", "1rem")
- Uses `token.value` for borderRadius style

**Status:** ✅ Uses parsed tokens

#### Icons.tsx:
**Expects:**
- Array of tokens with `category === 'icon'`
- Each token has `value` (dimension: "16px", "20px")
- Uses `token.value` for width/height styles

**Status:** ✅ Uses parsed tokens

#### Spacing.tsx:
**Expects:**
- Array of tokens with `category === 'spacing'`
- Each token has `value` (dimension: "0.5rem", "1rem")
- Uses `token.value` for width/spacing styles

**Status:** ✅ Uses parsed tokens

#### Colors.tsx:
**Expects:**
- Base colors: `group === 'base'`
- Semantic colors: `group === 'semantic'`
- Each token has `value` (color: hex, hsl, rgb)
- Mode-aware tokens for light/dark

**Status:** ⚠️ **USES OLD MOCK DATA** - Needs migration to parsed tokens

**Current Code:**
```typescript
import { getTokensByCategory, getTokensByGroup } from '@/lib/tokens' // OLD
const colorTokens = getTokensByCategory('color') // OLD mock data
```

**Should Be:**
```typescript
import { useTokenStore } from '@/lib/token-store'
import { getTokensByCategory, getTokensByGroup } from '@/lib/token-helpers'
const { designTokens } = useTokenStore()
const colorTokens = getTokensByCategory(designTokens, 'color')
```

#### Appearance.tsx:
**Expects:**
- Semantic colors filtered by mode ('light' | 'dark')
- Helper function to get color value by name and mode
- Uses colors for background, foreground, primary, muted

**Status:** ⚠️ **USES OLD MOCK DATA** - Needs migration

**Current Code:**
```typescript
import { getTokensByGroup } from '@/lib/tokens' // OLD
const semanticColors = getTokensByGroup('semantic') // OLD mock data
```

**Should Be:**
```typescript
import { useTokenStore } from '@/lib/token-store'
import { getTokensByGroup } from '@/lib/token-helpers'
const { designTokens } = useTokenStore()
const semanticColors = getTokensByGroup(designTokens, 'semantic')
```

#### Typography.tsx:
**Expects:**
- Tokens with `category === 'typography'`
- Filtered by groups: 'font-size', 'font-weight', 'font-family', 'line-height', 'letter-spacing'
- Uses `token.value` for CSS font properties

**Status:** ⚠️ **USES OLD MOCK DATA** - Needs migration

**Current Code:**
```typescript
import { getTokensByCategory } from '@/lib/tokens' // OLD
const typographyTokens = getTokensByCategory('typography') // OLD mock data
```

#### Buttons.tsx, Cards.tsx, Inputs.tsx:
**Expects:**
- Mixed tokens (colors, radius, spacing, borders)
- For token mapping table display

**Status:** ⚠️ **USES OLD MOCK DATA** - Needs migration

---

## 🔍 5. PARSER LOGIC ANALYSIS

### Current Parser Capabilities:

#### ✅ Implemented:
1. **Token Discovery**: Recursively finds all tokens with `$value` property
2. **Reference Resolution**: Resolves `{token.name}` references
3. **Simple Expressions**: Handles `{token} * 2` multiplication
4. **Theme Extraction**: Finds light/dark themes from `$themes` array
5. **Token Set Extraction**: Extracts tokens from selected sets
6. **Category Classification**: Categorizes by keyword matching:
   - "border" + "width" → border category
   - "radius" → radius category
   - "icon" + "size" → icon category
   - "spacing" / "space" → spacing category
   - "color" / type includes "color" → color category
   - "font" / "typography" / "lineheight" / "letterspacing" → typography

#### ⚠️ Limitations & Missing Features:

1. **Multi-value Parsing**: 
   - Current: Returns string "4px 8px"
   - Needed: Should parse into array `[4, 8]` or object `{top: 4, right: 8, ...}`
   - **Impact**: Radius previews can't show multi-value radius correctly

2. **Color Group Flattening**:
   - Current: Groups colors by "base" vs "semantic" based on name
   - Needed: Should detect color families (gray-100...900) and group them
   - **Impact**: Colors page can't show grayscale scales properly

3. **Brand Support**:
   - Current: No brand-specific token extraction
   - Needed: Should extract tokens per brand from JSON structure
   - **Impact**: Brand switcher doesn't actually change tokens

4. **Expression Parsing**:
   - Current: Only handles `*` multiplication
   - Needed: Should handle `+`, `-`, `/`, chained references
   - **Impact**: Complex expressions won't resolve

5. **Token Naming**:
   - Current: Uses full path as name (e.g., "border.width.1")
   - Needed: Should preserve original naming or normalize
   - **Impact**: Token names might be too verbose

6. **Shadow Tokens**:
   - Current: Not parsed
   - Needed: Should detect shadow/boxShadow tokens
   - **Impact**: Appearance page uses hardcoded shadows

7. **Typography Letter Spacing**:
   - Current: Detected but not parsed correctly
   - Needed: Should handle letter-spacing tokens properly
   - **Impact**: Typography page might miss letter-spacing

---

## 📋 6. REQUIRED PARSER OUTPUT FORMAT (Complete Schema)

### Expected Structure for Full DS Support:

```typescript
interface DesignTokens {
  borders: {
    [key: string]: {
      name: string
      value: string        // "1px", "2px"
      type: "dimension"
      group: "border-width"
    }
  }
  
  radius: {
    [key: string]: {
      name: string
      value: string | string[]  // "0.5rem" or ["4px", "8px"] for multi-value
      type: "dimension"
      group: "border-radius"
    }
  }
  
  icons: {
    [key: string]: {
      name: string
      value: string        // "16px", "20px"
      type: "dimension"
      group: "icon-size"
    }
  }
  
  spacing: {
    [key: string]: {
      name: string
      value: string        // "0.5rem", "1rem"
      type: "dimension"
      group: "spacing-scale"
    }
  }
  
  colors: {
    base: {
      [key: string]: {
        name: string
        value: string      // "#ffffff", "hsl(0, 0%, 100%)"
        type: "color"
        group: "base"
      }
    }
    grayscale: {
      [key: string]: {
        name: string       // "gray.100", "gray.200", ...
        value: string
        type: "color"
        group: "grayscale"
      }
    }
    semantic: {
      [key: string]: {
        name: string
        value: string
        type: "color"
        group: "semantic"
        mode?: "light" | "dark"
      }
    }
    accent: {
      [key: string]: {
        name: string
        value: string
        type: "color"
        group: "accent"
      }
    }
  }
  
  appearance: {
    light: {
      background: string
      foreground: string
      primary: string
      secondary: string
      muted: string
      accent: string
      // ... other semantic colors
    }
    dark: {
      // Same structure
    }
  }
  
  typography: {
    fontFamily: {
      [key: string]: {
        name: string
        value: string      // "system-ui, sans-serif"
        type: "string"
        group: "font-family"
      }
    }
    fontSize: {
      [key: string]: {
        name: string
        value: string      // "1rem", "1.5rem"
        type: "dimension"
        group: "font-size"
      }
    }
    fontWeight: {
      [key: string]: {
        name: string
        value: number      // 400, 500, 600, 700
        type: "number"
        group: "font-weight"
      }
    }
    lineHeight: {
      [key: string]: {
        name: string
        value: string | number  // "1.5" or 1.5
        type: "number"
        group: "line-height"
      }
    }
    letterSpacing: {
      [key: string]: {
        name: string
        value: string      // "0.025em", "-0.025em"
        type: "dimension"
        group: "letter-spacing"
      }
    }
  }
  
  shadows?: {
    [key: string]: {
      name: string
      value: string        // "0 1px 3px rgba(0,0,0,0.1)"
      type: "shadow"
      group: "shadow"
    }
  }
}
```

---

## 🔗 7. MAPPING TABLE: JSON STRUCTURE → UI REQUIREMENTS

### Tokens Studio JSON Expected Structure:

```json
{
  "$themes": [
    {
      "name": "light",
      "selectedTokenSets": ["core", "light"]
    },
    {
      "name": "dark",
      "selectedTokenSets": ["core", "dark"]
    }
  ],
  "core": {
    "border": {
      "width": {
        "0": { "$value": "0px", "$type": "dimension" },
        "1": { "$value": "1px", "$type": "dimension" },
        "2": { "$value": "2px", "$type": "dimension" }
      }
    },
    "radius": {
      "sm": { "$value": "0.25rem", "$type": "dimension" },
      "md": { "$value": "0.5rem", "$type": "dimension" }
    },
    "spacing": {
      "xs": { "$value": "0.25rem", "$type": "dimension" },
      "sm": { "$value": "0.5rem", "$type": "dimension" }
    },
    "color": {
      "base": {
        "white": { "$value": "#ffffff", "$type": "color" },
        "black": { "$value": "#000000", "$type": "color" }
      },
      "gray": {
        "100": { "$value": "#f3f4f6", "$type": "color" },
        "200": { "$value": "#e5e7eb", "$type": "color" }
      }
    }
  },
  "light": {
    "color": {
      "semantic": {
        "background": { "$value": "{color.base.white}", "$type": "color" },
        "foreground": { "$value": "{color.base.black}", "$type": "color" }
      }
    }
  },
  "dark": {
    "color": {
      "semantic": {
        "background": { "$value": "{color.base.black}", "$type": "color" },
        "foreground": { "$value": "{color.base.white}", "$type": "color" }
      }
    }
  }
}
```

### Mapping Requirements:

| JSON Path | Parser Output | UI Component | Status |
|-----------|---------------|--------------|--------|
| `core.border.width.*` | `borders["border.width.0"]` | Borders.tsx | ✅ Working |
| `core.radius.*` | `radius["radius.sm"]` | Radius.tsx | ✅ Working |
| `core.spacing.*` | `spacing["spacing.xs"]` | Spacing.tsx | ✅ Working |
| `core.icon.size.*` | `icons["icon.size.xs"]` | Icons.tsx | ✅ Working |
| `core.color.base.*` | `colors["color.base.white"]` | Colors.tsx | ⚠️ Needs migration |
| `core.color.gray.*` | `colors["color.gray.100"]` | Colors.tsx | ⚠️ Needs grouping |
| `light.color.semantic.*` | `appearance.light["color.semantic.background"]` | Appearance.tsx | ⚠️ Needs migration |
| `dark.color.semantic.*` | `appearance.dark["color.semantic.background"]` | Appearance.tsx | ⚠️ Needs migration |
| `core.typography.font.*` | `typography["typography.font.size.xs"]` | Typography.tsx | ⚠️ Needs migration |

---

## ⚠️ 8. CRITICAL MISMATCHES & ISSUES

### Issue #1: Pages Using Old Mock Data
**Files Affected:**
- `src/pages/foundations/Colors.tsx` → Uses `@/lib/tokens` (old)
- `src/pages/foundations/Appearance.tsx` → Uses `@/lib/tokens` (old)
- `src/pages/foundations/Typography.tsx` → Uses `@/lib/tokens` (old)
- `src/pages/components/Buttons.tsx` → Uses `mockTokens` (old)
- `src/pages/components/Cards.tsx` → Uses `mockTokens` (old)
- `src/pages/components/Inputs.tsx` → Uses `mockTokens` (old)

**Fix Required:** Update all imports to use `useTokenStore` + `token-helpers`

### Issue #2: Color Grouping Logic
**Problem:** Parser groups colors as "base" vs "semantic" based on name, but doesn't:
- Detect grayscale families (gray-100...900)
- Group accent colors separately
- Properly separate base colors from semantic colors

**Fix Required:** Enhance `parseColors()` to:
- Detect color families (gray.*, blue.*, etc.)
- Create separate groups: base, grayscale, accent, semantic
- Preserve color hierarchy

### Issue #3: Multi-value Radius/Spacing
**Problem:** Parser returns string "4px 8px" but UI needs array or object for multi-value radius

**Fix Required:** Parse multi-value dimensions into structured format

### Issue #4: Brand Support Missing
**Problem:** Brand switcher exists but doesn't filter tokens by brand

**Fix Required:** 
- Parser should extract brand-specific token sets
- Store brands in DesignTokens structure
- Filter tokens by selected brand in helpers

### Issue #5: Shadow Tokens Not Parsed
**Problem:** Appearance page uses hardcoded shadow values

**Fix Required:** Add shadow token parsing and storage

### Issue #6: Typography Group Detection
**Problem:** Parser uses keyword matching which might miss some typography tokens

**Fix Required:** More robust typography token detection

---

## ✅ 9. READY-TO-USE COMPONENTS

These components are already compatible with parsed tokens:

1. ✅ **TokenTable** - Works with `DesignToken[]`
2. ✅ **ColorSwatch** - Works with color value strings
3. ✅ **Borders.tsx** - Uses parsed tokens correctly
4. ✅ **Radius.tsx** - Uses parsed tokens correctly
5. ✅ **Icons.tsx** - Uses parsed tokens correctly
6. ✅ **Spacing.tsx** - Uses parsed tokens correctly
7. ✅ **Overview.tsx** - Uses parsed tokens correctly
8. ✅ **Export.tsx** - Uses parsed tokens correctly

---

## 🔧 10. MIGRATION CHECKLIST

### Required Updates:

- [ ] Update `Colors.tsx` to use `useTokenStore` + `token-helpers`
- [ ] Update `Appearance.tsx` to use `useTokenStore` + `token-helpers`
- [ ] Update `Typography.tsx` to use `useTokenStore` + `token-helpers`
- [ ] Update `Buttons.tsx` to use `useTokenStore` + `token-helpers`
- [ ] Update `Cards.tsx` to use `useTokenStore` + `token-helpers`
- [ ] Update `Inputs.tsx` to use `useTokenStore` + `token-helpers`
- [ ] Update `Theming.tsx` to use parsed tokens for radius/scale previews
- [ ] Enhance parser to detect grayscale color families
- [ ] Enhance parser to parse multi-value dimensions
- [ ] Add shadow token parsing
- [ ] Add brand-specific token extraction
- [ ] Improve typography token detection

---

## 📐 11. PARSER ENHANCEMENT REQUIREMENTS

### For Complete Tokens Studio Support:

1. **Multi-value Parsing:**
   ```typescript
   // Input: "4px 8px"
   // Output: { top: "4px", right: "8px", bottom: "4px", left: "8px" }
   // Or: ["4px", "8px", "4px", "8px"]
   ```

2. **Color Family Detection:**
   ```typescript
   // Input: color.gray.100, color.gray.200, ... color.gray.900
   // Output: Grouped as "grayscale" family
   ```

3. **Brand Extraction:**
   ```typescript
   // Extract tokens from brand-specific sets
   // Store as: designTokens.brands = { iris: {...}, confidant: {...} }
   ```

4. **Shadow Parsing:**
   ```typescript
   // Detect shadow tokens
   // Parse into: { x, y, blur, spread, color }
   ```

5. **Enhanced Expression Parsing:**
   ```typescript
   // Support: +, -, /, *, chained references
   // Example: "{spacing.md} + {spacing.xs}"
   ```

---

## 🎯 12. FINAL SCHEMA REQUIREMENTS

### Complete DesignTokens Interface:

```typescript
interface DesignTokens {
  // Foundation tokens
  borders: Record<string, DesignToken>
  radius: Record<string, DesignToken>
  icons: Record<string, DesignToken>
  spacing: Record<string, DesignToken>
  
  // Color system (enhanced)
  colors: {
    base: Record<string, DesignToken>
    grayscale: Record<string, DesignToken>
    accent: Record<string, DesignToken>
    semantic: Record<string, DesignToken>
  }
  
  // Appearance modes
  appearance: {
    light: Record<string, DesignToken>
    dark: Record<string, DesignToken>
  }
  
  // Typography system (enhanced)
  typography: {
    fontFamily: Record<string, DesignToken>
    fontSize: Record<string, DesignToken>
    fontWeight: Record<string, DesignToken>
    lineHeight: Record<string, DesignToken>
    letterSpacing: Record<string, DesignToken>
  }
  
  // Shadows (new)
  shadows?: Record<string, DesignToken>
  
  // Brands (new)
  brands?: {
    [brandName: string]: {
      // Brand-specific token overrides
    }
  }
}
```

---

## ✅ 13. READINESS ASSESSMENT

### Current Status:

| Component | Status | Notes |
|-----------|--------|-------|
| Import Screen | ✅ Ready | Validates and parses JSON |
| Token Parser | ⚠️ Partial | Works but needs enhancements |
| Token Store | ✅ Ready | Global state management works |
| Token Helpers | ✅ Ready | Query functions work correctly |
| Overview Page | ✅ Ready | Uses parsed tokens |
| Borders Page | ✅ Ready | Uses parsed tokens |
| Radius Page | ✅ Ready | Uses parsed tokens |
| Icons Page | ✅ Ready | Uses parsed tokens |
| Spacing Page | ✅ Ready | Uses parsed tokens |
| Colors Page | ⚠️ Needs Update | Still uses mock data |
| Appearance Page | ⚠️ Needs Update | Still uses mock data |
| Typography Page | ⚠️ Needs Update | Still uses mock data |
| Buttons Page | ⚠️ Needs Update | Still uses mock data |
| Cards Page | ⚠️ Needs Update | Still uses mock data |
| Inputs Page | ⚠️ Needs Update | Still uses mock data |
| Theming Page | ⚠️ Needs Update | Uses hardcoded values |
| Export Page | ✅ Ready | Uses parsed tokens |

### Overall Readiness: **70%**

**What Works:**
- Import flow
- Basic parsing
- Foundation pages (borders, radius, icons, spacing)
- Token table display
- Color swatch display

**What Needs Work:**
- 6 pages still using mock data
- Parser enhancements (multi-value, color families, shadows, brands)
- Theming page integration

---

## 🚀 14. MIGRATION PLAN

### Phase 1: Update Pages to Use Parsed Tokens (Priority: HIGH)
1. Update Colors.tsx
2. Update Appearance.tsx
3. Update Typography.tsx
4. Update Buttons.tsx
5. Update Cards.tsx
6. Update Inputs.tsx
7. Update Theming.tsx

### Phase 2: Parser Enhancements (Priority: MEDIUM)
1. Add multi-value dimension parsing
2. Add color family detection (grayscale, accent)
3. Add shadow token parsing
4. Improve typography detection

### Phase 3: Brand Support (Priority: LOW)
1. Extract brand-specific token sets
2. Add brand filtering in helpers
3. Connect brand switcher to token filtering

---

## 📝 15. FINAL STATEMENT

**READY TO RECEIVE JSON SAMPLE FOR PARSING**

The system architecture is **70% ready**. Core parsing infrastructure exists and works for:
- Borders ✅
- Radius ✅
- Icons ✅
- Spacing ✅

**Remaining work:**
- 6 pages need migration from mock data to parsed tokens
- Parser needs enhancements for color families, multi-values, shadows
- Brand support needs implementation

**Once JSON is provided:**
1. Parser will extract tokens correctly for borders, radius, icons, spacing
2. Colors and typography will parse but may need grouping adjustments
3. Pages using mock data will need immediate updates to display parsed tokens
4. Parser enhancements can be done incrementally without breaking existing functionality

**The system is ready to receive and parse Tokens Studio JSON files.**

