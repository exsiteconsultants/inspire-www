export function getDateString(date: Date) {
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()

  return `${day}/${month}/${year}`
}
