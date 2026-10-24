import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { ViewId } from '../types';

interface InsightsViewProps {
  onNavigate: (view: ViewId) => void;
}

export const InsightsView: React.FC<InsightsViewProps> = ({ onNavigate }) => {
  const alerts = [
    {
      id: 'al-1',
      title: 'Invoice #INV-2024-089 Overdue (Nordic Designs India Pvt Ltd)',
      severity: 'high',
      description:
        'Tax Invoice for ₹3,42,000.00 is 4 days past Net 30 terms. e-Invoice IRN has been validated on the IRP portal. Counterparty payment delay is impacting working capital.',
      impact: 'DSO increased by +2.1 days; ₹3,42,000 locked in receivables.',
      action: 'Send NEFT/UPI payment reminder',
      targetView: 'overview' as ViewId,
    },
    {
      id: 'al-2',
      title: 'Missing AISPL AWS Tax Invoice (GST Credit at Risk)',
      severity: 'medium',
      description:
        'Amazon Internet Services Pvt Ltd (AISPL) compute charges of ₹42,900.00 posted on Sep 19. GST Tax Invoice with SAC 998315 has not been uploaded to the vault.',
      impact: 'Risk of ₹6,544.00 Input Tax Credit (ITC) disallowance under Section 16(2)(aa).',
      action: 'Upload GST Tax Invoice PDF',
      targetView: 'documents' as ViewId,
    },
    {
      id: 'al-3',
      title: 'Uncategorized Razorpay Route Settlement Batches',
      severity: 'medium',
      description:
        '2 payout transactions totaling ₹1,28,000.00 have not been mapped to specific product revenue vs platform fees sub-accounts.',
      impact: 'Understates gross D2C turnover and delays GSTR-1 outward supply reconciliation.',
      action: 'Run AI Auto-Categorize',
      targetView: 'transactions' as ViewId,
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-8 max-w-[1440px] mx-auto w-full">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="font-serif text-2xl font-medium text-[#e3e7ec]">
            Autonomous Business Insights & Indian Audit Engine
          </h1>
          <span className="rounded-[2px] border border-[rgba(217,193,154,0.3)] bg-[rgba(217,193,154,0.12)] px-2 py-0.5 text-[10px] font-semibold text-[#d9c19a]">
            3 Active Alerts
          </span>
        </div>
        <p className="text-[13px] text-[#a5adb8]">
          Real-time general ledger scrutiny, Section 16(2)(aa) ITC protection, and cash-flow risk mitigation
        </p>
      </div>

      {/* Health Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-[6px] border border-[#303640] bg-[#1d2127] p-5">
          <span className="text-[11px] font-semibold uppercase text-[#8c9197]">
            GSTN & Ledger Audit Score
          </span>
          <div className="mt-1 font-serif text-3xl font-medium text-[#a7c8b1]">94 / 100</div>
          <span className="text-[11px] text-[#8c9197] mt-1 block">
            Top 5% quartile for Indian D2C and retail enterprises
          </span>
        </div>

        <div className="rounded-[6px] border border-[#303640] bg-[#1d2127] p-5">
          <span className="text-[11px] font-semibold uppercase text-[#8c9197]">
            Working Capital Ratio
          </span>
          <div className="mt-1 font-serif text-3xl font-medium text-[#e3e7ec] tabular-nums">2.41x</div>
          <span className="text-[11px] text-[#a7c8b1] mt-1 block">
            ✓ Healthy buffer above Indian commercial banking covenants
          </span>
        </div>

        <div className="rounded-[6px] border border-[#303640] bg-[#1d2127] p-5">
          <span className="text-[11px] font-semibold uppercase text-[#8c9197]">
            Days Sales Outstanding (DSO)
          </span>
          <div className="mt-1 font-serif text-3xl font-medium text-[#e3e7ec] tabular-nums">19.4 Days</div>
          <span className="text-[11px] text-[#8c9197] mt-1 block">
            Fast cash conversion through UPI instant settlements
          </span>
        </div>
      </div>

      {/* 3 Alerts List */}
      <div className="flex flex-col gap-4">
        <h3 className="font-serif text-base font-medium text-[#e3e7ec]">
          Active Audit Flags & Opportunities
        </h3>

        <div className="flex flex-col gap-3">
          {alerts.map((al) => (
            <div
              key={al.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[6px] border border-[#303640] bg-[#1d2127] p-5 transition-colors hover:border-[#42474c]"
            >
              <div className="flex items-start gap-3.5 max-w-3xl">
                <div
                  className={`mt-1 flex h-8 w-8 items-center justify-center rounded-[4px] border shrink-0 ${
                    al.severity === 'high'
                      ? 'border-[rgba(217,130,130,0.3)] bg-[rgba(217,130,130,0.12)] text-[#d98282]'
                      : 'border-[rgba(217,193,154,0.3)] bg-[rgba(217,193,154,0.12)] text-[#d9c19a]'
                  }`}
                >
                  <AlertTriangle size={16} />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[14px] text-[#e3e7ec]">{al.title}</span>
                    <span
                      className={`rounded-[2px] px-1.5 py-0.5 text-[9px] font-semibold uppercase ${
                        al.severity === 'high'
                          ? 'border border-[rgba(217,130,130,0.3)] text-[#d98282]'
                          : 'border border-[rgba(217,193,154,0.3)] text-[#d9c19a]'
                      }`}
                    >
                      {al.severity} risk
                    </span>
                  </div>
                  <p className="text-[12px] text-[#a5adb8] leading-relaxed">{al.description}</p>
                  <span className="text-[11px] font-mono text-[#8c9197]">
                    Financial Impact: {al.impact}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onNavigate(al.targetView)}
                className="flex items-center gap-1.5 rounded-[4px] bg-[#c5e3fc] px-3.5 py-1.5 text-[12px] font-medium text-[#143346] hover:bg-[#d8edfd] whitespace-nowrap self-start sm:self-center"
              >
                <span>{al.action}</span>
                <ArrowRight size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
