import React, { useState } from 'react';
import {
  TrendingUp,
  ArrowUpRight,
  Layers,
  Calendar,
} from 'lucide-react';
import { CASH_FLOW_POINTS } from '../data/mockData';
import { formatINR, formatINRAbbreviated } from '../utils/formatters';

export const CashFlowView: React.FC = () => {
  const [selectedHorizon, setSelectedHorizon] = useState<'30d' | '90d' | '12m'>('30d');

  const expenseBreakdown = [
    { category: 'Salaries & Staff Welfare (TDS deducted)', amount: 2240000.0, percent: 53.5, color: '#c5e3fc' },
    { category: 'Bhiwandi Warehouse Lease Q3', amount: 620000.0, percent: 14.8, color: '#adceb7' },
    { category: 'Surat Textiles Raw Fabric (COGS)', amount: 553070.0, percent: 13.2, color: '#f5dcb3' },
    { category: 'Digital Ads (Meta India & Gupshup)', amount: 460000.0, percent: 11.0, color: '#accae2' },
    { category: 'Delhivery Surface Logistics', amount: 184050.0, percent: 4.4, color: '#d9c19a' },
    { category: 'Cloud Infrastructure (AISPL AWS)', amount: 131900.0, percent: 3.1, color: '#a7c8b1' },
  ];

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-8 max-w-[1440px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-medium text-[#e3e7ec]">
            Cash Flow & Liquidity Intelligence (₹)
          </h1>
          <p className="text-[13px] text-[#a5adb8]">
            Operating, investing, and financing liquidity with 14-month solvency forecasting in Indian Rupees
          </p>
        </div>

        {/* Horizon switcher */}
        <div className="flex items-center rounded-[4px] border border-[#303640] bg-[#1d2127] p-0.5 text-[12px]">
          {(['30d', '90d', '12m'] as const).map((hz) => (
            <button
              key={hz}
              onClick={() => setSelectedHorizon(hz)}
              className={`rounded-[2px] px-3 py-1 font-medium transition-colors ${
                selectedHorizon === hz
                  ? 'bg-[#242932] text-[#e3e7ec]'
                  : 'text-[#8c9197] hover:text-[#e3e7ec]'
              }`}
            >
              {hz === '30d' ? '30 Days' : hz === '90d' ? 'Quarterly' : '12 Months'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-[6px] border border-[#303640] bg-[#1d2127] p-4">
          <span className="text-[11px] font-semibold text-[#8c9197] uppercase">Net Operating Cash Flow</span>
          <div className="mt-1 font-serif text-2xl font-medium text-[#a7c8b1] tabular-nums">
            +₹42,34,030.30
          </div>
          <div className="text-[11px] font-mono text-[#8c9197]">Equivalent: +₹42.34 L</div>
          <span className="mt-2 text-[11px] text-[#a7c8b1] flex items-center gap-1">
            <ArrowUpRight size={13} /> +23.1% vs August
          </span>
        </div>

        <div className="rounded-[6px] border border-[#303640] bg-[#1d2127] p-4">
          <span className="text-[11px] font-semibold text-[#8c9197] uppercase">Monthly Net Burn Rate</span>
          <div className="mt-1 font-serif text-2xl font-medium text-[#e3e7ec] tabular-nums">
            ₹41,89,020.20
          </div>
          <div className="text-[11px] font-mono text-[#8c9197]">Equivalent: ₹41.89 L / mo</div>
          <span className="mt-2 text-[11px] text-[#d9c19a] flex items-center gap-1">
            <TrendingUp size={13} /> +3.2% festive expansion
          </span>
        </div>

        <div className="rounded-[6px] border border-[#303640] bg-[#1d2127] p-4">
          <span className="text-[11px] font-semibold text-[#8c9197] uppercase">Zero-Revenue Runway</span>
          <div className="mt-1 font-serif text-2xl font-medium text-[#c5e3fc] tabular-nums">14.2 Months</div>
          <span className="mt-2 text-[11px] text-[#8c9197]">
            Liquid reserves: ₹5.95 Cr (HDFC & ICICI)
          </span>
        </div>

        <div className="rounded-[6px] border border-[#303640] bg-[#1d2127] p-4">
          <span className="text-[11px] font-semibold text-[#8c9197] uppercase">Operating Cash Flow Margin</span>
          <div className="mt-1 font-serif text-2xl font-medium text-[#e3e7ec] tabular-nums">50.2%</div>
          <span className="mt-2 text-[11px] text-[#a7c8b1]">
            Institutional Grade (A+)
          </span>
        </div>
      </div>

      {/* Expense Distribution Table & Visual Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-[8px] border border-[#303640] bg-[#1d2127] p-5">
          <h3 className="font-serif text-base font-medium text-[#e3e7ec] mb-4">
            Operational Outflow by Ledger Code
          </h3>

          {/* Stacked Progress Bar */}
          <div className="flex h-3 w-full overflow-hidden rounded-[3px] bg-[#15171b] mb-5">
            {expenseBreakdown.map((item) => (
              <div
                key={item.category}
                style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                title={`${item.category}: ${item.percent}%`}
              />
            ))}
          </div>

          <div className="flex flex-col divide-y divide-[#303640]/60">
            {expenseBreakdown.map((item) => (
              <div key={item.category} className="flex items-center justify-between py-2.5 text-[12px]">
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-2.5 w-2.5 rounded-[2px]"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[#e3e7ec]">{item.category}</span>
                </div>
                <div className="flex items-center gap-3 tabular-nums">
                  <span className="text-[#8c9197]">{item.percent}%</span>
                  <span className="font-medium text-[#e3e7ec]">
                    {formatINR(item.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cash Inflow vs Outflow Weekly Waterfall */}
        <div className="rounded-[8px] border border-[#303640] bg-[#1d2127] p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-base font-medium text-[#e3e7ec] mb-1">
              Weekly Inflows & Settlements (₹)
            </h3>
            <p className="text-[12px] text-[#8c9197] mb-4">
              Razorpay UPI & card settlements vs vendor payouts and statutory disbursements
            </p>

            <div className="flex flex-col gap-3">
              {CASH_FLOW_POINTS.map((pt) => {
                const totalVol = pt.inflow + pt.outflow;
                const inflowPct = Math.round((pt.inflow / totalVol) * 100);
                return (
                  <div key={pt.displayDate} className="flex flex-col gap-1 text-[12px]">
                    <div className="flex justify-between items-center text-[#a5adb8]">
                      <span className="font-medium text-[#e3e7ec]">{pt.displayDate}</span>
                      <span className="tabular-nums text-[#a7c8b1]">
                        +{formatINRAbbreviated(pt.inflow)} / <span className="text-[#e3e7ec]">-{formatINRAbbreviated(pt.outflow)}</span>
                      </span>
                    </div>
                    <div className="flex h-2 w-full overflow-hidden rounded-[2px] bg-[#15171b]">
                      <div
                        className="bg-[#a7c8b1]"
                        style={{ width: `${inflowPct}%` }}
                      />
                      <div
                        className="bg-[#d98282]"
                        style={{ width: `${100 - inflowPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#303640] text-[11px] text-[#8c9197] flex justify-between">
            <span>● Green: Operating Collections (UPI/Cards)</span>
            <span>● Coral: Disbursements & TDS</span>
          </div>
        </div>
      </div>
    </div>
  );
};
