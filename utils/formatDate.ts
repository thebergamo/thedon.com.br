export const formatDate = (
  date: string | undefined,
  locale: string | undefined
) => {
  if (!date) {
    return ''
  }
  const pDate = new Date(date)
  return new Intl.DateTimeFormat(locale, {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  }).format(pDate)
}
