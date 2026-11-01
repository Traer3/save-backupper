import { useState } from 'react'
import SaveForm from './SaveForm'
import SaveInfoForm from './SaveInfoForm'
import TimerForm from './TimerForm'
import { useMutation, useQuery } from '@tanstack/react-query'
import Loading from './Loading'

interface SaveFileProps {
  gameName: string
  savePath: string
  backupDelay?: string
}

const SaveFile = ({ gameName, savePath, backupDelay }: SaveFileProps): React.JSX.Element => {
  const [showExtra, setShowExtra] = useState(false)

  const getRemainingSeconds = (lastBackupTime: string): number => {
    const lastBackupMs = new Date(lastBackupTime).getTime()
    const intervalMs = Number(backupDelay)
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
    queryKey: ['lastBackupInfo', gameName, backupDelay],
    queryFn: async () => {
      const createdTimeIso = await window.api
        .getLastItemInfo<string>(gameName)
        .catch((err) => console.log(err))
      if (!createdTimeIso) return getRemainingSeconds('0')
      return getRemainingSeconds(createdTimeIso)
    }
  })

  const { mutate: createBackup, isPending: isBackingUp } = useMutation({
    mutationFn: async () => {
      return //await window.api.backupUploader(gameName, savePath)
    },
    onSuccess: () => {
      //console.log(`Backup created successfuly for ${gameName}`)
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
          <TimerForm
            key={secondsLeft}
            initialSeconds={secondsLeft}
            onComplete={() => console.log('Complete )')} //createBackup
          />
        </SaveForm>
        {showExtra && <SaveInfoForm savePath={savePath} backupDelay={backupDelay} />}
      </>
    </Loading>
  )
}

export default SaveFile
