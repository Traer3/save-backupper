const rtf = new Intl.RelativeTimeFormat('ru-RU', { numeric: 'always' })
const formatUnit = (value: number, unit: Intl.RelativeTimeFormatUnit): string => {
  return rtf
    .format(value, unit)
    .replace(/^(через\s|спустя\s)/, '')
    .replace(/\sназад$/, '')
}

export const getFormattedData = (secondsInput: string | number): string => {
  const totalSeconds = Number(secondsInput) || 0
  if (totalSeconds < 60) {
    return formatUnit(totalSeconds, 'second')
  }

  const totalMinutes = Math.floor(totalSeconds / 60)

  const minutes = Math.floor(totalSeconds / 60)
  if (minutes < 60) {
    return `${formatUnit(totalSeconds, 'second')} ${formatUnit(minutes, 'minute')}`
  }

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = totalMinutes % 60
  if (hours < 24) {
    if (remainingMinutes === 0) {
      return formatUnit(hours, 'hour')
    }
    return `${formatUnit(hours, 'hour')} ${formatUnit(remainingMinutes, 'minute')}`
  }

  const days = Math.floor(hours / 24)
  const remainingHours = hours % 24
  if (remainingHours === 0) {
    return formatUnit(days, 'day')
  }

  return `${formatUnit(days, 'day')} ${formatUnit(remainingHours, 'hour')}`
}
