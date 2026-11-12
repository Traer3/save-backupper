import { useState } from 'react'
import SaveForm from './SaveForm'
import SaveInfoForm from './SaveInfoForm'
import TimerForm from './TimerForm'
import { useMutation, useQuery } from '@tanstack/react-query'
import Loading from './Loading'
import HighlightProblem from './HighlightProblem'
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
  // console.log('lastBackupTime: ', lastBackupTime)
  // console.log('delayStr: ', delayStr)
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
  //const [isBackingUp, setIsBackingUp] = useState(false)
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
      console.log(`Failed to create backup for ${gameName}: `, err)
      setTrigeredError(err.message)
      setBackupComplite(true) //мне не нужен false мне нужно отправлять
      //придумать вывод
    }
  })

  const showExtraInfo = (): void => {
    setShowExtra(!showExtra)
  }
  // console.log(
  //   'gameName: ',
  //   gameName,
  //   'isBackingUp: ',
  //   isBackingUp,
  //   'isLoading:',
  //   isLoading,
  //   'secondsLeft: ',
  //   secondsLeft
  // )
  //if (isError) console.log('Error: ', isError)
  console.log('trigeredError: ', trigeredError)
  if (isError) return <div>Error: {String(error)}</div> //заменить эту хуету

  return (
    <Loading loading={isBackingUp || isLoading}>
      <HighlightProblem
        isProblem={trigeredError.length > 0 || (!isBackingUp && !isLoading && secondsLeft === 0)}
        problem={trigeredError}
      >
        <>
          <SaveForm disableEdit={true} name={gameName} onClick={showExtraInfo}>
            <TimerForm
              //key={gameName}
              backupComplet={backupComplet}
              isBackingUp={isBackingUp}
              initialSeconds={secondsLeft}
              onComplete={createBackup} //createBackup
            />
          </SaveForm>
          {showExtra && <SaveInfoForm savePath={savePath} backupDelay={backupDelay} />}
        </>
      </HighlightProblem>
    </Loading>
  )
}

export default SaveFile
