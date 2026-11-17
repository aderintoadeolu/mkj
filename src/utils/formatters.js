export function formatNaira(amount) {
  if (typeof amount !== 'number') return '₦0';
  return '₦' + amount.toLocaleString('en-NG');
}

export function formatDollar(amount) {
  if (typeof amount !== 'number') return '$0';
  return '$' + amount.toLocaleString('en-US');
}
