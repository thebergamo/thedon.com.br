export const formatDate = (date: string, locale: string | undefined) => {
  const pDate = new Date(date);
  return new Intl.DateTimeFormat(locale, {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit'
  }).format(pDate);
};
