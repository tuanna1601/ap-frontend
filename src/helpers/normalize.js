export const normalizePhone = (value) => value && value.replace(/[^\d]/g, '').trim();

export const min = (minValue) => (value, prevValue) => ((Number(value) >= Number(minValue)) ? value : minValue);

export const max = (maxValue) => (value, prevValue) => ((Number(value) <= Number(maxValue)) ? value : maxValue);
