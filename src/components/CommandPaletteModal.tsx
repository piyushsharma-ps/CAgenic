import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, LayoutDashboard, Sparkles, ReceiptText, LineChart, Scale, Users, Settings } from 'lucide-react';
import { ViewId } from '../types';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewId) => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { label: 'Go to Overview Dashboard', view: 'overview' as ViewId, icon: LayoutDashboard, category: 'Navigation' },
    { label: 'Query AI Accountant & Virtual CFO', view: 'ai-accountant' as ViewId, icon: Sparkles, category: 'AI Tools' },
    { label: 'View General Ledger Transactions', view: 'transactions' as ViewId, icon: ReceiptText, category: 'Navigation' },
    { label: 'Analyze Cash Flow & Runway', view: 'cash-flow' as ViewId, icon: LineChart, category: 'Analysis' },
    { label: 'Check Tax & Provisional GST', view: 'tax-gst' as ViewId, icon: Scale, category: 'Compliance' },
    { label: 'Browse Customers & Suppliers', view: 'customers' as ViewId, icon: Users, category: 'Counterparties' },
    { label: 'Open Settings & Integrations', view: 'settings' as ViewId, icon: Settings, category: 'System' },
  ];

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/75 p-4 backdrop-blur-xs">
      <div className="w-full max-w-xl rounded-[8px] border border-[#303640] bg-[#1d2127] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
        <div className="flex items-center gap-3 border-b border-[#303640] px-4 py-3">
          <Search size={18} className="text-[#8c9197]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands, reports, accounts, or jump to view..."
            className="flex-1 bg-transparent text-[14px] text-[#e3e7ec] placeholder:text-[#8c9197] focus:outline-none"
          />
          <kbd className="rounded border border-[#303640] bg-[#15171b] px-1.5 py-0.5 text-[10px] font-mono text-[#8c9197]">
            ESC
          </kbd>
        </div>

        <div className="max-h-72 overflow-y-auto p-2">
          {filtered.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => {
                  onNavigate(item.view);
                  onClose();
                }}
                className="flex w-full items-center justify-between rounded-[4px] p-2.5 text-left text-[13px] text-[#e3e7ec] hover:bg-[#242932] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-[3px] bg-[#15171b] p-1.5 text-[#a9c7df] border border-[#303640]">
                    <Icon size={14} />
                  </div>
                  <span>{item.label}</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#8c9197]">
                  {item.category}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
