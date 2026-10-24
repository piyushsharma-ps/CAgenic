export type ViewId =
  | 'overview'
  | 'ai-accountant'
  | 'transactions'
  | 'documents'
  | 'cash-flow'
  | 'tax-gst'
  | 'insights'
  | 'customers'
  | 'settings';

export interface Entity {
  id: string;
  name: string;
  jurisdiction: string;
  currency: string;
  accountType: string;
  gstin: string;
  pan: string;
  state: string;
  isVerified: boolean;
}

export interface MetricCardData {
  title: string;
  value: string;
  subValue?: string;
  rawAmount: number;
  trendText: string;
  trendType: 'positive' | 'neutral' | 'negative';
  statusNote: string;
  actionText: string;
  actionView: ViewId;
  marginBadge?: string;
}

export interface CashFlowDataPoint {
  date: string;
  displayDate: string;
  inflow: number;
  outflow: number;
  netInflow: number;
  cumulativeNet: number;
  note?: string;
}

export interface AttentionItem {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  badgeText: 'OVERDUE' | 'UNASSIGNED' | 'GST ITC REQ';
  badgeType: 'error' | 'warning' | 'info';
  primaryActionLabel: string;
  secondaryActionLabel?: string;
  entity: string;
  date: string;
  gstin?: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'import' | 'payment' | 'compliance' | 'adjustment';
  amount?: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  entity: string;
  account: string;
  inflow?: number;
  outflow?: number;
  gstAmount?: number;
  tdsAmount?: number;
  hsnSacCode?: string;
  status: 'reconciled' | 'unassigned' | 'pending' | 'flagged' | 'overdue';
  receiptAttached?: boolean;
  referenceNo?: string;
}

export interface CustomerSupplier {
  id: string;
  name: string;
  type: 'customer' | 'supplier';
  contactEmail: string;
  balance: number;
  currency: string;
  gstin: string;
  status: 'current' | 'overdue' | 'settled';
  terms: string;
  lastActive: string;
}

export interface DocumentRecord {
  id: string;
  title: string;
  vendor: string;
  date: string;
  category: string;
  amount: number;
  gstin?: string;
  irnNumber?: string;
  status: 'extracted' | 'pending_ocr' | 'missing_receipt' | 'archived';
  fileType: 'pdf' | 'png' | 'csv';
}
