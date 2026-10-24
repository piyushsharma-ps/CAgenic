---
name: Executive Precision
colors:
  surface: '#111317'
  surface-dim: '#111317'
  surface-bright: '#37393e'
  surface-container-lowest: '#0c0e12'
  surface-container-low: '#1a1c20'
  surface-container: '#1e2024'
  surface-container-high: '#282a2e'
  surface-container-highest: '#333539'
  on-surface: '#e2e2e8'
  on-surface-variant: '#c2c7cd'
  inverse-surface: '#e2e2e8'
  inverse-on-surface: '#2f3035'
  outline: '#8c9197'
  outline-variant: '#42474c'
  surface-tint: '#accae2'
  primary: '#c5e3fc'
  on-primary: '#143346'
  primary-container: '#a9c7df'
  on-primary-container: '#365368'
  inverse-primary: '#456277'
  secondary: '#adceb7'
  on-secondary: '#193626'
  secondary-container: '#324f3d'
  on-secondary-container: '#9fc0a9'
  tertiary: '#f5dcb3'
  on-tertiary: '#3d2e12'
  tertiary-container: '#d8c099'
  on-tertiary-container: '#5f4e2f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c8e6ff'
  primary-fixed-dim: '#accae2'
  on-primary-fixed: '#001e2e'
  on-primary-fixed-variant: '#2d4a5e'
  secondary-fixed: '#c9ebd3'
  secondary-fixed-dim: '#adceb7'
  on-secondary-fixed: '#032112'
  on-secondary-fixed-variant: '#304d3b'
  tertiary-fixed: '#f9dfb6'
  tertiary-fixed-dim: '#dbc39c'
  on-tertiary-fixed: '#261902'
  on-tertiary-fixed-variant: '#554426'
  background: '#111317'
  on-background: '#e2e2e8'
  surface-variant: '#333539'
typography:
  display:
    fontFamily: Domine
    fontSize: 3rem
    fontWeight: '500'
    lineHeight: 3.5rem
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Domine
    fontSize: 2.25rem
    fontWeight: '500'
    lineHeight: 2.75rem
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Domine
    fontSize: 2rem
    fontWeight: '500'
    lineHeight: 2.5rem
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Domine
    fontSize: 1.5rem
    fontWeight: '500'
    lineHeight: 2rem
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.6rem
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.4rem
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1.125rem
    letterSpacing: 0.01em
  financial-metric:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.02em
  label-md:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: '600'
    lineHeight: 0.875rem
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an institutional-grade, highly refined interface for high-growth enterprises and executive operators. Drawing inspiration from the quiet efficiency of developer tool Linear, the clarity and technical rigor of Stripe, and the architectural restraint of modern Swiss private banking, the UI conveys precision, absolute reliability, and understated confidence.

The design movement is an intersection of Modern Utilitarianism and Quiet Luxury. Visual noise is aggressively eliminated: there are no saturated neon accents, no decorative gradients, and no gratuitous glowing indicators. Elevation is handled through meticulously stacked surface values and delicate micro-borders rather than heavy blur artifacts or drop shadows. The resulting experience feels calm, analytical, and effortlessly capable—turning complex financial ledgers, tax projections, and cash-flow intelligence into a clear, tranquil command center.

## Colors

The system defaults to a deep charcoal dark theme engineered to reduce visual fatigue during prolonged financial auditing sessions, complemented by an immaculate light theme for high-ambient-light boardroom review.

### Dark Theme (Default)
- **Base Canvas:** `#15171B` (recessed bedrock foundation)
- **Sidebar & Navigation:** `#191C21` (structural framing layer)
- **Default Surface (Cards & Tables):** `#1D2127`
- **Elevated Interactive Surface (Popovers, Modals, Menus):** `#242932`
- **Subdued Hairline Borders:** `#303640`
- **Primary Text:** `#E3E7EC` (high-readability soft titanium)
- **Secondary / Supporting Text:** `#A5ADB8` (cool muted slate)
- **Accent Primary (Focus & Interactive Elements):** `#A9C7DF` (restrained icy blue)
- **Semantic Success (Positive Cashflow, Reconciled):** `#A7C8B1` (desaturated sage green)
- **Semantic Warning (Review Pending, Approaching Limit):** `#D9C19A` (champagne amber)
- **Semantic Error (Audit Flag, Discrepancy, Overdraft):** `#D98282` (muted coral red)

### Light Theme
- **Base Canvas:** `#F7F8FA`
- **Cards & Sidebar:** `#FFFFFF`
- **Secondary Surfaces / Wells:** `#F0F2F5`
- **Structural Borders:** `#E4E7EC`
- **Primary Text:** `#252A31`
- **Secondary Text:** `#626B77`
- **Accent Blue:** `#6486A5`
- **Semantic Success:** `#4D7C5F`
- **Semantic Warning:** `#8F7341`
- **Semantic Error:** `#A64848`

Color saturation is intentionally capped. Semantic states must guide the eye without causing emotional alarm; functional status tags rely on soft backgrounds with tinted borders rather than harsh solid fills.

## Typography

Typography pairs institutional authority with high-throughput technical efficiency.

- **Domine (Serif Accent):** Used sparingly and deliberately for high-level executive insights, primary portfolio totals, and high-impact quarterly overviews. It brings the prestige of editorial finance journals without sacrificing screen crispness.
- **Inter (Core Interface):** The operational workhorse across all navigation, controls, data visualizations, and ledger tables. Strict weight constraints are enforced: weights above 600 (Semibold) are strictly prohibited across all screens to prevent visual heaviness.
- **Tabular Numerics:** All currency, balances, percentage rates, dates, and accounting calculations must specify `font-variant-numeric: tabular-nums` (or CSS `tabular-nums`) to ensure vertical column alignment across rows and rapid scanning across balance sheets.
- **Micro Labels:** Functional tags and column metadata utilize `label-sm` with a mild tracking boost (+0.04em) in uppercase or capitalized format to guarantee contrast against dark container backgrounds.

## Layout & Spacing

The layout philosophy follows a disciplined, strict 12-column fluid grid system bounded by maximum canvas constraints to prevent horizontal scanning fatigue on ultra-wide displays.

### Layout Mechanics
- **Max Content Bounding:** 1440px max-width on desktop dashboards, centered with dynamic auto margins.
- **Sidebar Structure:** Fixed 240px navigation column on desktop; collapsible icon-rail (64px) on medium displays; off-canvas slideover sheet on mobile.
- **Rhythm & Multiples:** Built on an unwavering 4px / 8px baseline rhythm. Inner-component gaps strictly leverage `space-xs` (4px), `space-sm` (8px), and `space-md` (16px), while spatial groupings between distinct accounting modules rely on `space-lg` (24px) and `space-xl` (40px).
- **Responsive Adaptations:**
  - **Desktop (1024px+):** 12-column grid with `1.5rem` gutters and `2rem` outer canvas padding. Metric tiles arrange in 3 or 4 horizontal blocks.
  - **Tablet (768px – 1023px):** 8-column layout with `1.25rem` gutters. Metric cards wrap into 2x2 formations.
  - **Mobile (Below 768px):** Single-column stacked flow with `1rem` edge margins. Ledgers switch to pinned horizontal scrolling cards or simplified transactional abstracts.

## Elevation & Depth

Visual hierarchy is communicated via meticulous tonal layering, surface color stepping, and razor-thin boundaries rather than heavy drop shadows.

- **Stacking Tiers (Dark Theme):**
  - **Level 0 (Canvas):** `#15171B` – Structural backdrop.
  - **Level 1 (Docked/Inset):** `#191C21` – Navigation rails and header bars.
  - **Level 2 (Cards & Data Grids):** `#1D2127` – Content modules.
  - **Level 3 (Overlay / Menus / Action Sheets):** `#242932` – Elevates transient focus.
- **Boundary Precision:** Surfaces are universally framed by a `1px solid` border using `#303640` (Dark) or `#E4E7EC` (Light). Double borders or outer glow rings are prohibited.
- **Shadow Profile:** Shadows are reserved exclusively for floating panels, flyout tooltips, and modal dialogues. When deployed, they must be ultra-diffused and low-contrast:
  - `box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.35), 0 0 0 1px #303640;`
  This ensures clear separation while maintaining the crisp, planar architecture inspired by modern terminal tools.

## Shapes

This system embraces architectural precision using crisp, subtle roundedness. Extreme border radii and pill shapes degrade the seriousness expected from financial infrastructure; therefore, a structured Level 1 (Soft) geometry is standardized.

- **Micro Components (Checkboxes, Micro Badges, Tags):** `rounded` (0.25rem / 4px).
- **Interactive Elements (Buttons, Inputs, Selectors):** `rounded` (0.25rem / 4px) to `rounded-lg` (0.5rem / 8px).
- **Cards, Ledger Containers, Modals:** `rounded-lg` (0.5rem / 8px).
- **Full View Panels & Canvas Panes:** `rounded-xl` (0.75rem / 12px) maximum.
- **Prohibited:** Completely circular or pill-shaped buttons (`rounded-full`), which dilute the institutional, geometric authority of financial ledgers.

## Components

### Buttons
- **Primary Action:** Solid background using `#A9C7DF` (Dark) / `#6486A5` (Light) with dark, high-contrast typography (`#15171B` in Dark mode), weight 500, padding `0.5rem 1rem`, radius `0.25rem`. Hover introduces a 5% lightness shift without drop shadow.
- **Secondary Action:** Transparent base, `1px solid #303640`, text color `#E3E7EC`. Hover transitions surface to `#242932`.
- **Tertiary / Ghost:** No border or initial background; subtle text link in `#A5ADB8`, transitioning to `#E3E7EC` on hover.

### Inputs & Form Fields
- Height standardized to 36px for dense efficiency. Background `#15171B` inset within `#1D2127` cards.
- Border: `1px solid #303640`.
- Focus State: Border transitions seamlessly to `#A9C7DF` with zero halo/glow rings.
- Labeling: Positioned strictly above fields in `label-sm`, secondary text color.

### Financial Metric Cards
- Background `#1D2127`, framed with `1px solid #303640`, padding `space-md` (16px).
- Contains an uppercase category identifier (`label-sm`), the primary financial figure using tabular numbers and serif display typography, and a compact trend pill badge (`+14.2%`) adjacent to comparative metadata.

### Data Tables & Financial Rows
- Density is paramount. Row heights set to 44px with horizontal rule `1px solid #303640`.
- All monetary columns right-aligned with `tabular-nums`. Text descriptions left-aligned.
- Alternate row striping is omitted; visual grouping relies strictly on subtle hover transitions (`#242932`).

### Status Badges & Chips
- Non-pill, structured micro-tags (`0.25rem` radius).
- Background composed of 10% opacity tints of the status color with a matching subtle 1px border (e.g., Success: `rgba(167, 200, 177, 0.12)` background, `rgba(167, 200, 177, 0.25)` border, `#A7C8B1` text).
- Avoid bold weights; utilize weight 500 with uppercase micro-tracking.

### Selection Controls (Checkboxes & Radios)
- Dimension: 16px × 16px.
- Checkbox: Radius `2px`, border `1px solid #303640`. Checked state fills `#A9C7DF` with `#15171B` checkmark icon.
- Radio: Circular with an inner 6px solid dot; zero glow on focus.