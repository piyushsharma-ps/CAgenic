import React from 'react';
import {
  LayoutDashboard,
  Sparkles,
  ReceiptText,
  FileUp,
  LineChart,
  Scale,
  Lightbulb,
  Users,
  Settings as SettingsIcon,
  ShieldCheck,
  X,
} from 'lucide-react';
import { ViewId } from '../types';

interface SidebarProps {
  currentView: ViewId;
  onSelectView: (view: ViewId) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  unassignedCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  isOpenMobile,
  onCloseMobile,
  unassignedCount,
}) => {
  const handleNavClick = (view: ViewId) => {
    onSelectView(view);
    onCloseMobile();
  };

  const navSections = [
    {
      title: 'WORKSPACE',
      items: [
        {
          id: 'overview' as ViewId,
          label: 'Overview',
          icon: LayoutDashboard,
        },
        {
          id: 'ai-accountant' as ViewId,
          label: 'AI Chartered Accountant',
          icon: Sparkles,
          badge: 'AI CA',
          badgeType: 'ai',
        },
        {
          id: 'transactions' as ViewId,
          label: 'Transactions & Ledger',
          icon: ReceiptText,
          badge: `${12 + unassignedCount} new`,
          badgeType: 'count',
        },
        {
          id: 'documents' as ViewId,
          label: 'Documents & e-Invoices',
          icon: FileUp,
        },
      ],
    },
    {
      title: 'ANALYZE',
      items: [
        {
          id: 'cash-flow' as ViewId,
          label: 'Cash Flow & Runway (₹)',
          icon: LineChart,
        },
        {
          id: 'tax-gst' as ViewId,
          label: 'GST & TDS Compliance',
          icon: Scale,
          badge: 'Ready',
          badgeType: 'status',
        },
        {
          id: 'insights' as ViewId,
          label: 'Business Insights',
          icon: Lightbulb,
          badge: '3 alerts',
          badgeType: 'alert',
        },
      ],
    },
    {
      title: 'MANAGE',
      items: [
        {
          id: 'customers' as ViewId,
          label: 'Customers & Suppliers',
          icon: Users,
        },
        {
          id: 'settings' as ViewId,
          label: 'GST & Ledger Settings',
          icon: SettingsIcon,
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Main Sidebar Column */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[240px] flex-col justify-between border-r border-[#303640] bg-[#191c21] transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col">
          {/* Logo Header */}
          <div className="flex items-center justify-between border-b border-[#303640] px-5 py-4.5">
            <div
              onClick={() => handleNavClick('overview')}
              className="flex cursor-pointer items-center gap-3 select-none"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-[4px] bg-[#242932] border border-[#303640] shadow-xs">
                <span className="font-serif text-[15px] font-semibold text-[#e3e7ec] tracking-wider">
                  CA
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-[16px] font-semibold tracking-tight text-[#e3e7ec]">
                  CAgenix
                </span>
                <span className="text-[11px] font-normal text-[#a5adb8] leading-tight">
                  Indian Finances, Simplified
                </span>
              </div>
            </div>
            <button
              onClick={onCloseMobile}
              className="rounded p-1 text-[#a5adb8] hover:bg-[#242932] hover:text-[#e3e7ec] lg:hidden"
              aria-label="Close navigation"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Sections */}
          <div className="flex flex-col gap-6 px-3 py-5 overflow-y-auto max-h-[calc(100vh-190px)]">
            {navSections.map((section) => (
              <div key={section.title} className="flex flex-col gap-1">
                <div className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8c9197]">
                  {section.title}
                </div>
                <div className="flex flex-col gap-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`group relative flex items-center justify-between rounded-[4px] px-3 py-2 text-[13px] font-medium transition-all text-left ${
                          isActive
                            ? 'bg-[#242932] text-[#e3e7ec]'
                            : 'text-[#a5adb8] hover:bg-[#1d2127] hover:text-[#e3e7ec]'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Icon
                            size={16}
                            className={`shrink-0 transition-colors ${
                              isActive
                                ? 'text-[#c5e3fc]'
                                : 'text-[#8c9197] group-hover:text-[#e3e7ec]'
                            }`}
                          />
                          <span className="truncate">{item.label}</span>
                        </div>

                        {item.badge && (
                          <span
                            className={`shrink-0 rounded-[2px] px-1.5 py-0.5 text-[10px] font-medium tracking-wide ${
                              item.badgeType === 'ai'
                                ? 'bg-[rgba(167,200,177,0.14)] text-[#a7c8b1] border border-[rgba(167,200,177,0.3)]'
                                : item.badgeType === 'status'
                                ? 'bg-[rgba(167,200,177,0.14)] text-[#a7c8b1] border border-[rgba(167,200,177,0.25)]'
                                : item.badgeType === 'alert'
                                ? 'bg-[rgba(217,193,154,0.14)] text-[#d9c19a] border border-[rgba(217,193,154,0.3)]'
                                : 'bg-[#242932] text-[#a5adb8] border border-[#303640]'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Widget: Autonomous Bookkeeper */}
        <div className="border-t border-[#303640] p-4 bg-[#15171b]/60">
          <div className="flex flex-col gap-2 rounded-[4px] border border-[#303640] bg-[#1d2127] p-3">
            <div className="flex items-center gap-2 text-[12px] font-medium text-[#e3e7ec]">
              <ShieldCheck size={15} className="text-[#a9c7df]" />
              <span>Autonomous CA Bot</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#a5adb8] tabular-nums">
              <span>GSTN Audit Vault</span>
              <span className="font-medium text-[#e3e7ec]">7.4 / 10 GB</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-[2px] bg-[#15171b]">
              <div
                className="h-full rounded-[2px] bg-[#a9c7df] transition-all duration-500"
                style={{ width: '74%' }}
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
