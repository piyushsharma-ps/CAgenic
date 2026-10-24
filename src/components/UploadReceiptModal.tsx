import React, { useState } from 'react';
import { X, UploadCloud, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import { AttentionItem } from '../types';
import { formatINR } from '../utils/formatters';

interface UploadReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: AttentionItem | null;
  onUploaded: (itemId: string) => void;
}

export const UploadReceiptModal: React.FC<UploadReceiptModalProps> = ({
  isOpen,
  onClose,
  item,
  onUploaded,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !item) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleProcessUpload = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onUploaded(item.id);
        setIsSuccess(false);
        setSelectedFile(null);
        onClose();
      }, 1200);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-[8px] border border-[#303640] bg-[#1d2127] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#303640] pb-4">
          <div className="flex items-center gap-2">
            <UploadCloud size={18} className="text-[#c5e3fc]" />
            <h2 className="font-serif text-lg font-medium text-[#e3e7ec]">
              Upload GST Tax Invoice (AISPL)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-[#8c9197] hover:bg-[#242932] hover:text-[#e3e7ec]"
          >
            <X size={18} />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-10 flex flex-col items-center justify-center text-center gap-3">
            <CheckCircle2 size={42} className="text-[#a7c8b1]" />
            <h3 className="font-serif text-lg font-medium text-[#e3e7ec]">
              GST Tax Invoice Verified & Matched!
            </h3>
            <p className="text-[12px] text-[#8c9197]">
              Matched to AWS Mumbai ledger entry (₹42,900.00). ₹6,544.00 Input Tax Credit (ITC) unlocked under Sec 16(2)(aa).
            </p>
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-4">
            <div className="rounded-[4px] border border-[#303640] bg-[#15171b] p-3 text-[12px]">
              <div className="flex justify-between py-0.5">
                <span className="text-[#8c9197]">Target Transaction:</span>
                <span className="font-medium text-[#e3e7ec]">AISPL AWS Cloud Mumbai</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-[#8c9197]">Amount:</span>
                <span className="font-medium text-[#e3e7ec] tabular-nums">
                  {formatINR(item.amount)}
                </span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-[#8c9197]">Supplier GSTIN:</span>
                <span className="font-mono text-[#c5e3fc]">27AACA04423L1ZW</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-[#8c9197]">Statutory Requirement:</span>
                <span className="text-[#a7c8b1]">Section 16(2)(aa) CGST Act for ITC</span>
              </div>
            </div>

            {/* Dropzone */}
            <label className="flex flex-col items-center justify-center rounded-[6px] border-2 border-dashed border-[#303640] bg-[#15171b]/60 p-6 text-center cursor-pointer transition-colors hover:border-[#a9c7df]">
              <FileText size={28} className="text-[#a9c7df] mb-2" />
              <span className="text-[13px] font-medium text-[#e3e7ec]">
                {selectedFile ? selectedFile.name : 'Select or drop AISPL AWS Invoice PDF'}
              </span>
              <span className="text-[11px] text-[#8c9197] mt-1">
                {selectedFile
                  ? `${(selectedFile.size / 1024).toFixed(1)} KB ready for OCR`
                  : 'PDF, PNG, JPG up to 25MB'}
              </span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
              />
            </label>

            {/* Submit */}
            <div className="flex justify-end gap-2 border-t border-[#303640] pt-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-[4px] border border-[#303640] px-3.5 py-1.5 text-[12px] text-[#a5adb8] hover:bg-[#242932] hover:text-[#e3e7ec]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleProcessUpload}
                disabled={isProcessing}
                className="flex items-center gap-1.5 rounded-[4px] bg-[#c5e3fc] px-4 py-1.5 text-[12px] font-medium text-[#143346] hover:bg-[#d8edfd] disabled:opacity-50"
              >
                <Sparkles size={13} />
                <span>{isProcessing ? 'Verifying GSTIN...' : 'Run GSTR-2B Match'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
