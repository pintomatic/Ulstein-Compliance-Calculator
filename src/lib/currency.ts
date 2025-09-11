// Using process.env is safe here because this is a server-side module at build time.
// The values will be baked into the client-side bundle.

export const BASE_CURRENCY = process.env.NEXT_PUBLIC_BASE_CURRENCY || 'USD';
export const SYMBOL = process.env.NEXT_PUBLIC_SYMBOL || '$';
export const LOCALE = process.env.NEXT_PUBLIC_LOCALE || 'en-US';

export const EUR_TO_USD = Number(process.env.NEXT_PUBLIC_EUR_TO_USD) || 1.08;

export const ALLOWANCE_PRICE_USD = Number(process.env.NEXT_PUBLIC_ALLOWANCE_PRICE_USD) || 85;
export const DISCOUNT_RATE = Number(process.env.NEXT_PUBLIC_DISCOUNT_RATE) || 0.10;
export const ETS_CAGR = Number(process.env.NEXT_PUBLIC_ETS_CAGR) || 0.07;

export const MODULE_PRICING_USD = {
  complianceCore: Number(process.env.NEXT_PUBLIC_MODULE_PRICING_USD_COMPLIANCE) || 15000,
  fuelPlusAddOn: Number(process.env.NEXT_PUBLIC_MODULE_PRICING_USD_FUELPLUS) || 5000,
  hardwareOneOff: Number(process.env.NEXT_PUBLIC_HARDWARE_ONEOFF_USD) || 30000,
};

/**
 * Formats a number as a currency string.
 * @param value - The number to format.
 * @param options - Intl.NumberFormat options.
 * @returns A formatted currency string.
 */
export const formatMoney = (
  value: number,
  options: Intl.NumberFormatOptions = {}
): string => {
  const defaultOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: BASE_CURRENCY,
    maximumFractionDigits: 0,
    ...options,
  };
  return new Intl.NumberFormat(LOCALE, defaultOptions).format(value);
};

/**
 * Converts a EUR value to USD.
 * @param eur - The value in EUR.
 * @returns The value in USD.
 */
export const eurToUsd = (eur: number): number => {
  return eur * EUR_TO_USD;
};
