export function formatDateToUk(dateStr: string) {
  if (!dateStr) return '-';
  const date = new Date(dateStr);

  const formatted = new Intl.DateTimeFormat('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);

  const parts = formatted.split(' ');

  const monthGenitive = parts[1];
  const year = parts[2];

  if (!monthGenitive) {
    return null;
  }

  const capitalizedMonth =
    monthGenitive.charAt(0).toUpperCase() + monthGenitive.slice(1);

  return `${capitalizedMonth} ${year}`;
}
