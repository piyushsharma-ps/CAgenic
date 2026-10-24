import React, { useState } from 'react';
import { X, Send, Mail, CheckCircle2 } from 'lucide-react';
import { AttentionItem } from '../types';
import { formatINR } from '../utils/formatters';

interface SendReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: AttentionItem | null;
  onSent: (itemId: string) => void;
}

export const SendReminderModal: React.FC<SendReminderModalProps> = ({
  isOpen,
  onClose,
  item,
  onSent,
}) => {
  const [recipient, setRecipient] = useState('accounts@nordicdesigns.in');
  const [subject, setSubject] = useState(
    'Friendly Reminder: Tax Invoice #INV-2024-089 from Apex Retailers India Pvt Ltd'
  );
  const [body, setBody] = useState(
    `Dear Nordic Designs Accounts Team,\n\nGreetings from Apex Retailers India Pvt Ltd.\n\nThis is a gentle reminder regarding Tax Invoice #INV-2024-089 for ₹3,42,000.00 (INR), which matured on 18 September 2024 under Net 30 credit terms (4 days past due).\n\nThe e-Invoice IRN (5d7a8f...39ac) and corresponding GSTR-1 credit have been verified on the GSTN portal. Kindly remit the outstanding balance via RTGS/NEFT or Corporate UPI:\n\nBank: HDFC Bank Ltd (Fort Mumbai Branch)\nA/c Name: Apex Retailers India Pvt Ltd\nA/c No: 502000889211\nIFSC: HDFC0000060\nCorporate UPI VPA: apexretailers@hdfcbank\n\nThank you for your partnership,\nMarcus Vance\nManaging Director, Apex Retailers India Pvt Ltd`
  );
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  if (!isOpen || !item) return null;

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setTimeout(() => {
        onSent(item.id);
        setIsSent(false);
        onClose();
      }, 1000);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-[8px] border border-[#303640] bg-[#1d2127] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#303640] pb-4">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-[#c5e3fc]" />
            <h2 className="font-serif text-lg font-medium text-[#e3e7ec]">
              Send Polite Payment Reminder (RTGS / UPI)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-[#8c9197] hover:bg-[#242932] hover:text-[#e3e7ec]"
          >
            <X size={18} />
          </button>
        </div>

        {isSent ? (
          <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
            <CheckCircle2 size={40} className="text-[#a7c8b1]" />
            <h3 className="font-serif text-lg font-medium text-[#e3e7ec]">
              Payment Reminder Dispatched
            </h3>
            <p className="text-[12px] text-[#8c9197]">
              Logged in communication ledger audit trail with IFSC & UPI payment links.
            </p>
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-3.5">
            <div className="flex items-center justify-between rounded-[4px] border border-[#303640] bg-[#15171b] p-3 text-[12px]">
              <div>
                <span className="text-[#8c9197]">Buyer Entity: </span>
                <span className="font-medium text-[#e3e7ec]">Nordic Designs India Pvt Ltd</span>
              </div>
              <div>
                <span className="text-[#8c9197]">Amount Due: </span>
                <span className="font-medium text-[#d98282] tabular-nums">
                  {formatINR(item.amount)}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#8c9197]">
                To (Finance / Accounts Payable)
              </label>
              <input
                type="email"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="h-9 rounded-[4px] border border-[#303640] bg-[#15171b] px-3 text-[13px] text-[#e3e7ec] focus:border-[#a9c7df] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#8c9197]">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="h-9 rounded-[4px] border border-[#303640] bg-[#15171b] px-3 text-[13px] text-[#e3e7ec] focus:border-[#a9c7df] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#8c9197]">
                Email Body
              </label>
              <textarea
                rows={6}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="rounded-[4px] border border-[#303640] bg-[#15171b] p-3 text-[12px] leading-relaxed text-[#e3e7ec] focus:border-[#a9c7df] focus:outline-none font-mono"
              />
            </div>

            <div className="mt-2 flex items-center justify-between border-t border-[#303640] pt-4">
              <span className="text-[11px] text-[#8c9197]">
                Includes GST e-Invoice IRN & Corporate UPI VPA
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-[4px] border border-[#303640] px-3 py-1.5 text-[12px] text-[#a5adb8] hover:bg-[#242932] hover:text-[#e3e7ec]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={isSending}
                  className="flex items-center gap-1.5 rounded-[4px] bg-[#c5e3fc] px-4 py-1.5 text-[12px] font-medium text-[#143346] hover:bg-[#d8edfd]"
                >
                  <Send size={13} />
                  <span>{isSending ? 'Sending...' : 'Send Reminder'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
