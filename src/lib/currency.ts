// Using process.env is safe here because this is a server-side module at build time.
// The values will be baked into the client-side bundle.

export const BASE_CURRENCY = 'USD';
export const SYMBOL = '$';
export const LOCALE = 'en-US';

export const EUR_TO_USD = Number(process.env.EUR_TO_USD) || 1.08;

export const ALLOWANCE_PRICE_USD = Number(process.env.ALLOWANCE_PRICE_USD) || 85;
export const DISCOUNT_RATE = Number(process.env.DISCOUNT_RATE) || 0.08;
export const ETS_CAGR = Number(process.env.ETS_CAGR) || 0.07;

export const MODULE_PRICING_USD = {
  complianceCore: Number(process.env.MODULE_PRICING_USD_COMPLIANCE) || 15000,
  fuelPlusAddOn: Number(process.env.MODULE_PRICING_USD_FUELPLUS) || 5000,
  hardwareOneOff: Number(process.env.HARDWARE_ONEOFF_USD) || 30000,
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
