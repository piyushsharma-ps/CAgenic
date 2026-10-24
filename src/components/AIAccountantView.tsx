import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  User,
  Calculator,
  Scale,
  FileSpreadsheet,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { Entity } from '../types';
import { formatINR, formatINRAbbreviated } from '../utils/formatters';

interface AIAccountantViewProps {
  selectedEntity: Entity;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  tableData?: { headers: string[]; rows: (string | number)[][] };
  metrics?: { label: string; value: string }[];
  recommendation?: string;
}

export const AIAccountantView: React.FC<AIAccountantViewProps> = ({ selectedEntity }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: `Namaste Marcus. I am your autonomous AI Chartered Accountant & Virtual CFO for ${selectedEntity.name} (GSTIN: ${selectedEntity.gstin}). I continuously reconcile GST Input Tax Credit against GSTR-2B, calculate Section 194 TDS deductions, and track your Advance Tax schedule under the Income Tax Act 1961. How can I assist your compliance today?`,
      timestamp: '9:42 AM',
      metrics: [
        { label: 'GST Inflow (Sep)', value: '₹84,23,050' },
        { label: 'Gross Outflow', value: '₹41,89,020' },
        { label: 'Net EBITDA Margin', value: '50.2%' },
      ],
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse: Message;

      const lower = query.toLowerCase();
      if (lower.includes('advance') || lower.includes('income tax') || lower.includes('challan')) {
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `Advance Tax estimation for ${selectedEntity.name} (FY 2024-25 / AY 2025-26): Based on estimated annual net profit of ₹1.69 Cr, your cumulative Advance Tax payable by 15 September (45% installment) is **₹8,89,146.00**. Deposit via Challan ITNS-280 under Code 100 (Advance Tax) before the interest penalty under Section 234C triggers.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          metrics: [
            { label: 'Cumulative Due', value: '₹8.89 L' },
            { label: 'Challan Code', value: 'ITNS-280' },
            { label: 'Statutory Due', value: '15 Sep' },
          ],
          recommendation: 'Ensure Challan 280 BSR code and CIN are logged into the compliance vault immediately after netbanking transfer.',
        };
      } else if (lower.includes('gst') || lower.includes('gstr') || lower.includes('itc')) {
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `GSTR-3B Computation for September 2024: Output GST collected on domestic B2C/B2B retail sales is ₹8,42,305.00. Verified Input Tax Credit (ITC) matched in auto-drafted GSTR-2B is ₹2,84,500.00. Net cash liability payable through electronic cash ledger is **₹5,57,805.00**. Claiming the missing AISPL AWS invoice (₹42,900.00) will release an additional ₹6,544.00 in IGST credit.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          tableData: {
            headers: ['GST Component', 'Output Tax (Payable)', 'Input Tax (GSTR-2B Credit)', 'Net Payable in Cash'],
            rows: [
              ['CGST (9%)', '₹4,21,152.50', '₹1,42,250.00', '₹2,78,902.50'],
              ['SGST (9%)', '₹4,21,152.50', '₹1,42,250.00', '₹2,78,902.50'],
              ['IGST (Inter-state)', '₹0.00', '₹0.00', '₹0.00'],
              ['Total GSTR-3B', '₹8,42,305.00', '₹2,84,500.00', '₹5,57,805.00'],
            ],
          },
        };
      } else if (lower.includes('tds') || lower.includes('withholding') || lower.includes('194')) {
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `TDS Audit Summary for September: A total of ₹2,80,200.00 has been withheld across vendor invoices and payroll. This must be remitted to the Income Tax Department via Challan 281 by 7th October 2024 to avoid 1.5% monthly penal interest under Section 201(1A).`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          metrics: [
            { label: 'Sec 192 (Payroll)', value: '₹1,84,000' },
            { label: 'Sec 194-I (Rent)', value: '₹62,000' },
            { label: 'Sec 194J (Tech Retainer)', value: '₹34,200' },
          ],
          recommendation: 'Generate Form 16A quarterly certificates for Nordic Designs and Bhiwandi Warehouse landlords.',
        };
      } else {
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `Verified Indian General Ledger balance for ${selectedEntity.name}: Total inflows of ₹84,23,050.50 (₹84.23 L) and operational expenditures of ₹41,89,020.20 (₹41.89 L) reflect a healthy net operating cash flow of +₹42,34,030.30. Working capital liquidity stands at ₹5.95 Cr across HDFC Corporate and ICICI CMS accounts.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          metrics: [
            { label: 'Cash Reserves', value: '₹5.95 Cr' },
            { label: 'Liquid Runway', value: '14.2 Months' },
          ],
        };
      }

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-8 max-w-[1200px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#303640] pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-[4px] border border-[rgba(167,200,177,0.3)] bg-[rgba(167,200,177,0.12)] text-[#a7c8b1]">
            <Sparkles size={20} />
          </div>
          <div className="flex flex-col">
            <h1 className="font-serif text-2xl font-medium text-[#e3e7ec]">
              AI Chartered Accountant & Virtual CFO
            </h1>
            <p className="text-[13px] text-[#a5adb8]">
              Automated Indian double-entry ledger, GSTR-1/3B filing checks & Section 194 TDS forecasting
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-[2px] border border-[#303640] bg-[#1d2127] px-2.5 py-1 text-[11px] font-medium text-[#a7c8b1]">
            ● Model: FinBERT-IndianTax-v4
          </span>
        </div>
      </div>

      {/* Suggested Scenario Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          {
            title: 'Q2 Advance Tax Deposit',
            desc: 'Check 45% installment calculation & Challan 280',
            query: 'Calculate Q2 Advance Tax installment under ITNS-280',
            icon: Calculator,
          },
          {
            title: 'GSTR-3B Net Liability',
            desc: 'Calculate output tax minus GSTR-2B Input Tax Credit',
            query: 'Estimate GSTR-3B net payable and eligible input tax credit',
            icon: Scale,
          },
          {
            title: 'Section 194 TDS Audit',
            desc: 'Review 194C, 194J, 194-I withholdings for Challan 281',
            query: 'Show TDS deductions across contractors, rent and professional retainers',
            icon: AlertTriangle,
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.title}
              onClick={() => handleSend(item.query)}
              className="flex items-start gap-3 rounded-[4px] border border-[#303640] bg-[#1d2127] p-3 text-left transition-colors hover:border-[#a9c7df] hover:bg-[#242932]"
            >
              <div className="mt-0.5 rounded-[2px] bg-[#15171b] p-1.5 text-[#c5e3fc] border border-[#303640]">
                <Icon size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-medium text-[#e3e7ec]">{item.title}</span>
                <span className="text-[11px] text-[#8c9197] leading-tight">{item.desc}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Conversation Thread */}
      <div className="flex flex-col gap-4 rounded-[8px] border border-[#303640] bg-[#1d2127] p-4 lg:p-6 min-h-[460px]">
        <div className="flex flex-col gap-5 overflow-y-auto max-h-[520px] pr-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${
                m.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-[4px] shrink-0 text-[12px] font-semibold ${
                  m.sender === 'ai'
                    ? 'border border-[rgba(197,227,252,0.3)] bg-[#242932] text-[#c5e3fc]'
                    : 'border border-[#303640] bg-[#15171b] text-[#e3e7ec]'
                }`}
              >
                {m.sender === 'ai' ? <Sparkles size={14} /> : <User size={14} />}
              </div>

              <div
                className={`flex flex-col max-w-[85%] rounded-[6px] p-4 text-[13px] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#242932] text-[#e3e7ec] border border-[#303640]'
                    : 'bg-[#15171b] text-[#e3e7ec] border border-[#303640]'
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="text-[11px] font-semibold text-[#8c9197]">
                    {m.sender === 'ai' ? 'CAgenix Indian AI CA' : 'Marcus Vance'}
                  </span>
                  <span className="text-[10px] text-[#8c9197] tabular-nums">{m.timestamp}</span>
                </div>

                <p className="whitespace-pre-line text-[#e3e7ec]">{m.text}</p>

                {/* Metrics */}
                {m.metrics && (
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {m.metrics.map((met) => (
                      <div
                        key={met.label}
                        className="rounded-[3px] border border-[#303640] bg-[#1d2127] p-2"
                      >
                        <div className="text-[10px] text-[#8c9197] uppercase">{met.label}</div>
                        <div className="text-[14px] font-semibold text-[#c5e3fc] tabular-nums">
                          {met.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Table Data */}
                {m.tableData && (
                  <div className="mt-3 overflow-x-auto rounded-[3px] border border-[#303640]">
                    <table className="w-full text-left text-[12px]">
                      <thead className="border-b border-[#303640] bg-[#1d2127] text-[10px] uppercase text-[#8c9197]">
                        <tr>
                          {m.tableData.headers.map((h, i) => (
                            <th key={i} className="p-2 font-medium">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#303640] tabular-nums">
                        {m.tableData.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-[#1d2127]/50">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-2 text-[#e3e7ec]">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Recommendation */}
                {m.recommendation && (
                  <div className="mt-3 rounded-[3px] border border-[rgba(217,193,154,0.3)] bg-[rgba(217,193,154,0.08)] p-2.5 text-[12px] text-[#d9c19a]">
                    <strong>Statutory CA Advice:</strong> {m.recommendation}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-[12px] text-[#8c9197] italic pl-11">
              <Sparkles size={13} className="animate-spin text-[#c5e3fc]" />
              <span>Cross-verifying with GSTN and Income Tax rules...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="mt-auto pt-4 border-t border-[#303640]">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about GSTR-1, GSTR-3B, TDS Challan 281, Advance Tax, or e-Invoices..."
              className="h-10 flex-1 rounded-[4px] border border-[#303640] bg-[#15171b] px-3.5 text-[13px] text-[#e3e7ec] placeholder:text-[#8c9197] focus:border-[#a9c7df] focus:outline-none"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputVal.trim() || isTyping}
              className="flex h-10 items-center gap-1.5 rounded-[4px] bg-[#c5e3fc] px-4 text-[13px] font-medium text-[#143346] transition-all hover:bg-[#d8edfd] disabled:opacity-50"
            >
              <span>Send</span>
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
