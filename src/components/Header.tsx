import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ChevronDown,
  Sun,
  Moon,
  Menu,
  Check,
  Building2,
  Fingerprint,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { Entity, ViewId } from '../types';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  currentView: ViewId;
  entities: Entity[];
  selectedEntity: Entity;
  onSelectEntity: (entity: Entity) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenMobileMenu: () => void;
  onOpenCommandPalette: () => void;
  onNavigate?: (view: ViewId) => void;
}

const VIEW_TITLES: Record<ViewId, string> = {
  overview: 'Overview',
  'ai-accountant': 'AI Chartered Accountant',
  transactions: 'Transactions',
  documents: 'Documents & e-Invoices',
  'cash-flow': 'Cash Flow & Runway',
  'tax-gst': 'GST & TDS Compliance',
  insights: 'Business Insights',
  customers: 'Customers & Suppliers',
  settings: 'Settings',
};

export const Header: React.FC<HeaderProps> = ({
  currentView,
  entities,
  selectedEntity,
  onSelectEntity,
  isDarkMode,
  onToggleTheme,
  onOpenMobileMenu,
  onOpenCommandPalette,
  onNavigate,
}) => {
  const { user, logout } = useAuth();
  const [isEntityDropdownOpen, setIsEntityDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsEntityDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-[#303640] bg-[#191c21]/95 px-4 lg:px-6 backdrop-blur-md">
      {/* Left: Breadcrumbs + Entity Switcher */}
      <div className="flex items-center gap-2 text-[13px] text-[#a5adb8] min-w-0">
        <button
          onClick={onOpenMobileMenu}
          className="mr-1 rounded p-1 text-[#a5adb8] hover:bg-[#242932] hover:text-[#e3e7ec] lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={18} />
        </button>

        <span className="hidden sm:inline-block font-normal text-[#8c9197]">Ledger</span>
        <span className="hidden sm:inline-block text-[#42474c]">/</span>

        {/* Entity Selector Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsEntityDropdownOpen(!isEntityDropdownOpen)}
            className="flex items-center gap-2 rounded-[4px] border border-[#303640] bg-[#15171b] px-2.5 py-1 text-[13px] font-medium text-[#e3e7ec] transition-colors hover:border-[#a9c7df] hover:bg-[#1d2127]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#a7c8b1]" />
            <span className="max-w-[140px] truncate sm:max-w-none">{selectedEntity.name}</span>
            <ChevronDown size={14} className="text-[#a5adb8]" />
          </button>

          {isEntityDropdownOpen && (
            <div className="absolute left-0 mt-1 w-72 rounded-[4px] border border-[#303640] bg-[#242932] p-1.5 shadow-xl shadow-black/40 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#8c9197]">
                Switch Indian Entity
              </div>
              {entities.map((entity) => (
                <button
                  key={entity.id}
                  onClick={() => {
                    onSelectEntity(entity);
                    setIsEntityDropdownOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-[2px] px-2.5 py-2 text-left text-[12px] transition-colors ${
                    selectedEntity.id === entity.id
                      ? 'bg-[#1d2127] text-[#c5e3fc]'
                      : 'text-[#e3e7ec] hover:bg-[#1d2127]'
                  }`}
                >
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium truncate">{entity.name}</span>
                    <span className="text-[10px] font-mono text-[#a5adb8]">
                      GSTIN: {entity.gstin} · {entity.state}
                    </span>
                  </div>
                  {selectedEntity.id === entity.id && (
                    <Check size={14} className="text-[#c5e3fc] shrink-0" />
                  )}
                </button>
              ))}
              <div className="mt-1 border-t border-[#303640] pt-1">
                <button
                  onClick={() => setIsEntityDropdownOpen(false)}
                  className="flex w-full items-center gap-2 rounded-[2px] px-2.5 py-1.5 text-[11px] text-[#a5adb8] hover:bg-[#1d2127] hover:text-[#e3e7ec]"
                >
                  <Building2 size={13} />
                  <span>GST Multi-State Branch Master</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <span className="hidden sm:inline-block text-[#42474c]">/</span>
        <span className="hidden md:inline-block font-normal text-[#e3e7ec]">
          {VIEW_TITLES[currentView]}
        </span>
      </div>

      {/* Center: Search Field (Global ⌘K) */}
      <div className="hidden md:flex flex-1 max-w-[420px] mx-4">
        <button
          onClick={onOpenCommandPalette}
          className="flex h-8.5 w-full items-center justify-between rounded-[4px] border border-[#303640] bg-[#15171b] px-3 text-[12px] text-[#8c9197] transition-all hover:border-[#a9c7df] hover:text-[#a5adb8]"
        >
          <div className="flex items-center gap-2">
            <Search size={14} className="text-[#8c9197]" />
            <span className="truncate">Search GST e-invoices, GSTR-2B, TDS records...</span>
          </div>
          <kbd className="rounded border border-[#303640] bg-[#1d2127] px-1.5 py-0.5 text-[10px] font-mono text-[#a5adb8]">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Sync Status + Theme Switcher + Profile */}
      <div className="flex items-center gap-3.5">
        <button
          onClick={onOpenCommandPalette}
          className="rounded p-1.5 text-[#a5adb8] hover:bg-[#242932] md:hidden"
          aria-label="Search"
        >
          <Search size={16} />
        </button>

        {/* GSTN & Bank Sync Indicator */}
        <div className="hidden xl:flex items-center gap-1.5 text-[11px] text-[#a5adb8] tabular-nums">
          <span className="h-1.5 w-1.5 rounded-full bg-[#a7c8b1]" />
          <span>GSTN & HDFC Synced 1m ago</span>
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center rounded-[4px] border border-[#303640] bg-[#15171b] p-0.5">
          <button
            onClick={onToggleTheme}
            className={`rounded-[2px] p-1.5 transition-colors ${
              isDarkMode
                ? 'bg-[#242932] text-[#e3e7ec]'
                : 'text-[#8c9197] hover:text-[#e3e7ec]'
            }`}
            title="Dark theme"
            aria-label="Dark theme"
          >
            <Moon size={13} />
          </button>
          <button
            onClick={onToggleTheme}
            className={`rounded-[2px] p-1.5 transition-colors ${
              !isDarkMode
                ? 'bg-[#242932] text-[#e3e7ec]'
                : 'text-[#8c9197] hover:text-[#e3e7ec]'
            }`}
            title="Light theme"
            aria-label="Light theme"
          >
            <Sun size={13} />
          </button>
        </div>

        {/* Profile Badge & Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center gap-2.5 pl-1 rounded-[4px] p-1 hover:bg-[#242932] transition-colors select-none text-left"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-[#303640] bg-[#242932] text-[11px] font-semibold text-[#e3e7ec]">
              {user?.email ? user.email.slice(0, 2).toUpperCase() : 'MV'}
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-[12px] font-medium text-[#e3e7ec] max-w-[130px] truncate">
                {user?.email ? user.email.split('@')[0] : 'Marcus Vance'}
              </span>
              <span className="text-[10px] text-[#a7c8b1] flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a7c8b1]" />
                <span>Google Cloud Verified</span>
              </span>
            </div>
          </button>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-1 w-64 rounded-[4px] border border-[#303640] bg-[#242932] p-2 shadow-xl shadow-black/40 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-2.5 py-2 border-b border-[#303640] flex flex-col">
                <span className="text-[12px] font-medium text-[#e3e7ec] truncate">
                  {user?.displayName || user?.email || 'officer@cagenix.in'}
                </span>
                <span className="text-[10px] text-[#8c9197] mt-0.5 flex items-center gap-1">
                  <ShieldCheck size={11} className="text-[#a7c8b1]" />
                  <span>Google Cloud Firestore Session</span>
                </span>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    onNavigate?.('settings');
                  }}
                  className="flex w-full items-center gap-2 rounded-[2px] px-2.5 py-1.5 text-[12px] text-[#e3e7ec] hover:bg-[#1d2127] transition-colors"
                >
                  <Building2 size={13} className="text-[#a9c7df]" />
                  <span>Cloud & Statutory Settings</span>
                </button>
              </div>

              <div className="border-t border-[#303640] pt-1">
                <button
                  onClick={async () => {
                    setIsProfileDropdownOpen(false);
                    await logout();
                  }}
                  className="flex w-full items-center gap-2 rounded-[2px] px-2.5 py-1.5 text-[12px] text-[#d98282] hover:bg-[#1d2127] transition-colors"
                >
                  <LogOut size={13} />
                  <span>Lock & Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
