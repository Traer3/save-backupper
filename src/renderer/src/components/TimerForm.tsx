import { useEffect, useState } from 'react'
import { getFormattedData } from './FormatTime'

interface TimerFormProps {
  backupComplet?: boolean
  initialSeconds: number
  isBackingUp?: boolean
  onComplete?: () => void
}

const DELAY_FOR_MISSED_BACKUP = 20

const TimerForm = ({
  initialSeconds,
  onComplete,
  isBackingUp,
  backupComplet
}: TimerFormProps): React.JSX.Element => {
  const startingSeconds = initialSeconds <= 0 ? DELAY_FOR_MISSED_BACKUP : initialSeconds
  const [timeLeft, setTimeLeft] = useState<number>(startingSeconds)
  const [prevInitialSeconds, setPrevInitalSeconds] = useState<number>(initialSeconds)
  const [hasTriggered, setHasTriggered] = useState<boolean>(false)

  if (initialSeconds !== prevInitialSeconds) {
    setPrevInitalSeconds(initialSeconds)
    setTimeLeft(initialSeconds <= 0 ? DELAY_FOR_MISSED_BACKUP : initialSeconds)
    setHasTriggered(false)
  }

  useEffect(() => {
    if (backupComplet) return
    if (isBackingUp || hasTriggered) return
    if (timeLeft <= 0) {
      //console.log('start function')
      onComplete?.()
      return
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1))
    }, 1000)

    return () => clearInterval(timerId)
  }, [timeLeft, onComplete, backupComplet, isBackingUp, hasTriggered]) 
  return (
    <div style={styles.mainBody}>
      <span title={`${getFormattedData(timeLeft)}`}>
        {isBackingUp ? 'Backup...' : getFormattedData(timeLeft)}
      </span>
    </div>
  )
}

export default TimerForm

const styles: Record<string, React.CSSProperties> = {
  mainBody: {
    fontSize: '13px',
    fontWeight: 'bold',
    fontWidth: '600',
    color: '#EBF8E7',
    width: '27%',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'flex-end'
  }
}
