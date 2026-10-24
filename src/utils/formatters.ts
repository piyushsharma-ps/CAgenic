/**
 * Formats a number according to the Indian Numbering System (Lakhs and Crores)
 * e.g. 8423050.50 -> ₹84,23,050.50
 */
export function formatINR(
  val: number | undefined | null,
  options?: { showPaise?: boolean; prefix?: boolean }
): string {
  if (val === undefined || val === null || isNaN(val)) return '—';

  const prefix = options?.prefix !== false ? '₹' : '';
  const showPaise = options?.showPaise !== false;

  const isNegative = val < 0;
  const absVal = Math.abs(val);

  const [integerPart, decimalPart = ''] = absVal.toFixed(2).split('.');

  // Indian comma logic: last 3 digits, then groups of 2 digits
  let lastThree = integerPart.substring(integerPart.length - 3);
  const otherNumbers = integerPart.substring(0, integerPart.length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const formattedInteger = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

  const formattedDecimal = showPaise ? `.${decimalPart}` : '';
  const sign = isNegative ? '-' : '';

  return `${sign}${prefix}${formattedInteger}${formattedDecimal}`;
}

/**
 * Returns executive abbreviated Lakhs / Crores string
 * e.g. 8423050.5 -> "₹84.23 L"
 * e.g. 14250000.0 -> "₹1.42 Cr"
 */
export function formatINRAbbreviated(val: number | undefined | null): string {
  if (val === undefined || val === null || isNaN(val)) return '—';

  const absVal = Math.abs(val);
  const sign = val < 0 ? '-' : '';

  if (absVal >= 10000000) {
    // 1 Crore = 10,000,000
    const inCr = (absVal / 10000000).toFixed(2);
    return `${sign}₹${inCr} Cr`;
  } else if (absVal >= 100000) {
    // 1 Lakh = 100,000
    const inLakh = (absVal / 100000).toFixed(2);
    return `${sign}₹${inLakh} L`;
  } else if (absVal >= 1000) {
    return `${sign}₹${(absVal / 1000).toFixed(1)}k`;
  }

  return formatINR(val);
}
