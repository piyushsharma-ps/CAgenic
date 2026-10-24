import React, { useState, useEffect } from 'react';
import { ViewId, Entity, AttentionItem, ActivityItem, Transaction } from './types';
import {
  ENTITIES,
  INITIAL_ATTENTION_ITEMS,
  INITIAL_ACTIVITIES,
  TRANSACTIONS,
} from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { OverviewView } from './components/OverviewView';
import { AIAccountantView } from './components/AIAccountantView';
import { TransactionsView } from './components/TransactionsView';
import { DocumentsView } from './components/DocumentsView';
import { CashFlowView } from './components/CashFlowView';
import { TaxGSTView } from './components/TaxGSTView';
import { InsightsView } from './components/InsightsView';
import { CustomersSuppliersView } from './components/CustomersSuppliersView';
import { SettingsView } from './components/SettingsView';
import { AddBusinessDataModal } from './components/AddBusinessDataModal';
import { SendReminderModal } from './components/SendReminderModal';
import { UploadReceiptModal } from './components/UploadReceiptModal';
import { InvoiceReviewModal } from './components/InvoiceReviewModal';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { formatINR } from './utils/formatters';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginView } from './components/auth/LoginView';
import { Loader2 } from 'lucide-react';
import {
  subscribeTransactions,
  subscribeAttentionItems,
  subscribeActivities,
  addFirestoreTransaction,
  updateFirestoreTransaction,
  deleteFirestoreAttentionItem,
  addFirestoreActivity,
} from './services/ledgerService';

function DashboardLayout() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<ViewId>('overview');
  const [entities] = useState<Entity[]>(ENTITIES);
  const [selectedEntity, setSelectedEntity] = useState<Entity>(ENTITIES[0]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);

  // Dynamic Ledger State backed by Google Cloud Firestore
  const [attentionItems, setAttentionItems] = useState<AttentionItem[]>(INITIAL_ATTENTION_ITEMS);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  const [transactions, setTransactions] = useState<Transaction[]>(TRANSACTIONS);

  // Modals state
  const [isAddDataOpen, setIsAddDataOpen] = useState(false);
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  const [reminderItem, setReminderItem] = useState<AttentionItem | null>(null);
  const [isUploadReceiptOpen, setIsUploadReceiptOpen] = useState(false);
  const [uploadItem, setUploadItem] = useState<AttentionItem | null>(null);
  const [isInvoiceReviewOpen, setIsInvoiceReviewOpen] = useState(false);
  const [reviewItem, setReviewItem] = useState<AttentionItem | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Real-time Firestore sync
  useEffect(() => {
    if (!user) return;

    const unsubTx = subscribeTransactions(user.uid, (data) => setTransactions(data));
    const unsubItems = subscribeAttentionItems(user.uid, (data) => setAttentionItems(data));
    const unsubActs = subscribeActivities(user.uid, (data) => setActivities(data));

    return () => {
      unsubTx();
      unsubItems();
      unsubActs();
    };
  }, [user]);

  // Sync theme with html root
  useEffect(() => {
    if (!isDarkMode) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [isDarkMode]);

  // Global ⌘K keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Actions with Firestore sync
  const handleAutoCategorize = async () => {
    if (user) {
      for (const t of transactions) {
        if (t.status === 'unassigned') {
          await updateFirestoreTransaction(user.uid, t.id, {
            status: 'reconciled',
            category: 'Direct Sales Inflow',
          });
        }
      }

      for (const item of attentionItems) {
        if (item.badgeText === 'UNASSIGNED') {
          await deleteFirestoreAttentionItem(user.uid, item.id);
        }
      }

      const newAct: ActivityItem = {
        id: `act-${Date.now()}`,
        title: 'Razorpay payouts auto-categorized',
        description: '2 settlement batches mapped to Direct Sales & Gateway GST (₹1,28,000.00)',
        timestamp: 'Just now',
        type: 'import',
        amount: 128000.0,
      };
      await addFirestoreActivity(user.uid, newAct);
    } else {
      setTransactions((prev) =>
        prev.map((t) =>
          t.status === 'unassigned'
            ? { ...t, status: 'reconciled', category: 'Direct Sales Inflow' }
            : t
        )
      );
      setAttentionItems((prev) => prev.filter((item) => item.badgeText !== 'UNASSIGNED'));
    }

    triggerToast('✓ Razorpay settlements auto-categorized & synced to Google Cloud Firestore');
  };

  const handleReminderSent = async (itemId: string) => {
    if (user) {
      await deleteFirestoreAttentionItem(user.uid, itemId);
      const newAct: ActivityItem = {
        id: `act-${Date.now()}`,
        title: 'Reminder sent: Invoice #INV-2024-089',
        description: 'Dispatched to accounts@nordicdesigns.in (₹3,42,000.00 with UPI/RTGS)',
        timestamp: 'Just now',
        type: 'payment',
        amount: 342000.0,
      };
      await addFirestoreActivity(user.uid, newAct);
    } else {
      setAttentionItems((prev) => prev.filter((item) => item.id !== itemId));
    }
    triggerToast('✓ Payment reminder dispatched with HDFC IFSC & Corporate UPI QR');
  };

  const handleReceiptUploaded = async (itemId: string) => {
    if (user) {
      await deleteFirestoreAttentionItem(user.uid, itemId);
      await updateFirestoreTransaction(user.uid, 'tx-105', {
        status: 'reconciled',
        receiptAttached: true,
      });
      const newAct: ActivityItem = {
        id: `act-${Date.now()}`,
        title: 'AISPL AWS GST Tax Invoice verified',
        description: '₹6,544.00 GST Input Tax Credit unlocked under Section 16(2)(aa)',
        timestamp: 'Just now',
        type: 'compliance',
        amount: 42900.0,
      };
      await addFirestoreActivity(user.uid, newAct);
    } else {
      setAttentionItems((prev) => prev.filter((item) => item.id !== itemId));
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === 'tx-105'
            ? { ...t, status: 'reconciled', receiptAttached: true }
            : t
        )
      );
    }
    triggerToast('✓ AISPL AWS Invoice matched to GSTR-2B; ₹6,544 ITC claimed in Firestore');
  };

  const handleAddTransaction = async (newTxData: Omit<Transaction, 'id'>) => {
    const created: Transaction = {
      id: `tx-${Date.now()}`,
      ...newTxData,
    };

    if (user) {
      await addFirestoreTransaction(user.uid, created);
      const newAct: ActivityItem = {
        id: `act-${Date.now()}`,
        title: created.inflow ? 'Revenue voucher posted' : 'Expense disbursement posted',
        description: `${created.description} (${formatINR(created.inflow || created.outflow || 0)})`,
        timestamp: 'Just now',
        type: created.inflow ? 'import' : 'payment',
        amount: created.inflow || created.outflow,
      };
      await addFirestoreActivity(user.uid, newAct);
    } else {
      setTransactions((prev) => [created, ...prev]);
    }
    triggerToast('✓ Voucher posted to Google Cloud General Ledger with verified GST entry');
  };

  const unassignedCount = transactions.filter((t) => t.status === 'unassigned').length;

  return (
    <div className={`min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] antialiased flex flex-col font-sans ${isDarkMode ? '' : 'light'}`}>
      <div className="flex flex-1 min-h-screen">
        {/* Left Navigation Sidebar */}
        <Sidebar
          currentView={currentView}
          onSelectView={setCurrentView}
          isOpenMobile={isOpenMobile}
          onCloseMobile={() => setIsOpenMobile(false)}
          unassignedCount={unassignedCount}
        />

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col min-w-0 overflow-y-auto">
          {/* Top Header */}
          <Header
            currentView={currentView}
            entities={entities}
            selectedEntity={selectedEntity}
            onSelectEntity={setSelectedEntity}
            isDarkMode={isDarkMode}
            onToggleTheme={() => setIsDarkMode(!isDarkMode)}
            onOpenMobileMenu={() => setIsOpenMobile(true)}
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
            onNavigate={setCurrentView}
          />

          {/* Main View Router */}
          <main className="flex-1 pb-16">
            {currentView === 'overview' && (
              <OverviewView
                selectedEntity={selectedEntity}
                onNavigate={setCurrentView}
                onOpenAddData={() => setIsAddDataOpen(true)}
                onOpenReviewInvoice={(item) => {
                  setReviewItem(item);
                  setIsInvoiceReviewOpen(true);
                }}
                onOpenSendReminder={(item) => {
                  setReminderItem(item);
                  setIsReminderOpen(true);
                }}
                onOpenUploadReceipt={(item) => {
                  setUploadItem(item);
                  setIsUploadReceiptOpen(true);
                }}
                attentionItems={attentionItems}
                onAutoCategorize={handleAutoCategorize}
                activities={activities}
              />
            )}

            {currentView === 'ai-accountant' && (
              <AIAccountantView selectedEntity={selectedEntity} />
            )}

            {currentView === 'transactions' && (
              <TransactionsView
                transactions={transactions}
                onBatchReconcile={handleAutoCategorize}
                onOpenAddTransaction={() => setIsAddDataOpen(true)}
              />
            )}

            {currentView === 'documents' && <DocumentsView />}

            {currentView === 'cash-flow' && <CashFlowView />}

            {currentView === 'tax-gst' && <TaxGSTView />}

            {currentView === 'insights' && (
              <InsightsView onNavigate={setCurrentView} />
            )}

            {currentView === 'customers' && <CustomersSuppliersView />}

            {currentView === 'settings' && (
              <SettingsView selectedEntity={selectedEntity} />
            )}
          </main>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-[4px] border border-[#303640] bg-[#242932] px-4 py-2.5 text-[12px] font-medium text-[#e3e7ec] shadow-xl animate-in slide-in-from-bottom-3 duration-200">
          <span className="h-1.5 w-1.5 rounded-full bg-[#a7c8b1]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Interactive Modals */}
      <AddBusinessDataModal
        isOpen={isAddDataOpen}
        onClose={() => setIsAddDataOpen(false)}
        onAddTransaction={handleAddTransaction}
        entityName={selectedEntity.name}
      />

      <SendReminderModal
        isOpen={isReminderOpen}
        onClose={() => {
          setIsReminderOpen(false);
          setReminderItem(null);
        }}
        item={reminderItem}
        onSent={handleReminderSent}
      />

      <UploadReceiptModal
        isOpen={isUploadReceiptOpen}
        onClose={() => {
          setIsUploadReceiptOpen(false);
          setUploadItem(null);
        }}
        item={uploadItem}
        onUploaded={handleReceiptUploaded}
      />

      <InvoiceReviewModal
        isOpen={isInvoiceReviewOpen}
        onClose={() => {
          setIsInvoiceReviewOpen(false);
          setReviewItem(null);
        }}
        item={reviewItem}
        onOpenReminder={() => {
          setReminderItem(reviewItem);
          setIsReminderOpen(true);
        }}
      />

      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={setCurrentView}
      />
    </div>
  );
}

function AppContent() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#15171b] text-[#e3e7ec] flex flex-col items-center justify-center gap-3">
        <Loader2 size={24} className="animate-spin text-[#a9c7df]" />
        <span className="font-serif text-sm tracking-wide text-[#8c9197]">
          Connecting to Google Cloud Firestore...
        </span>
      </div>
    );
  }

  if (!user) {
    return <LoginView />;
  }

  return <DashboardLayout />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
