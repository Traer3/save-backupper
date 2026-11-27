import { useState } from 'react'
import SaveForm from './SaveForm'
import SaveInfoForm from './SaveInfoForm'
import TimerForm from '../TimeComponents/TimerForm'
import { useMutation, useQuery } from '@tanstack/react-query'
import Loading from '../../ui/Loading'
import HighlightProblem from '../../ui/HighlightProblem'
import { useQueryClient } from '@tanstack/react-query'

interface SaveFileProps {
  gameName: string
  savePath: string
  backupDelay?: string
}

const calculateRemainingSeconds = (
  lastBackupTime: string | null | undefined,
  delayStr?: string
): number => {
  const delayInSeconds = Number(delayStr) || 0
  if (!lastBackupTime || lastBackupTime === '0') {
    return delayInSeconds
  }
  const lastBackupMs = new Date(lastBackupTime).getTime()
  if (isNaN(lastBackupMs)) {
    return delayInSeconds
  }

  const nextBackupMs = lastBackupMs + delayInSeconds * 1000
  const diffInSeconds = Math.floor((nextBackupMs - Date.now()) / 1000)
  return diffInSeconds > 0 ? diffInSeconds : 0
}

const SaveFile = ({ gameName, savePath, backupDelay }: SaveFileProps): React.JSX.Element => {
  const queryClient = useQueryClient()
  const [showExtra, setShowExtra] = useState(false)
  const [backupComplet, setBackupComplite] = useState<boolean>(false)
  const [trigeredError, setTrigeredError] = useState<string>('')

  const {
    data: createdTimeIso,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['lastBackupInfo', gameName],
    queryFn: async () => {
      const timeIso = await window.api.getLastItemInfo<string>(gameName).catch((err) => {
        console.log(err)
        return null
      })
      return timeIso || '0'
    }
  })

  const secondsLeft = calculateRemainingSeconds(createdTimeIso, backupDelay)

  const { mutate: createBackup, isPending: isBackingUp } = useMutation({
    mutationFn: async () => {
      return await window.api.backupUploader(savePath, gameName)
    },
    onSuccess: async () => {
      console.log(`Backup created successfuly for ${gameName}`)
      setBackupComplite(true)
      await queryClient.invalidateQueries({
        queryKey: ['userData']
      })
      refetch()
    },
    onError: (err) => {
      setTrigeredError(err.message)
      setBackupComplite(true)
    }
  })

  const showExtraInfo = (): void => {
    setShowExtra(!showExtra)
  }

  const { mutate: deleteBackup, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      return await window.api.deleteUserDataItem(gameName)
    },
    onSuccess: async () => {
      console.log(`Backup created successfuly for ${gameName}`)
      await queryClient.invalidateQueries({
        queryKey: ['userData']
      })
    },
    onError: (err) => {
      console.log('Err: ', err.message)
    }
  })

  if (isError) return <div>Error: {String(error)}</div> //заменить эту хуету
  const hasError = trigeredError.length > 0 || (!isBackingUp && !isLoading && secondsLeft === 0)

  return (
    <Loading loading={isBackingUp || isLoading || isDeleting}>
      <HighlightProblem isProblem={hasError} problem={trigeredError}>
        <>
          <SaveForm disableEdit={true} name={gameName} onClick={showExtraInfo} isProblem={hasError}>
            <TimerForm
              backupComplet={backupComplet}
              isBackingUp={isBackingUp}
              initialSeconds={secondsLeft}
              onComplete={createBackup}
            />
          </SaveForm>
          {showExtra && (
            <SaveInfoForm savePath={savePath} backupDelay={backupDelay} onDelete={deleteBackup} />
          )}
        </>
      </HighlightProblem>
    </Loading>
  )
}

export default SaveFile
