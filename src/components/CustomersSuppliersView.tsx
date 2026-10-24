import React, { useState } from 'react';
import { Mail, Plus, Search } from 'lucide-react';
import { CUSTOMERS_SUPPLIERS } from '../data/mockData';
import { formatINR } from '../utils/formatters';

export const CustomersSuppliersView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'customer' | 'supplier'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = CUSTOMERS_SUPPLIERS.filter((cs) => {
    if (activeTab !== 'all' && cs.type !== activeTab) return false;
    return (
      cs.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cs.gstin.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-8 max-w-[1440px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-medium text-[#e3e7ec]">
            Customers & Suppliers Master Ledger
          </h1>
          <p className="text-[13px] text-[#a5adb8]">
            Accounts Receivable (AR) & Accounts Payable (AP) ledger with verified GSTINs and MSME payment terms
          </p>
        </div>

        <button className="flex items-center gap-1.5 rounded-[4px] bg-[#c5e3fc] px-4 py-2 text-[13px] font-medium text-[#143346] hover:bg-[#d8edfd]">
          <Plus size={15} strokeWidth={2.5} />
          <span>Add GSTIN Counterparty</span>
        </button>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-[6px] border border-[#303640] bg-[#1d2127] p-3">
        <div className="flex items-center gap-1 text-[12px]">
          {(['all', 'customer', 'supplier'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-[3px] px-3 py-1.5 font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'bg-[#242932] text-[#e3e7ec] border border-[#303640]'
                  : 'text-[#8c9197] hover:text-[#e3e7ec]'
              }`}
            >
              {tab === 'all' ? 'All Counterparties' : `${tab}s`}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search size={14} className="absolute left-3 top-2.5 text-[#8c9197]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search business name or GSTIN..."
            className="h-8.5 w-full rounded-[4px] border border-[#303640] bg-[#15171b] pl-8.5 pr-3 text-[12px] text-[#e3e7ec] placeholder:text-[#8c9197] focus:border-[#a9c7df] focus:outline-none"
          />
        </div>
      </div>

      {/* Counterparties Table */}
      <div className="overflow-x-auto rounded-[8px] border border-[#303640] bg-[#1d2127]">
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="h-10 border-b border-[#303640] bg-[#15171b]/80 text-[11px] font-semibold uppercase tracking-wider text-[#8c9197]">
              <th className="px-4">Legal Entity Name</th>
              <th className="px-4">Supplier / Buyer GSTIN</th>
              <th className="px-4">Payment Terms</th>
              <th className="px-4">Billing Contact</th>
              <th className="px-4 text-right">Outstanding Ledger Balance</th>
              <th className="px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#303640]">
            {filtered.map((item) => (
              <tr key={item.id} className="h-12 hover:bg-[#242932] transition-colors">
                <td className="px-4 font-medium text-[#e3e7ec]">{item.name}</td>
                <td className="px-4 font-mono text-[11px] text-[#c5e3fc]">{item.gstin}</td>
                <td className="px-4 font-mono text-[11px] text-[#8c9197]">{item.terms}</td>
                <td className="px-4 text-[#a5adb8] text-[12px]">
                  <div className="flex items-center gap-1.5">
                    <Mail size={12} className="text-[#8c9197]" />
                    <span>{item.contactEmail}</span>
                  </div>
                </td>
                <td className="px-4 text-right font-medium tabular-nums">
                  <span
                    className={
                      item.balance > 0
                        ? item.status === 'overdue'
                          ? 'text-[#d98282]'
                          : 'text-[#e3e7ec]'
                        : 'text-[#8c9197]'
                    }
                  >
                    {formatINR(item.balance)}
                  </span>
                </td>
                <td className="px-4 text-center">
                  <span
                    className={`rounded-[2px] px-2 py-0.5 text-[10px] font-semibold uppercase border ${
                      item.status === 'overdue'
                        ? 'border-[rgba(217,130,130,0.3)] bg-[rgba(217,130,130,0.12)] text-[#d98282]'
                        : item.status === 'settled'
                        ? 'border-[rgba(167,200,177,0.3)] bg-[rgba(167,200,177,0.12)] text-[#a7c8b1]'
                        : 'border-[#303640] bg-[#15171b] text-[#a5adb8]'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
