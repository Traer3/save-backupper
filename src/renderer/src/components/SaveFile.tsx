import { useState } from 'react'
import SaveForm from './SaveForm'
import SaveInfoForm from './SaveInfoForm'
import TimerForm from './TimerForm'
import { useMutation, useQuery } from '@tanstack/react-query'
import Loading from './Loading'

interface SaveFileProps {
  gameName: string
  savePath: string
  lastBackup?: string
}

const SaveFile = ({ gameName, savePath, lastBackup }: SaveFileProps): React.JSX.Element => {
  const [showExtra, setShowExtra] = useState(false)
  const intervalHours = 228
  const getRemainingSeconds = (lastBackupTime: string): number => {
    const lastBackupMs = new Date(lastBackupTime).getTime()
    const intervalMs = intervalHours * 60 * 60 * 1000
    const nextBackupMs = lastBackupMs + intervalMs

    const diffInSeconds = Math.floor((nextBackupMs - Date.now()) / 1000)
    return diffInSeconds > 0 ? diffInSeconds : 0
  }
  const {
    data: secondsLeft = 0,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['lastBackupInfo', gameName, intervalHours],
    queryFn: async () => {
      const createdTimeIso = await window.api.getLastItemInfo<string>('DarkSouls II') //'DarkSouls II' заменить на gameName
      return getRemainingSeconds(createdTimeIso)
    }
  })

  const { mutate: createBackup, isPending: isBackingUp } = useMutation({
    mutationFn: async () => {
      return //await window.api.backupUploader(gameName, savePath)
    },
    onSuccess: () => {
      console.log(`Backup created successfuly for ${gameName}`)
      refetch()
    },
    onError: (err) => {
      console.log(`Failed to create backup for ${gameName}: `, err)
    }
  })

  const showExtraInfo = (): void => {
    setShowExtra(!showExtra)
  }

  if (isError) return <div>Error: {String(error)}</div> //заменить эту хуету

  return (
    <Loading loading={isBackingUp || isLoading}>
      <>
        <SaveForm disableEdit={true} name={gameName} onClick={showExtraInfo}>
          <TimerForm key={secondsLeft} initialSeconds={secondsLeft} onComplete={createBackup} />
        </SaveForm>
        {showExtra && <SaveInfoForm savePath={savePath} lastBackup={lastBackup} />}
      </>
    </Loading>
  )
}

export default SaveFile
