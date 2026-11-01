import { useEffect, useState } from 'react'
import { getFormattedData } from './FormatTime'

interface TimerFormProps {
  // на будущее передавать не сами секунды , а конечное время через Date.now() без проеба
  initialSeconds: number
  onComplete?: () => void
}

const TimerForm = ({ initialSeconds, onComplete }: TimerFormProps): React.JSX.Element => {
  const [timeLeft, setTimeLeft] = useState<number>(initialSeconds)
  const [prevInitialSeconds, setPrevInitalSeconds] = useState<number>(initialSeconds)

  if (initialSeconds !== prevInitialSeconds) {
    setPrevInitalSeconds(initialSeconds)
    setTimeLeft(initialSeconds)
  }
  useEffect(() => {
    if (timeLeft <= 0) {
      if (onComplete) onComplete()
      return
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(timerId)
  }, [timeLeft, onComplete])

  return (
    <div style={styles.mainBody}>
      <span title={`${getFormattedData(timeLeft)}`}>{getFormattedData(timeLeft)}</span>
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
    //border: '1px solid red',
    width: '27%',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'flex-end'
  }
}
