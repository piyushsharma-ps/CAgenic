import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Plus,
  Wand2,
} from 'lucide-react';
import { Transaction } from '../types';
import { formatINR } from '../utils/formatters';

interface TransactionsViewProps {
  transactions: Transaction[];
  onBatchReconcile: () => void;
  onOpenAddTransaction: () => void;
}

export const TransactionsView: React.FC<TransactionsViewProps> = ({
  transactions,
  onBatchReconcile,
  onOpenAddTransaction,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.referenceNo && t.referenceNo.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (t.hsnSacCode && t.hsnSacCode.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (statusFilter === 'all') return true;
    if (statusFilter === 'reconciled') return t.status === 'reconciled';
    if (statusFilter === 'unassigned') return t.status === 'unassigned';
    if (statusFilter === 'overdue') return t.status === 'overdue';
    if (statusFilter === 'flagged') return t.status === 'flagged';
    return true;
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredTransactions.map((t) => t.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleExportCSV = () => {
    const headers = ['ID,Date,Description,Category,Inflow (INR),Outflow (INR),GST (INR),TDS (INR),HSN/SAC,Status,Reference'];
    const rows = filteredTransactions.map(
      (t) =>
        `"${t.id}","${t.date}","${t.description}","${t.category}","${t.inflow || ''}","${
          t.outflow || ''
        }","${t.gstAmount || ''}","${t.tdsAmount || ''}","${t.hsnSacCode || ''}","${t.status}","${t.referenceNo || ''}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CAgenix_Indian_Ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-8 max-w-[1440px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl font-medium text-[#e3e7ec]">
              General Ledger & GST Vouchers
            </h1>
            <span className="rounded-[2px] border border-[#303640] bg-[#1d2127] px-2 py-0.5 text-[11px] font-mono text-[#a5adb8]">
              {filteredTransactions.length} records
            </span>
          </div>
          <p className="text-[13px] text-[#a5adb8]">
            Indian double-entry journal records, Razorpay settlements, HDFC Bank feeds, and HSN/SAC tagged lines
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 rounded-[4px] border border-[#303640] bg-[#1d2127] px-3 py-1.5 text-[12px] font-medium text-[#e3e7ec] transition-colors hover:bg-[#242932]"
          >
            <Download size={14} className="text-[#a5adb8]" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onBatchReconcile}
            className="flex items-center gap-1.5 rounded-[4px] border border-[rgba(169,199,223,0.4)] bg-[rgba(169,199,223,0.12)] px-3 py-1.5 text-[12px] font-medium text-[#c5e3fc] transition-colors hover:bg-[rgba(169,199,223,0.2)]"
          >
            <Wand2 size={14} />
            <span>Auto-Reconcile Batch</span>
          </button>

          <button
            onClick={onOpenAddTransaction}
            className="flex items-center gap-1.5 rounded-[4px] bg-[#c5e3fc] px-3.5 py-1.5 text-[12px] font-medium text-[#143346] transition-colors hover:bg-[#d8edfd]"
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>New Voucher</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-[6px] border border-[#303640] bg-[#1d2127] p-3">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto text-[12px]">
          {[
            { id: 'all', label: 'All Vouchers' },
            { id: 'reconciled', label: 'Reconciled' },
            { id: 'unassigned', label: 'Unassigned (2)' },
            { id: 'overdue', label: 'Overdue (1)' },
            { id: 'flagged', label: 'GST ITC Pending (1)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`rounded-[3px] px-3 py-1.5 font-medium transition-colors whitespace-nowrap ${
                statusFilter === tab.id
                  ? 'bg-[#242932] text-[#e3e7ec] border border-[#303640]'
                  : 'text-[#8c9197] hover:text-[#e3e7ec]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search size={14} className="absolute left-3 top-2.5 text-[#8c9197]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter voucher, HSN/SAC, ref..."
            className="h-8.5 w-full rounded-[4px] border border-[#303640] bg-[#15171b] pl-8.5 pr-3 text-[12px] text-[#e3e7ec] placeholder:text-[#8c9197] focus:border-[#a9c7df] focus:outline-none"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto rounded-[8px] border border-[#303640] bg-[#1d2127]">
        <table className="w-full text-left text-[13px] border-collapse">
          <thead>
            <tr className="h-10 border-b border-[#303640] bg-[#15171b]/80 text-[11px] font-semibold uppercase tracking-wider text-[#8c9197]">
              <th className="w-10 px-3.5 text-center">
                <input
                  type="checkbox"
                  checked={
                    filteredTransactions.length > 0 &&
                    selectedIds.length === filteredTransactions.length
                  }
                  onChange={handleSelectAll}
                  className="rounded-[2px] border-[#303640] bg-[#15171b] text-[#a9c7df] accent-[#a9c7df]"
                />
              </th>
              <th className="px-3.5">Date</th>
              <th className="px-3.5">Description & Reference</th>
              <th className="px-3.5">HSN / SAC</th>
              <th className="px-3.5">Bank / Gateway</th>
              <th className="px-3.5 text-right">Inflow (+)</th>
              <th className="px-3.5 text-right">Outflow (-)</th>
              <th className="px-3.5 text-right">GST / TDS</th>
              <th className="px-3.5 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#303640]">
            {filteredTransactions.map((tx) => {
              const isSelected = selectedIds.includes(tx.id);
              return (
                <tr
                  key={tx.id}
                  className={`h-11 transition-colors hover:bg-[#242932] ${
                    isSelected ? 'bg-[#242932]/70' : ''
                  }`}
                >
                  <td className="w-10 px-3.5 text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleSelect(tx.id)}
                      className="rounded-[2px] border-[#303640] bg-[#15171b] text-[#a9c7df] accent-[#a9c7df]"
                    />
                  </td>
                  <td className="px-3.5 text-[#8c9197] tabular-nums whitespace-nowrap text-[12px]">
                    {tx.date}
                  </td>
                  <td className="px-3.5 min-w-[220px]">
                    <div className="flex flex-col">
                      <span className="font-medium text-[#e3e7ec] leading-snug">
                        {tx.description}
                      </span>
                      {tx.referenceNo && (
                        <span className="font-mono text-[10px] text-[#8c9197]">
                          Ref: {tx.referenceNo}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-3.5 text-[#a5adb8] text-[11px] font-mono whitespace-nowrap">
                    {tx.hsnSacCode || '—'}
                  </td>
                  <td className="px-3.5 text-[#8c9197] text-[11px] whitespace-nowrap">
                    {tx.account}
                  </td>
                  <td className="px-3.5 text-right font-medium text-[#a7c8b1] tabular-nums whitespace-nowrap">
                    {tx.inflow ? `+${formatINR(tx.inflow)}` : '—'}
                  </td>
                  <td className="px-3.5 text-right font-medium text-[#e3e7ec] tabular-nums whitespace-nowrap">
                    {tx.outflow ? `-${formatINR(tx.outflow)}` : '—'}
                  </td>
                  <td className="px-3.5 text-right text-[11px] text-[#8c9197] tabular-nums whitespace-nowrap">
                    {tx.gstAmount ? (
                      <span className="text-[#a7c8b1]">GST: {formatINR(tx.gstAmount, { showPaise: false })}</span>
                    ) : tx.tdsAmount ? (
                      <span className="text-[#d9c19a]">TDS: {formatINR(tx.tdsAmount, { showPaise: false })}</span>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="px-3.5 text-center whitespace-nowrap">
                    <span
                      className={`inline-block rounded-[2px] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border ${
                        tx.status === 'reconciled'
                          ? 'border-[rgba(167,200,177,0.3)] bg-[rgba(167,200,177,0.12)] text-[#a7c8b1]'
                          : tx.status === 'unassigned'
                          ? 'border-[rgba(217,193,154,0.3)] bg-[rgba(217,193,154,0.12)] text-[#d9c19a]'
                          : tx.status === 'overdue'
                          ? 'border-[rgba(217,130,130,0.3)] bg-[rgba(217,130,130,0.12)] text-[#d98282]'
                          : 'border-[#303640] bg-[#15171b] text-[#a5adb8]'
                      }`}
                    >
                      {tx.status === 'flagged' ? 'ITC REQ' : tx.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
