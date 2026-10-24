import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Eye,
  Sparkles,
} from 'lucide-react';
import { DOCUMENTS } from '../data/mockData';
import { DocumentRecord } from '../types';
import { formatINR } from '../utils/formatters';

export const DocumentsView: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentRecord[]>(DOCUMENTS);
  const [isUploading, setIsUploading] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<DocumentRecord | null>(null);

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setTimeout(() => {
      const newDoc: DocumentRecord = {
        id: `doc-${Date.now()}`,
        title: file.name,
        vendor: 'Extracted: AISPL (AWS India)',
        date: '23 Sep 2024',
        category: 'Cloud Infrastructure & IT',
        amount: 42900.0,
        gstin: '27AACA04423L1ZW',
        irnNumber: '7a9c3b...41ed',
        status: 'extracted',
        fileType: file.name.endsWith('.csv') ? 'csv' : 'pdf',
      };
      setDocuments((prev) => [newDoc, ...prev]);
      setIsUploading(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-8 max-w-[1440px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-medium text-[#e3e7ec]">
            Document Intelligence & GST e-Invoice Vault
          </h1>
          <p className="text-[13px] text-[#a5adb8]">
            Automated OCR tax invoice parsing, GSTIN verification, e-Invoice QR scanning, and GSTR-2B match audit
          </p>
        </div>

        <label className="flex items-center gap-2 cursor-pointer rounded-[4px] bg-[#c5e3fc] px-4 py-2 text-[13px] font-medium text-[#143346] transition-colors hover:bg-[#d8edfd]">
          <Upload size={16} />
          <span>{isUploading ? 'Extracting via AI...' : 'Upload Tax Invoice / e-Way Bill'}</span>
          <input
            type="file"
            className="hidden"
            accept=".pdf,.png,.jpg,.jpeg,.csv"
            onChange={handleSimulatedUpload}
            disabled={isUploading}
          />
        </label>
      </div>

      {/* Drag & Drop Hero Zone */}
      <div className="rounded-[8px] border-2 border-dashed border-[#303640] bg-[#1d2127]/60 p-8 text-center transition-colors hover:border-[#a9c7df]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[4px] border border-[#303640] bg-[#15171b] text-[#c5e3fc] mb-3">
          <Upload size={22} />
        </div>
        <h3 className="text-[14px] font-medium text-[#e3e7ec]">
          Drop GST Tax Invoices, e-Invoices with QR, or Razorpay settlement CSVs
        </h3>
        <p className="text-[12px] text-[#8c9197] mt-1">
          Supports PDF, PNG, JPG, CSV up to 50MB. Optical Character Recognition automatically matches line items to supplier GSTIN and GSTR-2B portal entries.
        </p>
      </div>

      {/* Documents Grid */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-[12px] font-semibold text-[#8c9197] uppercase px-1">
          <span>Processed Vault Invoices ({documents.length})</span>
          <span>GSTIN Verification Rate: 100%</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col justify-between rounded-[6px] border border-[#303640] bg-[#1d2127] p-4 transition-colors hover:border-[#42474c]"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[4px] border border-[#303640] bg-[#15171b] text-[#a9c7df]">
                    <FileText size={18} />
                  </div>
                  <div className="flex flex-col max-w-[170px]">
                    <span className="font-medium text-[13px] text-[#e3e7ec] truncate">
                      {doc.title}
                    </span>
                    <span className="text-[11px] text-[#8c9197] truncate">{doc.vendor}</span>
                  </div>
                </div>

                <span
                  className={`rounded-[2px] border px-1.5 py-0.5 text-[9px] font-semibold uppercase ${
                    doc.status === 'extracted'
                      ? 'border-[rgba(167,200,177,0.3)] bg-[rgba(167,200,177,0.12)] text-[#a7c8b1]'
                      : 'border-[rgba(217,130,130,0.3)] bg-[rgba(217,130,130,0.12)] text-[#d98282]'
                  }`}
                >
                  {doc.status === 'extracted' ? 'GSTR-2B Matched' : 'Missing GST Invoice'}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-[#303640] pt-3 text-[12px]">
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#8c9197]">{doc.date}</span>
                  <span className="font-medium text-[#e3e7ec] tabular-nums">
                    {formatINR(doc.amount)}
                  </span>
                </div>

                <button
                  onClick={() => setPreviewDoc(doc)}
                  className="flex items-center gap-1 rounded-[3px] border border-[#303640] bg-[#15171b] px-2.5 py-1 text-[11px] text-[#a5adb8] hover:text-[#e3e7ec]"
                >
                  <Eye size={12} />
                  <span>Inspect OCR</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OCR Inspection Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-[6px] border border-[#303640] bg-[#242932] p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#303640] pb-3">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#a9c7df]" />
                <h3 className="font-medium text-[14px] text-[#e3e7ec]">
                  AI OCR Indian Tax Extraction
                </h3>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="text-[#8c9197] hover:text-[#e3e7ec]"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-2.5 text-[12px]">
              <div className="flex justify-between border-b border-[#303640]/50 py-1">
                <span className="text-[#8c9197]">Document Title</span>
                <span className="font-medium text-[#e3e7ec]">{previewDoc.title}</span>
              </div>
              <div className="flex justify-between border-b border-[#303640]/50 py-1">
                <span className="text-[#8c9197]">Vendor Legal Entity</span>
                <span className="font-medium text-[#e3e7ec]">{previewDoc.vendor}</span>
              </div>
              <div className="flex justify-between border-b border-[#303640]/50 py-1">
                <span className="text-[#8c9197]">Supplier GSTIN</span>
                <span className="font-mono text-[#c5e3fc]">{previewDoc.gstin || '27AACA04423L1ZW'}</span>
              </div>
              <div className="flex justify-between border-b border-[#303640]/50 py-1">
                <span className="text-[#8c9197]">Gross Taxable Amount</span>
                <span className="font-medium text-[#a7c8b1] tabular-nums">
                  {formatINR(previewDoc.amount)}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#303640]/50 py-1">
                <span className="text-[#8c9197]">GST Input Tax Credit</span>
                <span className="font-mono text-[#a7c8b1]">18% Eligible ITC (Sec 16 CGST)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#8c9197]">e-Invoice IRN Hash</span>
                <span className="font-mono text-[10px] text-[#8c9197] truncate max-w-[200px]">
                  {previewDoc.irnNumber || 'IRN: 5d7a8f...39ac (NIC Verified)'}
                </span>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setPreviewDoc(null)}
                className="rounded-[3px] bg-[#c5e3fc] px-4 py-1.5 text-[12px] font-medium text-[#143346]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
