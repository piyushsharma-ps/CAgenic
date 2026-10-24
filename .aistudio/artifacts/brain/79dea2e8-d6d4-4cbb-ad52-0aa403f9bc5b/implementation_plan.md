# Biometric Passkey Authentication & Management via Supabase Auth

Integrates authentic WebAuthn passkey biometric authentication (Face ID, Touch ID, Windows Hello, YubiKey) into CAgenix using the official `@supabase/supabase-js` experimental passkey API. Combines biometric one-tap sign-in with passwordless Email Magic Link / OTP fallback, post-login biometric enrollment, and full credential lifecycle management in Security Settings.

## User Review & Critical Decisions

> [!IMPORTANT]
> The Supabase client must be configured with `auth: { experimental: { passkey: true } }` and requires WebAuthn relying party configuration in your Supabase project dashboard. No mock biometric verification is permitted.

- **Confirmed Decision 1 (Fallback Auth)**: Passwordless Email Magic Link / OTP fallback for users signing in without an enrolled passkey, across unconfigured devices, or for account recovery.
- **Confirmed Decision 2 (Passkey Enrollment)**: Interactive biometric enrollment prompt modal shown immediately following successful email/OTP sign-in, enabling one-tap credential creation.
- **Confirmed Decision 3 (Credential Configuration & Status)**: Configurable via `.env` / environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) with an in-app setup assistant card and live connection indicator in Security Settings.

---

## 1. Overview & Core Concept

- **What It Does**: Enables corporate officers and Chartered Accountants to unlock CAgenix using hardware-backed biometrics (Touch ID, Face ID, Windows Hello) via standard FIDO2/WebAuthn discoverable credentials. Users can sign in in under a second without passwords, enroll additional passkeys across multiple devices, view and revoke active passkey credentials, or fall back to verified Email OTP/Magic Link authentication.
- **Target Audience / Persona**: Managing Directors, CFOs, and Chartered Accountants handling high-value Indian statutory filings (GSTN, MCA, TDS) requiring institutional-grade, phishing-resistant security without authentication friction.
- **Key Value**: Replaces legacy passwords with biometric discoverable credentials, guarantees cryptographically verified sessions, and safeguards sensitive financial ledgers.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Authentication Gate & Discoverable Passkey Sign-In**:
   - When no active Supabase Auth session exists, CAgenix presents an Executive Gate consistent with the Domine serif / dark slate theme (`#15171b` canvas, `#1d2127` cards, `#a9c7df` accents).
   - The primary action is **"Sign in with Biometrics / Passkey"** with WebAuthn browser detection (checks `PublicKeyCredential` support).
   - Clicking triggers `supabase.auth.signInWithPasskey()`, prompting the platform authenticator (Touch ID / Face ID / Windows Hello). Upon biometric verification, the user enters the active ledger immediately.
2. **Passwordless Fallback (Email Magic Link / OTP)**:
   - For users on new devices without an existing passkey or in browsers without platform authenticators, an **Email Magic Link / OTP** tab allows instant verification.
   - User inputs their corporate email, receives an instant OTP / magic link token, and confirms their session.
3. **Post-Authentication Passkey Enrollment Modal**:
   - Immediately following OTP/Magic Link sign-in, an onboarding modal appears: *"Secure your CAgenix Ledger with Biometrics"*.
   - Explains that passkeys provide phishing-resistant biometric access for their hardware.
   - User clicks **"Create Biometric Passkey"**, calling `supabase.auth.registerPasskey()`, and names their device (e.g., "MacBook Pro Touch ID").
4. **Security Settings & Passkey Lifecycle Management**:
   - Inside **Settings > Security & Passkeys**, users see all registered credentials with device names, creation dates, and last used indicators.
   - Users can register additional hardware keys, rename credentials, or revoke compromised/old passkeys via `supabase.auth.passkey.delete()`.
   - Displays Supabase project status, relying party domain, and instructions.

### Visual Identity & Theme Alignment

- **Design System**: Fully integrated with CAgenix Executive Precision styling (`#15171b` dark canvas, `#1d2127` elevated cards, `#303640` hairline borders, `#a9c7df` soft blue accents, `#a7c8b1` mint success indicators).
- **Zero-Pill Discipline**: Metadata (RP ID, device model, enrollment timestamps) displayed using clean unboxed typography with `·` separators.
- **State Handling**: Distinct loading spinners during WebAuthn ceremonies, graceful cancellation notifications when users dismiss the biometric prompt (`NotAllowedError`), and clear configuration banners when Supabase environment variables are pending.

---

## 3. Key Product Decisions & Trade-Offs

- **Official WebAuthn API vs. Emulated Biometrics**:
  - *Chosen Approach*: Exclusively use `@supabase/supabase-js` v2.105+ `auth.signInWithPasskey()`, `auth.registerPasskey()`, and `auth.passkey.list()`.
  - *Why*: Strict security requirement; eliminates client-side auth bypasses and ensures real FIDO2 asymmetric cryptographic proof.
- **Discoverable Credentials (Usernameless Sign-In)**:
  - *Chosen Approach*: Passkey sign-in does not require entering an email before invoking the biometric prompt; discoverable credentials resolve the user identity directly.
  - *Why*: Reduces login friction to a single tap, matching modern banking and enterprise standards.
- **Graceful Error Handling & Fallback**:
  - *Chosen Approach*: Handle `NotAllowedError` (user cancelled the prompt), `InvalidStateError` (authenticator already enrolled), browser incompatibility, and expired challenge timeouts with user-friendly actionable notices.
- **Session Enforcement**:
  - *Chosen Approach*: Global `AuthProvider` and `useAuth` hook wrapping the application. Session tokens are stored and verified by Supabase Auth with automatic refresh and listener on `onAuthStateChange`.

---

## 4. Technical Architecture & Data Strategy

### System Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                          CAgenix Client Web App                        │
│                                                                        │
│  ┌───────────────────────┐                  ┌───────────────────────┐  │
│  │   AuthContext / Hook  │                  │  Security Settings    │  │
│  │  - session / user     │◄─────────────────┤  - List Passkeys      │  │
│  │  - passkeyStatus      │                  │  - Add Hardware Key   │  │
│  │  - isWebAuthnReady    │                  │  - Revoke Credential  │  │
│  └───────────┬───────────┘                  └───────────────────────┘  │
│              │                                                         │
│              ▼                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                Supabase Client (@supabase/supabase-js)           │  │
│  │   auth: { experimental: { passkey: true } }                      │  │
│  │   - signInWithPasskey()                                          │  │
│  │   - registerPasskey()                                            │  │
│  │   - passkey.list() / delete()                                    │  │
│  │   - signInWithOtp() / verifyOtp()                                │  │
│  └───────────────┬───────────────────────────────────────┬──────────┘  │
└──────────────────┼───────────────────────────────────────┼─────────────┘
                   │                                       │
                   ▼                                       ▼
       ┌────────────────────────┐              ┌────────────────────────┐
       │   Browser WebAuthn     │              │  Supabase Auth Backend │
       │  navigator.credentials │              │  - RP ID Verification  │
       │  - Touch ID / Face ID  │              │  - FIDO2 Challenge/Res │
       │  - Windows Hello       │              │  - JWT Session Issuance│
       └────────────────────────┘              └────────────────────────┘
```

### Component & State Mapping

1. **`src/lib/supabaseClient.ts`**:
   - Initializes the Supabase client with `experimental: { passkey: true }`.
   - Validates environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) with graceful fallback mode and diagnostic helper.
2. **`src/context/AuthContext.tsx`**:
   - Manages `user`, `session`, `loading`, and `isPasskeySupported`.
   - Listens to `supabase.auth.onAuthStateChange` to keep session tokens in sync.
   - Provides `loginWithPasskey`, `registerNewPasskey`, `sendOtp`, `verifyOtp`, `logout`, and `fetchPasskeys`.
3. **`src/components/auth/LoginView.tsx`**:
   - Clean executive login screen styled to match CAgenix.
   - "Sign in with Biometrics / Passkey" button with loading and error states.
   - Passwordless Email Magic Link / OTP fallback form with clean tab switching.
   - Supabase connection status badge and quick-setup drawer for setting up project URL & anon key.
4. **`src/components/auth/RegisterPasskeyModal.tsx`**:
   - Triggered immediately after email/OTP sign-in if the user has no registered passkeys.
   - Allows naming the device credential and invoking `registerPasskey()`.
5. **`src/components/SettingsView.tsx` (Security & Passkeys Section)**:
   - Added Security tab / card with list of active passkeys, "Register New Device" action, rename/delete actions, and Relying Party domain verification indicators.
6. **`src/App.tsx` Integration**:
   - Renders `LoginView` when unauthenticated, and provides session state and sign-out controls in `Header.tsx`.

---

## 5. Verification & Testing Plan

1. **Static Analysis & Dependencies**:
   - Install `@supabase/supabase-js` (latest stable with passkey support) and verify TypeScript types compile cleanly without breaking existing dependencies.
2. **Browser Compatibility Check**:
   - Verify `window.PublicKeyCredential` detection handles supported and unsupported environments safely.
3. **Ceremony Exception Handling**:
   - Simulate user cancellation (`NotAllowedError`) to verify no unhandled promise rejections or infinite loading states.
4. **Configuration Guidance**:
   - Provide explicit, step-by-step instructions for configuring the Supabase Dashboard (RP ID, Allowed Origins) matching the Cloud Run deployment domain (`https://ais-dev-...run.app`).
