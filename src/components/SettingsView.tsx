import React, { useState } from 'react';
import {
  Shield,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Database,
  Lock,
} from 'lucide-react';
import { Entity } from '../types';
import { useAuth } from '../context/AuthContext';
import firebaseConfig from '../../firebase-applet-config.json';

interface SettingsViewProps {
  selectedEntity: Entity;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ selectedEntity }) => {
  const { user, updateUserPassword } = useAuth();

  const [accountingStandard, setAccountingStandard] = useState<'IndAS' | 'AS'>('IndAS');
  const [autoReconcile, setAutoReconcile] = useState(true);
  const [eInvoiceAutoIRN, setEInvoiceAutoIRN] = useState(true);
  const [savedNotification, setSavedNotification] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const integrations = [
    { name: 'Google Cloud Firestore Real-time Engine', status: 'Connected', lastSync: 'Realtime', icon: '🔥' },
    { name: 'HDFC Corporate Current Banking', status: 'Connected', lastSync: '1m ago', icon: '🏛️' },
    { name: 'ICICI CMS Commercial Netbanking', status: 'Connected', lastSync: '10m ago', icon: '🏦' },
    { name: 'Razorpay UPI & Gateway Suite', status: 'Connected', lastSync: '4m ago', icon: '⚡' },
    { name: 'Cashfree Vendor Payouts Engine', status: 'Connected', lastSync: '15m ago', icon: '💳' },
    { name: 'GSTN Portal API (GSP: ClearTax/NIC)', status: 'Connected', lastSync: '1h ago', icon: '🇮🇳' },
    { name: 'Amazon Internet Services (AISPL AWS)', status: 'Connected', lastSync: '1d ago', icon: '☁️' },
  ];

  const handleSave = () => {
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSuccess(null);
    setPasswordError(null);

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }

    setIsUpdatingPassword(true);
    const res = await updateUserPassword(newPassword);
    setIsUpdatingPassword(false);

    if (res.success) {
      setPasswordSuccess('Account password updated successfully.');
      setNewPassword('');
      setTimeout(() => setPasswordSuccess(null), 3500);
    } else {
      setPasswordError(res.error || 'Failed to update password.');
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-8 max-w-[1000px] mx-auto w-full">
      <div>
        <h1 className="font-serif text-2xl font-medium text-[#e3e7ec]">
          Indian Entity & Statutory Settings
        </h1>
        <p className="text-[13px] text-[#a5adb8]">
          Ministry of Corporate Affairs (MCA) standards, Google Cloud Firestore database, and domestic banking integrations
        </p>
      </div>

      {/* Google Cloud Database & Identity Card */}
      <div className="rounded-[8px] border border-[#303640] bg-[#1d2127] p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[#303640] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-[#15171b] border border-[#a7c8b1]/40 text-[#a7c8b1]">
              <Database size={18} />
            </div>
            <div>
              <h3 className="font-serif text-base font-medium text-[#e3e7ec]">
                Google Cloud Firestore & Authentication
              </h3>
              <p className="text-[11px] text-[#8c9197]">
                Live Google Cloud persistent ledger storage & identity management
              </p>
            </div>
          </div>
          <span className="rounded-[2px] bg-[rgba(167,200,177,0.12)] border border-[rgba(167,200,177,0.3)] px-2 py-0.5 text-[10px] text-[#a7c8b1]">
            Active · Synced
          </span>
        </div>

        {/* Database Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[12px]">
          <div className="rounded-[4px] border border-[#303640] bg-[#15171b] p-3 flex flex-col gap-1">
            <span className="text-[10px] uppercase font-semibold text-[#8c9197]">Google Cloud Project</span>
            <span className="font-mono text-[11px] text-[#c5e3fc] truncate">
              {firebaseConfig.projectId}
            </span>
            <span className="text-[10px] text-[#8c9197]">Enterprise GCP Region</span>
          </div>

          <div className="rounded-[4px] border border-[#303640] bg-[#15171b] p-3 flex flex-col gap-1">
            <span className="text-[10px] uppercase font-semibold text-[#8c9197]">Database Instance</span>
            <span className="font-mono text-[11px] text-[#e3e7ec] truncate">
              {firebaseConfig.firestoreDatabaseId}
            </span>
            <span className="text-[10px] text-[#a7c8b1]">Real-time onSnapshot sync</span>
          </div>

          <div className="rounded-[4px] border border-[#303640] bg-[#15171b] p-3 flex flex-col gap-1">
            <span className="text-[10px] uppercase font-semibold text-[#8c9197]">Signed-in Account</span>
            <span className="font-medium text-[#e3e7ec] text-[11px] truncate">
              {user ? user.email : 'No active session'}
            </span>
            <span className="text-[10px] text-[#a7c8b1]">
              {user ? `UID: ${user.uid.slice(0, 10)}...` : 'Sign in to access ledger'}
            </span>
          </div>
        </div>

        {/* Account Password Form */}
        <div className="border-t border-[#303640] pt-3 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[12px] font-medium text-[#e3e7ec]">
            <Lock size={13} className="text-[#a9c7df]" />
            <span>Update Account Password</span>
          </div>

          {passwordSuccess && (
            <div className="flex items-center gap-2 rounded-[4px] border border-[#a7c8b1]/30 bg-[#15171b] p-2 text-[12px] text-[#a7c8b1]">
              <CheckCircle2 size={13} className="shrink-0" />
              <span>{passwordSuccess}</span>
            </div>
          )}

          {passwordError && (
            <div className="flex items-center gap-2 rounded-[4px] border border-[#d98282]/40 bg-[#15171b] p-2 text-[12px] text-[#d98282]">
              <AlertCircle size={13} className="shrink-0" />
              <span>{passwordError}</span>
            </div>
          )}

          <form onSubmit={handlePasswordUpdate} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-md">
            <input
              type="password"
              placeholder="Enter new password (min 6 chars)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={isUpdatingPassword || !user}
              className="flex-1 rounded-[4px] border border-[#303640] bg-[#15171b] px-3 py-1.5 text-[12px] text-[#e3e7ec] placeholder-[#42474c] focus:border-[#a9c7df] focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isUpdatingPassword || !user || !newPassword}
              className="flex items-center justify-center gap-1.5 rounded-[4px] bg-[#242932] border border-[#303640] px-3.5 py-1.5 text-[12px] text-[#e3e7ec] hover:bg-[#303640] transition-colors disabled:opacity-50 shrink-0"
            >
              {isUpdatingPassword ? <Loader2 size={13} className="animate-spin text-[#a9c7df]" /> : null}
              <span>Update Password</span>
            </button>
          </form>
        </div>
      </div>

      {/* Accounting Standard Card */}
      <div className="rounded-[8px] border border-[#303640] bg-[#1d2127] p-5 flex flex-col gap-4">
        <h3 className="font-serif text-base font-medium text-[#e3e7ec]">
          Statutory Accounting Standards (MCA & ICAI)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label
            onClick={() => setAccountingStandard('IndAS')}
            className={`flex items-start gap-3 rounded-[4px] border p-3.5 cursor-pointer transition-colors ${
              accountingStandard === 'IndAS'
                ? 'border-[#a9c7df] bg-[#242932]'
                : 'border-[#303640] bg-[#15171b]'
            }`}
          >
            <input
              type="radio"
              checked={accountingStandard === 'IndAS'}
              onChange={() => setAccountingStandard('IndAS')}
              className="mt-1 accent-[#a9c7df]"
            />
            <div className="flex flex-col">
              <span className="font-medium text-[13px] text-[#e3e7ec]">
                Indian Accounting Standards (Ind AS)
              </span>
              <span className="text-[11px] text-[#8c9197]">
                Converged with IFRS for listed and qualifying Indian private/public limited companies
              </span>
            </div>
          </label>

          <label
            onClick={() => setAccountingStandard('AS')}
            className={`flex items-start gap-3 rounded-[4px] border p-3.5 cursor-pointer transition-colors ${
              accountingStandard === 'AS'
                ? 'border-[#a9c7df] bg-[#242932]'
                : 'border-[#303640] bg-[#15171b]'
            }`}
          >
            <input
              type="radio"
              checked={accountingStandard === 'AS'}
              onChange={() => setAccountingStandard('AS')}
              className="mt-1 accent-[#a9c7df]"
            />
            <div className="flex flex-col">
              <span className="font-medium text-[13px] text-[#e3e7ec]">
                Standard Accounting Standards (AS)
              </span>
              <span className="text-[11px] text-[#8c9197]">
                Applicable for Indian SMEs, partnerships, and Section 44AA tax audit compliance
              </span>
            </div>
          </label>
        </div>

        {/* GST & Automation Switches */}
        <div className="flex flex-col gap-3 border-t border-[#303640] pt-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[13px] font-medium text-[#e3e7ec]">
                Automated GSTR-2B Input Tax Credit Matching
              </span>
              <span className="text-[11px] text-[#8c9197]">
                Auto-scrutinize supplier GSTIN filings every 24 hours to prevent ITC loss under Section 16(2)(aa)
              </span>
            </div>
            <button
              onClick={() => setAutoReconcile(!autoReconcile)}
              className={`h-6 w-11 rounded-full p-0.5 transition-colors ${
                autoReconcile ? 'bg-[#a9c7df]' : 'bg-[#303640]'
              }`}
            >
              <div
                className={`h-5 w-5 rounded-full bg-[#15171b] transition-transform ${
                  autoReconcile ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between border-t border-[#303640]/50 pt-3">
            <div className="flex flex-col">
              <span className="text-[13px] font-medium text-[#e3e7ec]">
                NIC e-Invoice & QR Code Generation
              </span>
              <span className="text-[11px] text-[#8c9197]">
                Generate signed IRN and B2B QR code on IRP portal automatically for invoices exceeding ₹5 Lakhs
              </span>
            </div>
            <button
              onClick={() => setEInvoiceAutoIRN(!eInvoiceAutoIRN)}
              className={`h-6 w-11 rounded-full p-0.5 transition-colors ${
                eInvoiceAutoIRN ? 'bg-[#a9c7df]' : 'bg-[#303640]'
              }`}
            >
              <div
                className={`h-5 w-5 rounded-full bg-[#15171b] transition-transform ${
                  eInvoiceAutoIRN ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Connected Financial Data Feeds */}
      <div className="rounded-[8px] border border-[#303640] bg-[#1d2127] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-base font-medium text-[#e3e7ec]">
            Connected Indian Banking Feeds & Payment Rails
          </h3>
          <span className="text-[11px] text-[#a7c8b1]">All Indian nodes operational</span>
        </div>

        <div className="flex flex-col divide-y divide-[#303640]">
          {integrations.map((item) => (
            <div key={item.name} className="flex items-center justify-between py-3 text-[12px]">
              <div className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <div className="flex flex-col">
                  <span className="font-medium text-[#e3e7ec]">{item.name}</span>
                  <span className="text-[11px] text-[#8c9197]">Last sync: {item.lastSync}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-[2px] bg-[rgba(167,200,177,0.12)] border border-[rgba(167,200,177,0.3)] px-2 py-0.5 text-[10px] text-[#a7c8b1]">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        {savedNotification && (
          <span className="text-[12px] text-[#a7c8b1] self-center">
            ✓ Indian statutory parameters saved to secure vault
          </span>
        )}
        <button
          onClick={handleSave}
          className="rounded-[4px] bg-[#c5e3fc] px-5 py-2 text-[13px] font-medium text-[#143346] hover:bg-[#d8edfd]"
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
};
