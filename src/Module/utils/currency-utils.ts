export function cleanCurrencyValue(value: string): number {
  // Remove currency symbols and spaces
  const cleaned = value.replace(/[^\d,.-]/g, "");
  //if the cleaned values has . and , them normalize it else parseFloat directly
  if (cleaned.includes(".") && cleaned.includes(",")) {
    // Replace dot (thousands separator) with nothing and comma (decimal separator) with dot
    const normalized = cleaned.replace(/\./g, "").replace(",", ".");

    // Parse to float
    const parsed = parseFloat(normalized);

    return parsed;
  } else {
    const parsed = parseFloat(cleaned);
    return parsed;
  }
}
