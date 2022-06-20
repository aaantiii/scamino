// Datum fr-CH = DD.MM.YYYY
export function toDefaultDateTimeString(datetime: Date) {
  return `${datetime.toLocaleDateString('fr-CH')} ${datetime.toLocaleTimeString('de-DE')}`
}
