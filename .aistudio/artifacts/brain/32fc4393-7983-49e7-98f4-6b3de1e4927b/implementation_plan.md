# CAgenix - Indian Financial Operating System & GST/TDS Ledger

Transforms CAgenix from US Dollar and IRS GAAP mechanics into an institutional-grade Indian enterprise financial command center. The system adopts the Indian Rupee (₹), Lakhs and Crores numbering conventions, statutory GST (CGST/SGST/IGST) and TDS compliance frameworks, and Indian banking and payment gateway rails (Razorpay, UPI, HDFC Bank, ICICI Bank, Cashfree).

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural decisions were confirmed during Phase 1 clarification:
> - **Domain & Tax Scope**: Tailored for Indian Direct-to-Consumer (D2C) and modern omnichannel retail enterprises requiring unified Goods & Services Tax (GST) returns (GSTR-1, GSTR-3B) and Tax Deducted at Source (TDS) under Section 194C/194J/194Q.
> - **Currency & Numerics**: Formatted using the Indian Numbering System with Lakhs (`L`) and Crores (`Cr`) with official Indian Rupee currency notation (`₹`, `tabular-nums`, e.g. `₹84,23,050.00` or `₹84.23 L`).
> - **Banking & Payment Rails**: Integrated with Razorpay settlement batches, UPI QR merchant collections, HDFC Corporate Current Account, ICICI CMS, and Cashfree Vendor Payouts.
> - **Executive Precision Aesthetic**: Retains the deep charcoal and quiet luxury Swiss banking visual grammar (Inter + Domine typography, zero-pill structured micro-tags, hairline borders) adapted for Indian compliance.

---

### 1. Overview & Core Concept

- **What It Does**: CAgenix functions as an autonomous double-entry general ledger, automated GST return validator, and AI Chief Financial Officer (CFO) for Indian enterprise operators. It monitors daily Razorpay/UPI inflows, tracks supplier GST compliance (2B reconciliation), enforces TDS deductions prior to vendor payouts, and computes provisional Advance Tax liability.
- **Target Audience / Persona**: Indian startup founders, D2C brand operators, CFOs, and Chartered Accountants (CAs) managing high-volume domestic and inter-state transactions.
- **Key Value**: Eliminates manual GST reconciliation discrepancies, prevents input tax credit (ITC) leakage under Section 16(2)(aa), flags pending e-invoices, and provides real-time cash runway intelligence in Indian Rupees.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Executive Morning Briefing**:
   - The user lands on the dashboard greeting *"Good morning, Marcus"* with live GSTN & Razorpay sync indicator.
   - High-level metric cards display **Total Sales (₹84.23 L)**, **Total Expenses (₹41.89 L)**, and **Net Profit (₹42.34 L / 50.2% Margin)** in Indian numbering.
2. **GST & Input Tax Credit (ITC) Scrutiny**:
   - The attention queue highlights actionable compliance blockers: an overdue B2B invoice from *Nordic Designs India Pvt Ltd*, unassigned UPI/Razorpay merchant settlements, and missing GST Tax Invoices for AWS India (Amazon Internet Services Pvt Ltd - AISPL) with SAC code `998315`.
3. **Conversational Indian Virtual CA**:
   - The Autonomous Financial Assistant answers queries on GSTR-3B liability, Advance Tax deposits (15% by June 15, 45% by Sept 15, 75% by Dec 15), and Section 194C contractor withholding.

#### Visual Identity & Theme
- **Color Tokens**:
  - Base Bedrock: Deep Charcoal `#15171B` (Dark) / Pure Off-White `#F7F8FA` (Light)
  - Cards & Containers: `#1D2127` with hairline micro-borders `#303640`
  - Semantic Green (GST Reconciled / Positive Cash Flow): `#A7C8B1` (Sage Green)
  - Semantic Amber (TDS Due / Pending 2B Match): `#D9C19A` (Champagne Amber)
  - Semantic Coral (GSTIN Mismatch / E-way Bill Expired / Overdue): `#D98282`
- **Typography & Formatting**:
  - Headline Serif: `Domine` (Medium, high authority)
  - Interface Workhorse: `Inter` with strict `font-variant-numeric: tabular-nums`
  - Currency Formatter: Standard Indian regex formatting `12,34,567.89` with `₹` symbol prefix

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Dual Formatting (Lakh/Crore Abbreviation + Exact Tabular Rupee)**
  - *Chosen Approach*: Card summaries display prominent Lakh/Crore totals (e.g. `₹84,23,050.00` with clean subtitle `₹84.23 L`), while tables and audit sheets display exact rupees.
  - *Why*: Allows instantaneous executive scanning without sacrificing ledger arithmetic precision down to paise.
- **Decision 2: Indian Compliance Entities & GST State Code Logic**
  - *Chosen Approach*: Entity profiles feature GSTINs (e.g. `27AAACA1234F1Z5` for Maharashtra, `29AAACA1234F1Z2` for Karnataka) and automatically classify sales into CGST+SGST (Intra-state) vs IGST (Inter-state).
  - *Why*: Accurate tax computation requires distinguishing place of supply from supplier state.
- **Decision 3: Indian Payment Gateway & Banking Data Models**
  - *Chosen Approach*: Replaces Square/Stripe/Chase with Razorpay Daily Settlements, Cashfree Payouts, UPI QR Collections, and HDFC Bank Current Accounts.
  - *Why*: Matches the authentic day-to-day transaction records of Indian businesses.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CAgenix Client Application                      │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                 Navigation & Top Command Bar                   │   │
│   │   Entity Switcher (Apex Retailers Pvt Ltd) · Search (⌘K)       │   │
│   │   Live Sync (Razorpay / GSTN) · Theme Toggle · User Profile    │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                   │                                    │
│   ┌───────────────────────────────┴────────────────────────────────┐   │
│   │                         Active View Router                     │   │
│   │                                                                │   │
│   │  ┌───────────────┐ ┌───────────────┐ ┌──────────────────────┐  │   │
│   │  │ Overview View │ │ AI CA Copilot │ │ Ledger (GST/TDS)     │  │   │
│   │  └───────────────┘ └───────────────┘ └──────────────────────┘  │   │
│   │  ┌───────────────┐ ┌───────────────┐ ┌──────────────────────┐  │   │
│   │  │ Documents/OCR │ │ Cash Flow (₹) │ │ GST & Advance Tax    │  │   │
│   │  └───────────────┘ └───────────────┘ └──────────────────────┘  │   │
│   │  ┌───────────────┐ ┌───────────────┐                           │   │
│   │  │ Counterparties│ │ Org Settings  │                           │   │
│   │  └───────────────┘ └───────────────┘                           │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                   │                                    │
│   ┌───────────────────────────────┴────────────────────────────────┐   │
│   │                   Indian Financial Engine Core                 │   │
│   │  · Indian Currency Numbering Utility (en-IN Lakh/Crore)       │   │
│   │  · GST Splitter: CGST (9%) + SGST (9%) or IGST (18%)           │   │
│   │  · TDS Calculator: 194C (1%/2%), 194J (10%), 194Q (0.1%)       │   │
│   │  · GSTR-2B ITC Matching & Audit Risk Scoring                   │   │
│   └────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

#### Component & State Transitions
- **`formatINR(amount, formatType)`**: Custom formatter implementing Indian comma grouping (`₹#,##,##,###.##`) and abbreviated Lakh/Crore strings (`₹84.23 L`, `₹1.42 Cr`).
- **Entity Model**:
  - `Apex Retailers India Pvt Ltd` (GSTIN: `27AABCA5521H1ZM`, Mumbai, Maharashtra)
  - `Apex Logistics & Warehousing LLP` (GSTIN: `29AABCA5521H1ZP`, Bengaluru, Karnataka)
  - `Vance Technologies India Pvt Ltd` (GSTIN: `07AABCA5521H1ZT`, New Delhi)
- **Attention Queue Items**:
  - *Invoice #INV-2024-089 from Nordic Designs India Pvt Ltd* (₹3,42,000.00 • 4 days overdue, with GST e-Invoice IRN).
  - *2 Unassigned bank transactions* (₹1,28,000.00 from Razorpay Route settlements).
  - *Missing AISPL AWS GST Tax Invoice* (Amazon Internet Services Pvt Ltd, ₹42,900.00 • GST credit pending).
- **Recent Activity**:
  - *Razorpay Settlement batch imported* (142 UPI & Netbanking payments synced: ₹6,84,000.00).
  - *Invoice #INV-2024-084 marked as paid* (Tata Supply Chain Solutions: ₹12,50,000.00 via RTGS).
  - *August GSTR-3B & TDS Monthly Return Finalized* (Filed on GSTN portal & locked in compliance vault).
