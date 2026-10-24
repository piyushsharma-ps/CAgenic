import React from 'react';
import { Scale, CheckCircle2, AlertTriangle, FileText, Download, ShieldCheck } from 'lucide-react';
import { formatINR } from '../utils/formatters';

export const TaxGSTView: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 p-4 lg:p-8 max-w-[1440px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl font-medium text-[#e3e7ec]">
              Indian GST & TDS Compliance Engine
            </h1>
            <span className="rounded-[2px] border border-[rgba(167,200,177,0.3)] bg-[rgba(167,200,177,0.12)] px-2 py-0.5 text-[10px] font-semibold text-[#a7c8b1]">
              GSTR-3B Ready for Filing
            </span>
          </div>
          <p className="text-[13px] text-[#a5adb8]">
            Automated GSTR-1 & 3B liability, GSTR-2B Input Tax Credit (ITC) matching, and Section 194 TDS challans
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-[4px] bg-[#c5e3fc] px-4 py-2 text-[13px] font-medium text-[#143346] hover:bg-[#d8edfd]">
          <Download size={15} />
          <span>Export GSTR-3B JSON & Challan 280/281</span>
        </button>
      </div>

      {/* Tax Liability Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-[6px] border border-[#303640] bg-[#1d2127] p-5">
          <span className="text-[11px] font-semibold uppercase text-[#8c9197]">
            Net GSTR-3B Payable in Cash
          </span>
          <div className="mt-1 font-serif text-2xl font-medium text-[#e3e7ec] tabular-nums">
            ₹5,57,805.00
          </div>
          <div className="mt-3 text-[12px] text-[#a5adb8]">
            Due Date: <span className="font-medium text-[#e3e7ec]">20 Oct 2024</span> (Electronic Cash Ledger)
          </div>
        </div>

        <div className="rounded-[6px] border border-[#303640] bg-[#1d2127] p-5">
          <span className="text-[11px] font-semibold uppercase text-[#8c9197]">
            GSTR-2B Matched Input Tax Credit (ITC)
          </span>
          <div className="mt-1 font-serif text-2xl font-medium text-[#a7c8b1] tabular-nums">
            ₹2,84,500.00
          </div>
          <div className="mt-3 text-[12px] text-[#a7c8b1]">
            ✓ 98.5% supplier invoices matched under Sec 16(2)(aa)
          </div>
        </div>

        <div className="rounded-[6px] border border-[#303640] bg-[#1d2127] p-5">
          <span className="text-[11px] font-semibold uppercase text-[#8c9197]">
            Q2 Advance Tax (Challan ITNS-280)
          </span>
          <div className="mt-1 font-serif text-2xl font-medium text-[#d9c19a] tabular-nums">
            ₹8,89,146.00
          </div>
          <div className="mt-3 text-[12px] text-[#d9c19a]">
            45% installment under Income Tax Act 1961
          </div>
        </div>
      </div>

      {/* Table: GST Breakdown & Section 194 TDS Schedule */}
      <div className="rounded-[8px] border border-[#303640] bg-[#1d2127] p-5">
        <h3 className="font-serif text-base font-medium text-[#e3e7ec] mb-3">
          Statutory Tax Breakdown & GSTR-2B Set-off Schedule
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[12px]">
            <thead>
              <tr className="border-b border-[#303640] text-[10px] uppercase text-[#8c9197]">
                <th className="py-2.5">Statutory Head</th>
                <th className="py-2.5">Applicable Section / Act</th>
                <th className="py-2.5 text-right">Gross Taxable Base</th>
                <th className="py-2.5 text-right">Applicable Rate</th>
                <th className="py-2.5 text-right">Net Tax Liability</th>
                <th className="py-2.5 text-center">GSTN Portal Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#303640] tabular-nums">
              <tr className="hover:bg-[#242932]">
                <td className="py-3 font-medium text-[#e3e7ec]">CGST (Central Tax)</td>
                <td className="py-3 text-[#a5adb8]">CGST Act 2017 (Intra-state Maharashtra)</td>
                <td className="py-3 text-right text-[#e3e7ec]">₹46,79,472.00</td>
                <td className="py-3 text-right text-[#8c9197]">9.0%</td>
                <td className="py-3 text-right font-medium text-[#e3e7ec]">₹2,78,902.50</td>
                <td className="py-3 text-center">
                  <span className="rounded-[2px] bg-[rgba(167,200,177,0.12)] border border-[rgba(167,200,177,0.3)] px-1.5 py-0.5 text-[10px] text-[#a7c8b1]">
                    Calculated
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-[#242932]">
                <td className="py-3 font-medium text-[#e3e7ec]">SGST (State Tax)</td>
                <td className="py-3 text-[#a5adb8]">MGST Act 2017 (Maharashtra State)</td>
                <td className="py-3 text-right text-[#e3e7ec]">₹46,79,472.00</td>
                <td className="py-3 text-right text-[#8c9197]">9.0%</td>
                <td className="py-3 text-right font-medium text-[#e3e7ec]">₹2,78,902.50</td>
                <td className="py-3 text-center">
                  <span className="rounded-[2px] bg-[rgba(167,200,177,0.12)] border border-[rgba(167,200,177,0.3)] px-1.5 py-0.5 text-[10px] text-[#a7c8b1]">
                    Calculated
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-[#242932]">
                <td className="py-3 font-medium text-[#e3e7ec]">IGST (Inter-State Tax)</td>
                <td className="py-3 text-[#a5adb8]">IGST Act 2017 (Inter-state D2C orders)</td>
                <td className="py-3 text-right text-[#e3e7ec]">₹37,43,578.50</td>
                <td className="py-3 text-right text-[#8c9197]">18.0%</td>
                <td className="py-3 text-right font-medium text-[#e3e7ec]">₹0.00 (Fully Set-off)</td>
                <td className="py-3 text-center">
                  <span className="rounded-[2px] bg-[rgba(167,200,177,0.12)] border border-[rgba(167,200,177,0.3)] px-1.5 py-0.5 text-[10px] text-[#a7c8b1]">
                    Set-off via ITC
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-[#242932]">
                <td className="py-3 font-medium text-[#e3e7ec]">TDS on Professional Fees</td>
                <td className="py-3 text-[#a5adb8]">Section 194J (IT Act 1961)</td>
                <td className="py-3 text-right text-[#e3e7ec]">₹3,42,000.00</td>
                <td className="py-3 text-right text-[#8c9197]">10.0%</td>
                <td className="py-3 text-right font-medium text-[#e3e7ec]">₹34,200.00</td>
                <td className="py-3 text-center">
                  <span className="rounded-[2px] bg-[rgba(217,193,154,0.12)] border border-[rgba(217,193,154,0.3)] px-1.5 py-0.5 text-[10px] text-[#d9c19a]">
                    Challan 281 Due 07 Oct
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-[#242932]">
                <td className="py-3 font-medium text-[#e3e7ec]">TDS on Commercial Lease</td>
                <td className="py-3 text-[#a5adb8]">Section 194-I (Bhiwandi Warehouse)</td>
                <td className="py-3 text-right text-[#e3e7ec]">₹6,20,000.00</td>
                <td className="py-3 text-right text-[#8c9197]">10.0%</td>
                <td className="py-3 text-right font-medium text-[#e3e7ec]">₹62,000.00</td>
                <td className="py-3 text-center">
                  <span className="rounded-[2px] bg-[rgba(217,193,154,0.12)] border border-[rgba(217,193,154,0.3)] px-1.5 py-0.5 text-[10px] text-[#d9c19a]">
                    Challan 281 Due 07 Oct
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
