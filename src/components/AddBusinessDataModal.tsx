import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Transaction } from '../types';

interface AddBusinessDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (tx: Omit<Transaction, 'id'>) => void;
  entityName: string;
}

export const AddBusinessDataModal: React.FC<AddBusinessDataModalProps> = ({
  isOpen,
  onClose,
  onAddTransaction,
  entityName,
}) => {
  const [type, setType] = useState<'inflow' | 'outflow'>('inflow');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Retail Sales Revenue');
  const [account, setAccount] = useState('HDFC Corporate Current A/c #9921');
  const [hsnSacCode, setHsnSacCode] = useState('HSN 6203');
  const [gstRate, setGstRate] = useState('18');
  const [referenceNo, setReferenceNo] = useState(`TX-IN-${Math.floor(1000 + Math.random() * 9000)}`);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !amount) return;

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;

    const rateNum = parseFloat(gstRate) || 0;
    const gstCalc = Math.round(numAmount * (rateNum / (100 + rateNum)));

    onAddTransaction({
      date: new Date().toISOString().slice(0, 10),
      description,
      category,
      entity: entityName,
      account,
      inflow: type === 'inflow' ? numAmount : undefined,
      outflow: type === 'outflow' ? numAmount : undefined,
      gstAmount: gstCalc,
      hsnSacCode,
      status: 'reconciled',
      receiptAttached: true,
      referenceNo,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-[8px] border border-[#303640] bg-[#1d2127] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#303640] pb-4">
          <div className="flex flex-col">
            <h2 className="font-serif text-lg font-medium text-[#e3e7ec]">
              Add Indian Ledger Record (₹)
            </h2>
            <span className="text-[12px] text-[#8c9197]">
              Post directly to general ledger with GST & HSN/SAC double-entry validation
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-[#8c9197] hover:bg-[#242932] hover:text-[#e3e7ec]"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
          {/* Inflow vs Outflow toggle */}
          <div className="flex rounded-[4px] border border-[#303640] bg-[#15171b] p-1 text-[13px]">
            <button
              type="button"
              onClick={() => {
                setType('inflow');
                setCategory('Retail Sales Revenue');
                setHsnSacCode('HSN 6203');
              }}
              className={`flex-1 rounded-[2px] py-1.5 font-medium transition-colors ${
                type === 'inflow'
                  ? 'bg-[#242932] text-[#a7c8b1]'
                  : 'text-[#8c9197] hover:text-[#e3e7ec]'
              }`}
            >
              + Revenue / Inflow (₹)
            </button>
            <button
              type="button"
              onClick={() => {
                setType('outflow');
                setCategory('Software, Licenses & Tools');
                setHsnSacCode('SAC 9973');
              }}
              className={`flex-1 rounded-[2px] py-1.5 font-medium transition-colors ${
                type === 'outflow'
                  ? 'bg-[#242932] text-[#d98282]'
                  : 'text-[#8c9197] hover:text-[#e3e7ec]'
              }`}
            >
              - Expense / Outflow (₹)
            </button>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#8c9197]">
              Description & Narration
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Razorpay Route settlement, Warehouse Packaging Supplies, Delhivery Freight"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-9 rounded-[4px] border border-[#303640] bg-[#15171b] px-3 text-[13px] text-[#e3e7ec] placeholder:text-[#8c9197] focus:border-[#a9c7df] focus:outline-none"
            />
          </div>

          {/* Amount & Reference */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#8c9197]">
                Amount (₹ INR)
              </label>
              <input
                type="number"
                step="1"
                min="1"
                required
                placeholder="e.g. 50000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-9 rounded-[4px] border border-[#303640] bg-[#15171b] px-3 text-[13px] text-[#e3e7ec] tabular-nums placeholder:text-[#8c9197] focus:border-[#a9c7df] focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#8c9197]">
                Voucher Reference #
              </label>
              <input
                type="text"
                value={referenceNo}
                onChange={(e) => setReferenceNo(e.target.value)}
                className="h-9 rounded-[4px] border border-[#303640] bg-[#15171b] px-3 font-mono text-[12px] text-[#e3e7ec] focus:border-[#a9c7df] focus:outline-none"
              />
            </div>
          </div>

          {/* HSN/SAC & GST Rate */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#8c9197]">
                HSN / SAC Code
              </label>
              <input
                type="text"
                value={hsnSacCode}
                onChange={(e) => setHsnSacCode(e.target.value)}
                placeholder="e.g. HSN 6203 or SAC 9983"
                className="h-9 rounded-[4px] border border-[#303640] bg-[#15171b] px-3 font-mono text-[12px] text-[#e3e7ec] focus:border-[#a9c7df] focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#8c9197]">
                GST Slab Rate
              </label>
              <select
                value={gstRate}
                onChange={(e) => setGstRate(e.target.value)}
                className="h-9 rounded-[4px] border border-[#303640] bg-[#15171b] px-3 text-[12px] text-[#e3e7ec] focus:border-[#a9c7df] focus:outline-none"
              >
                <option value="18">18% (Standard GST)</option>
                <option value="12">12% (Goods & Equipment)</option>
                <option value="5">5% (Textiles & Essentials)</option>
                <option value="28">28% (Luxury & Sin Goods)</option>
                <option value="0">0% (Nil / Exempted)</option>
              </select>
            </div>
          </div>

          {/* Funding Account */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#8c9197]">
              Settlement Bank / Payment Node
            </label>
            <select
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="h-9 rounded-[4px] border border-[#303640] bg-[#15171b] px-3 text-[12px] text-[#e3e7ec] focus:border-[#a9c7df] focus:outline-none"
            >
              <option value="HDFC Corporate Current A/c #9921">HDFC Corporate Current A/c #9921</option>
              <option value="ICICI CMS Current A/c #4410">ICICI CMS Commercial A/c #4410</option>
              <option value="Axis Bank Corporate Platinum #4102">Axis Bank Corporate Platinum #4102</option>
              <option value="Razorpay Route Node">Razorpay Settlement Gateway</option>
            </select>
          </div>

          <div className="mt-3 flex items-center justify-end gap-3 border-t border-[#303640] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-[4px] border border-[#303640] bg-transparent px-4 py-2 text-[12px] font-medium text-[#a5adb8] hover:bg-[#242932] hover:text-[#e3e7ec]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-[4px] bg-[#c5e3fc] px-4 py-2 text-[12px] font-medium text-[#143346] hover:bg-[#d8edfd]"
            >
              Post to Indian General Ledger
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
