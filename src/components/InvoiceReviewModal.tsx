import React from 'react';
import { X, FileText, Send, AlertTriangle } from 'lucide-react';
import { AttentionItem } from '../types';
import { formatINR } from '../utils/formatters';

interface InvoiceReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: AttentionItem | null;
  onOpenReminder: () => void;
}

export const InvoiceReviewModal: React.FC<InvoiceReviewModalProps> = ({
  isOpen,
  onClose,
  item,
  onOpenReminder,
}) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-[8px] border border-[#303640] bg-[#1d2127] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#303640] pb-4">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-[#c5e3fc]" />
            <h2 className="font-serif text-lg font-medium text-[#e3e7ec]">
              e-Invoice Review: #INV-2024-089
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-[#8c9197] hover:bg-[#242932] hover:text-[#e3e7ec]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-4 text-[13px]">
          {/* Status Alert Banner */}
          <div className="flex items-center justify-between rounded-[4px] border border-[rgba(217,130,130,0.3)] bg-[rgba(217,130,130,0.1)] p-3 text-[12px] text-[#d98282]">
            <div className="flex items-center gap-2">
              <AlertTriangle size={15} />
              <span>4 Days Past Net 30 Terms (Due 18 Sep 2024)</span>
            </div>
            <span className="font-semibold uppercase tracking-wider text-[10px]">Overdue</span>
          </div>

          {/* Details metadata */}
          <div className="grid grid-cols-2 gap-3 rounded-[4px] border border-[#303640] bg-[#15171b] p-3 text-[12px]">
            <div>
              <span className="text-[#8c9197] block text-[10px] uppercase">Buyer Legal Entity</span>
              <span className="font-medium text-[#e3e7ec]">Nordic Designs India Pvt Ltd</span>
              <span className="text-[#c5e3fc] block font-mono text-[10px]">GSTIN: 27AAACN8829K1Z4</span>
              <span className="text-[#8c9197] block text-[11px]">Mumbai, Maharashtra</span>
            </div>
            <div>
              <span className="text-[#8c9197] block text-[10px] uppercase">Net Receivable</span>
              <span className="font-serif text-lg font-medium text-[#e3e7ec] tabular-nums">
                {formatINR(item.amount)}
              </span>
              <span className="text-[#8c9197] block text-[11px]">Remittance via RTGS / Corporate UPI</span>
            </div>
          </div>

          {/* e-Invoice IRN Box */}
          <div className="rounded-[4px] border border-[#303640] bg-[#15171b] p-2.5 text-[11px]">
            <div className="flex justify-between text-[#8c9197]">
              <span>e-Invoice IRN (NIC Validated):</span>
              <span className="text-[#a7c8b1]">✓ Active on GSTN</span>
            </div>
            <div className="font-mono text-[#e3e7ec] text-[10px] truncate mt-0.5">
              5d7a8fe837190b22a61c39ac98124ef12074c5d8001a182992b45cae
            </div>
          </div>

          {/* Line items */}
          <div className="rounded-[4px] border border-[#303640] overflow-hidden">
            <table className="w-full text-left text-[12px]">
              <thead className="bg-[#15171b] border-b border-[#303640] text-[10px] uppercase text-[#8c9197]">
                <tr>
                  <th className="p-2.5">Item Description & SAC</th>
                  <th className="p-2.5 text-center">Taxable</th>
                  <th className="p-2.5 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#303640] tabular-nums">
                <tr>
                  <td className="p-2.5 text-[#e3e7ec]">
                    E-Commerce Platform Retainer (SAC 998314)
                  </td>
                  <td className="p-2.5 text-center text-[#8c9197]">18% GST</td>
                  <td className="p-2.5 text-right font-medium text-[#e3e7ec]">₹2,40,000.00</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-[#e3e7ec]">
                    Storefront CDN Optimization & Cache Setup
                  </td>
                  <td className="p-2.5 text-center text-[#8c9197]">18% GST</td>
                  <td className="p-2.5 text-right font-medium text-[#e3e7ec]">₹1,02,000.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-between border-t border-[#303640] pt-4">
            <button
              onClick={onClose}
              className="rounded-[4px] border border-[#303640] px-3.5 py-1.5 text-[12px] text-[#a5adb8] hover:bg-[#242932] hover:text-[#e3e7ec]"
            >
              Close
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenReminder();
                }}
                className="flex items-center gap-1.5 rounded-[4px] bg-[#c5e3fc] px-4 py-1.5 text-[12px] font-medium text-[#143346] hover:bg-[#d8edfd]"
              >
                <Send size={13} />
                <span>Send Reminder (RTGS/UPI)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
