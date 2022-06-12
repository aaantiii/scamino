// Standard Datumsstring
// Datum fr-CH = DD.MM.YYYY
export function getDefaultDateString(datetime: Date) {
  return `${datetime.toLocaleDateString('fr-CH')} ${datetime.toLocaleTimeString('de-DE')}`
}
