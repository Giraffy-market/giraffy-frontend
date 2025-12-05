export function formatDateToUk(dateStr: string) {
  if (!dateStr) return '-';
  const date = new Date(dateStr);

  const formatted = new Intl.DateTimeFormat('uk-UA', {
    month: 'long',
    year: 'numeric',
  }).format(date);

  return formatted.replace(/\s*р\.$/, '');
}
