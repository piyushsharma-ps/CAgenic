import React, { useState } from 'react';
import {
  Calendar,
  Plus,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  Scale,
  Sparkles,
  ArrowLeftRight,
  CircleDollarSign,
  Lock,
  UploadCloud,
  Send,
  Wand2,
  ChevronRight,
  Check,
  X,
} from 'lucide-react';
import {
  Entity,
  ViewId,
  AttentionItem,
  ActivityItem,
  CashFlowDataPoint,
} from '../types';
import {
  METRIC_CARDS,
  CASH_FLOW_POINTS,
  PRESET_AI_ANSWERS,
} from '../data/mockData';
import { formatINR, formatINRAbbreviated } from '../utils/formatters';

interface OverviewViewProps {
  selectedEntity: Entity;
  onNavigate: (view: ViewId) => void;
  onOpenAddData: () => void;
  onOpenReviewInvoice: (item: AttentionItem) => void;
  onOpenSendReminder: (item: AttentionItem) => void;
  onOpenUploadReceipt: (item: AttentionItem) => void;
  attentionItems: AttentionItem[];
  onAutoCategorize: () => void;
  activities: ActivityItem[];
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  selectedEntity,
  onNavigate,
  onOpenAddData,
  onOpenReviewInvoice,
  onOpenSendReminder,
  onOpenUploadReceipt,
  attentionItems,
  onAutoCategorize,
  activities,
}) => {
  const [trendMode, setTrendMode] = useState<'net' | 'inflow-outflow'>('net');
  const [selectedPointIndex, setSelectedPointIndex] = useState<number>(3); // Sep 22
  const [aiQuery, setAiQuery] = useState('');
  const [activeAiAnswer, setActiveAiAnswer] = useState<{
    query: string;
    answer: string;
    highlights: string[];
    metrics?: { label: string; val: string }[];
  } | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [dateRangeText, setDateRangeText] = useState('01 Sep – 30 Sep 2024');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleAskAi = (promptText?: string) => {
    const textToAsk = promptText || aiQuery;
    if (!textToAsk.trim()) return;

    setIsAiLoading(true);
    setTimeout(() => {
      const matchKey = Object.keys(PRESET_AI_ANSWERS).find(
        (key) => key.toLowerCase() === textToAsk.toLowerCase()
      );

      if (matchKey) {
        setActiveAiAnswer({
          query: textToAsk,
          ...PRESET_AI_ANSWERS[matchKey],
        });
      } else {
        // Dynamic Indian financial response
        setActiveAiAnswer({
          query: textToAsk,
          answer: `Indian General Ledger analysis for "${textToAsk}": For ${selectedEntity.name} (GSTIN: ${selectedEntity.gstin}), net operating cash flow for September 2024 stands at +₹42,34,030.30 across 114 double-entry records. Current working capital ratio is 2.41x with a DSO of 19.4 days. GST compliance rating is 98% with zero Section 16(2)(aa) blockers.`,
          highlights: [
            `Audited Ledger Balance: ₹84,23,050.50 Inflow / ₹41,89,020.20 Outflow`,
            `Zero discrepancies detected in Indian MCA & GST double-entry posting rules`,
            `1 outstanding B2B invoice (#INV-2024-089) recommended for follow-up`,
          ],
          metrics: [
            { label: 'EBITDA Margin', val: '50.2%' },
            { label: 'GSTR-2B ITC Match', val: '98.5%' },
            { label: 'GSTN Health Score', val: 'A+' },
          ],
        });
      }
      setIsAiLoading(false);
    }, 350);
  };

  const selectedPoint = CASH_FLOW_POINTS[selectedPointIndex];

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-8 max-w-[1440px] mx-auto w-full">
      {/* 1. Header Greeting Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-serif text-2xl sm:text-[28px] font-medium tracking-tight text-[#e3e7ec]">
              Good morning, Marcus
            </h1>
            <div className="flex items-center gap-1.5 rounded-[4px] border border-[#303640] bg-[#1d2127] px-2.5 py-0.5 text-[11px] font-medium text-[#a7c8b1]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a7c8b1] animate-pulse" />
              <span>Live GSTN & Bank Sync</span>
            </div>
          </div>
          <p className="text-[13px] text-[#a5adb8]">
            {selectedEntity.name} • GSTIN: <span className="font-mono text-[#c5e3fc]">{selectedEntity.gstin}</span> ({selectedEntity.accountType})
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Date Picker Button */}
          <div className="relative">
            <button
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className="flex items-center gap-2 rounded-[4px] border border-[#303640] bg-[#1d2127] px-3 py-2 text-[12px] font-medium text-[#e3e7ec] transition-colors hover:border-[#a9c7df] hover:bg-[#242932]"
            >
              <Calendar size={14} className="text-[#a5adb8]" />
              <span>{dateRangeText}</span>
            </button>

            {isDatePickerOpen && (
              <div className="absolute right-0 mt-1 w-64 rounded-[4px] border border-[#303640] bg-[#242932] p-2 shadow-xl shadow-black/40 z-30">
                <div className="px-2 py-1 text-[11px] font-semibold text-[#8c9197] uppercase">
                  Select Return Period
                </div>
                {[
                  '01 Sep – 30 Sep 2024',
                  '01 Aug – 31 Aug 2024',
                  'Q2 FY 24-25 (Jul – Sep)',
                  'FY 2024-25 (YTD)',
                ].map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setDateRangeText(range);
                      setIsDatePickerOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-[2px] px-2 py-1.5 text-left text-[12px] transition-colors ${
                      dateRangeText === range
                        ? 'bg-[#1d2127] text-[#c5e3fc] font-medium'
                        : 'text-[#e3e7ec] hover:bg-[#1d2127]'
                    }`}
                  >
                    <span>{range}</span>
                    {dateRangeText === range && <Check size={13} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Primary CTA */}
          <button
            onClick={onOpenAddData}
            className="flex items-center gap-2 rounded-[4px] bg-[#c5e3fc] px-4 py-2 text-[13px] font-medium text-[#143346] shadow-xs transition-all hover:bg-[#d8edfd] active:scale-[0.98]"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Add Business Data</span>
          </button>
        </div>
      </div>

      {/* 2. Top Three Metric Cards with Indian Numbering */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {METRIC_CARDS.map((card) => {
          const isPositive = card.trendType === 'positive';
          return (
            <div
              key={card.title}
              className="flex flex-col justify-between rounded-[8px] border border-[#303640] bg-[#1d2127] p-4 lg:p-5 transition-all hover:border-[#42474c]"
            >
              {/* Card Header: Category + Badges */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-semibold tracking-[0.06em] text-[#8c9197] uppercase">
                  {card.title}
                </span>

                <div className="flex items-center gap-1.5">
                  {card.marginBadge && (
                    <span className="rounded-[2px] border border-[#303640] bg-[#15171b] px-1.5 py-0.5 text-[10px] font-semibold text-[#a5adb8] tracking-wide">
                      {card.marginBadge}
                    </span>
                  )}

                  <span
                    className={`flex items-center gap-0.5 rounded-[2px] px-1.5 py-0.5 text-[10px] font-semibold tracking-wide border ${
                      isPositive
                        ? 'bg-[rgba(167,200,177,0.12)] text-[#a7c8b1] border-[rgba(167,200,177,0.3)]'
                        : 'bg-[rgba(217,193,154,0.12)] text-[#d9c19a] border-[rgba(217,193,154,0.3)]'
                    }`}
                  >
                    {isPositive ? <ArrowUpRight size={12} /> : <ArrowRight size={12} />}
                    <span>{card.trendText}</span>
                  </span>
                </div>
              </div>

              {/* Main Metric Value */}
              <div className="py-1">
                <div
                  className={`font-serif text-2xl lg:text-[28px] font-medium tracking-tight tabular-nums ${
                    card.title.includes('NET PROFIT') ? 'text-[#a7c8b1]' : 'text-[#e3e7ec]'
                  }`}
                >
                  {card.value}
                </div>
                {card.subValue && (
                  <div className="text-[12px] font-mono text-[#8c9197] mt-0.5">
                    Equivalent: {card.subValue}
                  </div>
                )}
              </div>

              {/* Card Footer: Status Note + Action Link */}
              <div className="mt-3 flex items-center justify-between border-t border-[#303640]/60 pt-3 text-[12px]">
                <div className="flex items-center gap-1.5 text-[#a5adb8]">
                  {card.title.includes('NET PROFIT') ? (
                    <Scale size={13} className="text-[#a5adb8]" />
                  ) : (
                    <CheckCircle2 size={13} className="text-[#a7c8b1]" />
                  )}
                  <span>{card.statusNote}</span>
                </div>

                <button
                  onClick={() => onNavigate(card.actionView)}
                  className="flex items-center gap-1 font-medium text-[#e3e7ec] transition-colors hover:text-[#c5e3fc]"
                >
                  <span>{card.actionText}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Cash Flow Trend Card with Interactive SVG */}
      <div className="rounded-[8px] border border-[#303640] bg-[#1d2127] p-5 lg:p-6 transition-all">
        {/* Trend Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#303640]/60">
          <div className="flex items-center gap-4 flex-wrap">
            <h2 className="font-serif text-lg font-medium text-[#e3e7ec]">
              Cash Flow Trend (₹)
            </h2>

            {/* Segmented Switcher */}
            <div className="flex items-center rounded-[4px] border border-[#303640] bg-[#15171b] p-0.5 text-[12px]">
              <button
                onClick={() => setTrendMode('net')}
                className={`rounded-[2px] px-3 py-1 font-medium transition-colors ${
                  trendMode === 'net'
                    ? 'bg-[#242932] text-[#e3e7ec]'
                    : 'text-[#8c9197] hover:text-[#e3e7ec]'
                }`}
              >
                Net Inflow
              </button>
              <button
                onClick={() => setTrendMode('inflow-outflow')}
                className={`rounded-[2px] px-3 py-1 font-medium transition-colors ${
                  trendMode === 'inflow-outflow'
                    ? 'bg-[#242932] text-[#e3e7ec]'
                    : 'text-[#8c9197] hover:text-[#e3e7ec]'
                }`}
              >
                Inflow vs Outflow
              </button>
            </div>
          </div>

          <button
            onClick={() => handleAskAi('Analyze cash flow trend and volatility')}
            className="flex items-center gap-1.5 text-[12px] font-medium text-[#a5adb8] transition-colors hover:text-[#c5e3fc]"
          >
            <span>Ask AI CA to analyze trend</span>
            <Sparkles size={14} className="text-[#a9c7df]" />
          </button>
        </div>

        {/* SVG Chart Visualization */}
        <div className="relative mt-4 h-60 w-full select-none">
          <svg
            className="h-full w-full overflow-visible"
            viewBox="0 0 900 200"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="flowGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#accae2" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#accae2" stopOpacity="0.0" />
              </linearGradient>

              <linearGradient id="outflowGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d98282" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#d98282" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Guide Lines */}
            <line
              x1="0"
              y1="50"
              x2="900"
              y2="50"
              stroke="#303640"
              strokeDasharray="4 4"
              strokeOpacity="0.4"
            />
            <line
              x1="0"
              y1="110"
              x2="900"
              y2="110"
              stroke="#303640"
              strokeDasharray="4 4"
              strokeOpacity="0.4"
            />
            <line
              x1="0"
              y1="170"
              x2="900"
              y2="170"
              stroke="#303640"
              strokeDasharray="4 4"
              strokeOpacity="0.4"
            />

            {trendMode === 'net' ? (
              <>
                {/* Area Under Curve */}
                <path
                  d="M 15 155 Q 225 140 450 120 T 700 80 T 885 65 L 885 190 L 15 190 Z"
                  fill="url(#flowGradient)"
                />

                {/* Primary Trend Curve (Smooth Bezier) */}
                <path
                  d="M 15 155 Q 225 140 450 120 T 700 80 T 885 65"
                  fill="none"
                  stroke="#c5e3fc"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Data Points on curve */}
                <circle
                  cx="15"
                  cy="155"
                  r="3.5"
                  fill="#c5e3fc"
                  className="cursor-pointer transition-all hover:r-5"
                  onClick={() => setSelectedPointIndex(0)}
                />
                <circle
                  cx="235"
                  cy="140"
                  r="3.5"
                  fill="#c5e3fc"
                  className="cursor-pointer transition-all hover:r-5"
                  onClick={() => setSelectedPointIndex(1)}
                />
                <circle
                  cx="450"
                  cy="120"
                  r="3.5"
                  fill="#c5e3fc"
                  className="cursor-pointer transition-all hover:r-5"
                  onClick={() => setSelectedPointIndex(2)}
                />
                {/* Sep 22: Active highlighted point */}
                <circle
                  cx="700"
                  cy="80"
                  r="4.5"
                  fill="#c5e3fc"
                  stroke="#15171b"
                  strokeWidth="2"
                  className="cursor-pointer"
                  onClick={() => setSelectedPointIndex(3)}
                />
                <circle
                  cx="885"
                  cy="65"
                  r="3.5"
                  fill="#c5e3fc"
                  className="cursor-pointer transition-all hover:r-5"
                  onClick={() => setSelectedPointIndex(4)}
                />
              </>
            ) : (
              <>
                {/* Inflow */}
                <path
                  d="M 15 90 Q 225 70 450 75 T 700 50 T 885 40"
                  fill="none"
                  stroke="#a7c8b1"
                  strokeWidth="2"
                />
                {/* Outflow */}
                <path
                  d="M 15 150 Q 225 135 450 140 T 700 110 T 885 130"
                  fill="none"
                  stroke="#d98282"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
              </>
            )}
          </svg>

          {/* Interactive Floating Tooltip (Positioned exactly at Sep 22 or selected) */}
          <div
            className="absolute -top-1 pointer-events-none transition-all duration-200"
            style={{
              left:
                selectedPointIndex === 0
                  ? '2%'
                  : selectedPointIndex === 1
                  ? '26%'
                  : selectedPointIndex === 2
                  ? '50%'
                  : selectedPointIndex === 3
                  ? '75%'
                  : '86%',
              transform: 'translateX(-50%)',
            }}
          >
            <div className="flex flex-col rounded-[4px] border border-[#303640] bg-[#242932]/95 px-3 py-1.5 shadow-xl backdrop-blur-xs">
              <span className="text-[10px] text-[#8c9197]">{selectedPoint.date}</span>
              <span className="font-semibold text-[13px] text-[#e3e7ec] tabular-nums">
                {selectedPoint.note || `+${formatINR(selectedPoint.netInflow)} Net Inflow`}
              </span>
            </div>
          </div>
        </div>

        {/* X-Axis Dates */}
        <div className="mt-2 flex items-center justify-between px-2 text-[11px] text-[#8c9197] tabular-nums">
          {CASH_FLOW_POINTS.map((pt, idx) => (
            <button
              key={pt.displayDate}
              onClick={() => setSelectedPointIndex(idx)}
              className={`transition-colors hover:text-[#e3e7ec] ${
                selectedPointIndex === idx ? 'font-semibold text-[#e3e7ec]' : ''
              }`}
            >
              {pt.displayDate}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Autonomous Financial Assistant (Indian AI CA) */}
      <div className="rounded-[8px] border border-[#303640] bg-[#1d2127] p-5 lg:p-6 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-3">
          <div className="flex items-center gap-2 text-[13px] font-medium text-[#e3e7ec]">
            <Sparkles size={16} className="text-[#a9c7df]" />
            <span>Autonomous Financial Assistant (AI CA)</span>
          </div>
          <span className="text-[11px] text-[#8c9197]">
            Instant Indian double-entry ledger & GST lookup
          </span>
        </div>

        {/* Search / Question Input Bar */}
        <div className="relative mt-2 flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
              placeholder="Ask about cash flow, GSTR-3B liability, or TDS: 'Why did expenses increase 3.2%?'"
              className="h-10 w-full rounded-[4px] border border-[#303640] bg-[#15171b] px-3.5 text-[13px] text-[#e3e7ec] placeholder:text-[#8c9197] focus:border-[#a9c7df] focus:outline-none transition-colors"
            />
          </div>
          <button
            onClick={() => handleAskAi()}
            disabled={isAiLoading}
            className="flex h-10 items-center gap-2 rounded-[4px] bg-[#c5e3fc] px-4 text-[13px] font-medium text-[#143346] transition-all hover:bg-[#d8edfd] active:scale-[0.98] shrink-0"
          >
            <span>{isAiLoading ? 'Analyzing...' : 'Ask CAgenix'}</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Quick Prompts */}
        <div className="mt-3 flex items-center gap-2 flex-wrap text-[11px]">
          <span className="text-[#8c9197]">Quick prompts:</span>
          {[
            'Show unpaid invoices',
            'Which expenses increased?',
            'Estimate provisional GST & Advance Tax',
          ].map((prompt) => (
            <button
              key={prompt}
              onClick={() => {
                setAiQuery(prompt);
                handleAskAi(prompt);
              }}
              className="rounded-[3px] border border-[#303640] bg-[#15171b] px-2.5 py-1 text-[#a5adb8] transition-colors hover:border-[#a9c7df] hover:text-[#e3e7ec]"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Render AI Answer if available */}
        {activeAiAnswer && (
          <div className="mt-4 rounded-[6px] border border-[#303640] bg-[#242932] p-4 text-[13px] animate-in fade-in duration-200">
            <div className="flex items-start justify-between gap-3 border-b border-[#303640] pb-2.5">
              <div className="flex items-center gap-2 font-medium text-[#c5e3fc]">
                <Sparkles size={15} />
                <span>Ledger & Tax Intelligence: {activeAiAnswer.query}</span>
              </div>
              <button
                onClick={() => setActiveAiAnswer(null)}
                className="rounded p-1 text-[#8c9197] hover:bg-[#1d2127] hover:text-[#e3e7ec]"
              >
                <X size={14} />
              </button>
            </div>

            <p className="mt-2.5 leading-relaxed text-[#e3e7ec]">
              {activeAiAnswer.answer}
            </p>

            {/* Metrics */}
            {activeAiAnswer.metrics && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                {activeAiAnswer.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-[4px] border border-[#303640] bg-[#1d2127] p-2.5"
                  >
                    <div className="text-[10px] text-[#8c9197] uppercase tracking-wider">
                      {m.label}
                    </div>
                    <div className="text-[15px] font-semibold text-[#e3e7ec] tabular-nums">
                      {m.val}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Key highlights */}
            <div className="mt-3 flex flex-col gap-1.5 text-[12px] text-[#a5adb8]">
              {activeAiAnswer.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#a9c7df]" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#303640] flex justify-end gap-2">
              <button
                onClick={() => onNavigate('ai-accountant')}
                className="flex items-center gap-1 text-[11px] font-medium text-[#c5e3fc] hover:underline"
              >
                <span>Consult AI Chartered Accountant in detail</span>
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 5. Bottom Split Section: Attention Needed vs Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Card: Attention Needed */}
        <div className="flex flex-col justify-between rounded-[8px] border border-[#303640] bg-[#1d2127] p-5 lg:p-6">
          <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-base font-medium text-[#e3e7ec]">
                  Attention Needed
                </h3>
                <span className="rounded-[2px] border border-[rgba(217,193,154,0.3)] bg-[rgba(217,193,154,0.12)] px-1.5 py-0.5 text-[10px] font-semibold text-[#d9c19a]">
                  {attentionItems.length} items
                </span>
              </div>
              <span className="text-[11px] text-[#8c9197]">Prioritized by audit risk</span>
            </div>

            {/* List of items */}
            <div className="flex flex-col divide-y divide-[#303640]/60">
              {attentionItems.map((item) => (
                <div key={item.id} className="py-3.5 first:pt-1 last:pb-1 flex flex-col gap-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-medium text-[#e3e7ec]">
                        {item.title}
                      </span>
                      <span
                        className={`text-[12px] tabular-nums ${
                          item.badgeText === 'OVERDUE' ? 'text-[#d98282]' : 'text-[#a5adb8]'
                        }`}
                      >
                        {item.subtitle}
                      </span>
                    </div>

                    <span
                      className={`rounded-[2px] border px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase shrink-0 ${
                        item.badgeText === 'OVERDUE'
                          ? 'border-[rgba(217,130,130,0.3)] bg-[rgba(217,130,130,0.12)] text-[#d98282]'
                          : item.badgeText === 'UNASSIGNED'
                          ? 'border-[rgba(217,193,154,0.3)] bg-[rgba(217,193,154,0.12)] text-[#d9c19a]'
                          : 'border-[#303640] bg-[#15171b] text-[#a5adb8]'
                      }`}
                    >
                      {item.badgeText}
                    </span>
                  </div>

                  {/* Actions for this item */}
                  <div className="flex items-center justify-end gap-2 pt-1">
                    {item.secondaryActionLabel && (
                      <button
                        onClick={() => onOpenReviewInvoice(item)}
                        className="rounded-[3px] border border-[#303640] bg-transparent px-3 py-1 text-[11px] font-medium text-[#e3e7ec] transition-colors hover:bg-[#242932]"
                      >
                        {item.secondaryActionLabel}
                      </button>
                    )}

                    {item.badgeText === 'OVERDUE' && (
                      <button
                        onClick={() => onOpenSendReminder(item)}
                        className="flex items-center gap-1.5 rounded-[3px] bg-[#c5e3fc] px-3 py-1 text-[11px] font-medium text-[#143346] transition-colors hover:bg-[#d8edfd]"
                      >
                        <Send size={12} />
                        <span>{item.primaryActionLabel}</span>
                      </button>
                    )}

                    {item.badgeText === 'UNASSIGNED' && (
                      <button
                        onClick={onAutoCategorize}
                        className="flex items-center gap-1.5 rounded-[3px] border border-[rgba(169,199,223,0.4)] bg-[rgba(169,199,223,0.12)] px-3 py-1 text-[11px] font-medium text-[#c5e3fc] transition-colors hover:bg-[rgba(169,199,223,0.2)]"
                      >
                        <Wand2 size={12} />
                        <span>{item.primaryActionLabel}</span>
                      </button>
                    )}

                    {item.badgeText === 'GST ITC REQ' && (
                      <button
                        onClick={() => onOpenUploadReceipt(item)}
                        className="flex items-center gap-1.5 rounded-[3px] border border-[#303640] bg-[#242932] px-3 py-1 text-[11px] font-medium text-[#e3e7ec] transition-colors hover:border-[#a9c7df]"
                      >
                        <UploadCloud size={12} />
                        <span>{item.primaryActionLabel}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {attentionItems.length === 0 && (
                <div className="py-8 text-center text-[13px] text-[#a7c8b1]">
                  ✓ All GST ITC matches and payment reconciliations up to date!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Card: Recent Meaningful Activity */}
        <div className="flex flex-col justify-between rounded-[8px] border border-[#303640] bg-[#1d2127] p-5 lg:p-6">
          <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-medium text-[#e3e7ec]">
                Recent Meaningful Activity
              </h3>
              <span className="h-2 w-2 rounded-full bg-[#a7c8b1]" />
            </div>

            {/* List */}
            <div className="flex flex-col gap-3.5">
              {activities.slice(0, 3).map((act) => {
                let Icon = ArrowLeftRight;
                let iconColor = 'text-[#a7c8b1] bg-[rgba(167,200,177,0.12)] border-[rgba(167,200,177,0.25)]';
                if (act.type === 'payment') {
                  Icon = CircleDollarSign;
                  iconColor = 'text-[#c5e3fc] bg-[rgba(197,227,252,0.12)] border-[rgba(197,227,252,0.25)]';
                } else if (act.type === 'compliance') {
                  Icon = Lock;
                  iconColor = 'text-[#d9c19a] bg-[rgba(217,193,154,0.12)] border-[rgba(217,193,154,0.25)]';
                }

                return (
                  <div
                    key={act.id}
                    className="flex items-start justify-between gap-3 p-1 rounded transition-colors hover:bg-[#242932]/40"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-[4px] border ${iconColor} shrink-0`}
                      >
                        <Icon size={15} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-medium text-[#e3e7ec]">
                          {act.title}
                        </span>
                        <span className="text-[12px] text-[#a5adb8] leading-snug">
                          {act.description}
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] text-[#8c9197] tabular-nums whitespace-nowrap">
                      {act.timestamp}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Navigation Link */}
          <div className="mt-5 border-t border-[#303640]/60 pt-3">
            <button
              onClick={() => onNavigate('transactions')}
              className="flex items-center gap-1.5 text-[12px] font-medium text-[#a5adb8] transition-colors hover:text-[#c5e3fc]"
            >
              <span>View all transactions in ledger</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
