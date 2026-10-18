import { useState, useEffect } from 'react'
import SaveForm from './SaveForm'
import SaveInfoForm from './SaveInfoForm'
import TimerForm from './TimerForm'

interface SaveFileProps {
  name?: string
  savePath?: string
  lastBackup?: string
}

const SaveFile = ({ name, savePath, lastBackup }: SaveFileProps): React.JSX.Element => {
  const [showExtra, setShowExtra] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const intervalHours = 128
  const getRemainingSeconds = (lastBackupTime: string): void => {
    const lastBackupMs = new Date(lastBackupTime).getTime()
    const intervalMs = intervalHours * 60 * 60 * 1000
    const nextBackupMs = lastBackupMs + intervalMs

    const diffInSeconds = Math.floor((nextBackupMs - Date.now()) / 1000)
    setTimeLeft(diffInSeconds > 0 ? diffInSeconds : 0)
  }
  useEffect(() => {
    const getTime = async (): Promise<void> => {
      const info = await window.api.getLastItemInfo<string>('DarkSouls II')
      getRemainingSeconds(info)
      console.log('info : ', info)
    }
    getTime()
  }, [intervalHours])

  const showExtraInfo = (): void => {
    setShowExtra(!showExtra)
  }

  return (
    <>
      <SaveForm disableEdit={true} name={name} onClick={showExtraInfo}>
        <TimerForm initialSeconds={timeLeft} onComplete={() => console.log('complete')} />
      </SaveForm>
      {showExtra && <SaveInfoForm savePath={savePath} lastBackup={lastBackup} />}
    </>
  )
}

export default SaveFile
