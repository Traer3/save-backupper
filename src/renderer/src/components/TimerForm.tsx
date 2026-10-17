import { useEffect, useState } from 'react'

interface TimerFormProps {
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
    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
      <span>Time left: {timeLeft}s</span>
    </div>
  )
}

export default TimerForm
