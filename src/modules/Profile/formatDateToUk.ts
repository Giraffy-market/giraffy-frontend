const monthsUk = [
  'січня',
  'лютого',
  'березня',
  'квітня',
  'травня',
  'червня',
  'липня',
  'серпня',
  'вересня',
  'жовтня',
  'листопада',
  'грудня',
];

export function formatDateToUk(dateStr: string) {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  const month = monthsUk[date.getMonth()];
  const year = date.getFullYear();
  return `${month} ${year}`;
}
