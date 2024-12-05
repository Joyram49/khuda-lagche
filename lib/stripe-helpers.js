export function formatAmountForStripe(amount, currency) {
  let formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    currencyDisplay: "narrowSymbol",
  });

  const parts = formatted.formatToParts(amount);

  let zeroDecimalCurrency = true;
  for (let part of parts) {
    if (part.type === "decimal") {
      zeroDecimalCurrency = false;
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}
