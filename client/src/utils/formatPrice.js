/**
 * Format a number as a currency string.
 * @param {number} price - The price value.
 * @returns {string} Formatted price string, e.g. "$29.99"
 */
export function formatPrice(price) {
  return `₹${Number(price).toFixed(2)}`;
}

export function formatIncrement(amount) {
  const n = Number(amount);
  if (!n) return '';
  return `+₹${n.toFixed(2)}`;
}
