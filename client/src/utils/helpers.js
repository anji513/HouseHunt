export const formatCurrency = (value) => `$${Number(value || 0).toLocaleString()}`;
export const slugify = (value) => value.toLowerCase().trim().replace(/\s+/g, '-');
