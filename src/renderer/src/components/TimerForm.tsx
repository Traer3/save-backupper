import { useEffect, useState } from 'react'

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

  const formatTime = (totalSeconds: number): string => {
    if (totalSeconds <= 0) return '00:00:00'

    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    const pad = (num: number): string => String(num).padStart(2, '0')

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  }
  return (
    <div style={styles.mainBody}>
      <span title={`Time left: ${formatTime(timeLeft)}`}>{formatTime(timeLeft)}</span>
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
    maxWidth: '25%',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'flex-end'
  }
}
