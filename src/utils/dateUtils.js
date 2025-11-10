/**
 * Berechnet die Tagesnummer des aktuellen Tages im Jahr (1-365)
 * @returns {number} Die Tagesnummer im Jahr
 */
export const getToday = () => {
  const now = new Date()
  const startOfYear = new Date(now.getFullYear(), 0, 0)
  const difference = now.getTime() - startOfYear.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  const dayNumber = Math.floor(difference / oneDay)
  return dayNumber
}

/**
 * Konvertiert eine Tagesnummer im Jahr zu einem formatierten Datumsstring
 * @param {number} dayNumber - Die Tagesnummer im Jahr (1-365)
 * @returns {string} formatierte Datum
 */
export const convertDayToDate = (dayNumber) => {
  const year = new Date().getFullYear()
  const date = new Date(year, 0, dayNumber)
  const formatted = date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
  return formatted
}

/**
 * Generiert ein Array mit allen Tagesnummern des Jahres (1-365)
 * @returns {number[]} Array mit Tagesnummern
 */
export const generateYearDays = () => {
  const days = []
  for (let i = 1; i <= 365; i++) {
    days.push(i)
  }
  return days
}
