import { useState } from 'react'
import ButtonForm from '../ui/ButtonForm'
import ButtonHolder from '../ui/ButtonHolder'
import NewBackup, { UserData } from './NewBackup'
import SaveFile from './SaveComponents/SaveFile'
import SaveListForm from './SaveComponents/SaveListForm'
import Settings from './Settings'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import Loading from '../ui/Loading'
import WarningWindow from '../ui/WarningWindow'
import Terminal from './Terminal'
import HighlightProblemFrom from '../ui/HighlightProblem'

interface BackupperMainProps {
  setAuthorized: React.Dispatch<React.SetStateAction<boolean>>
}
type ActiveOverlay = 'backupAll' | 'archiveAll' | 'settings' | 'terminal' | null
const BackupperMain = ({ setAuthorized }: BackupperMainProps): React.JSX.Element => {
  const [activeOverlay, setActiveOverlay] = useState<ActiveOverlay>(null)
  const [newBackup, setNetBackup] = useState(false)
  const [problem, setProblem] = useState<boolean>(false)
  const [editedUserData, setEditedUserData] = useState<UserData[] | null>(null)

  const queryClient = useQueryClient()
  const { data: userBackups, isLoading } = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      return await window.api.readUserData<UserData[]>()
    }
  })
  const userData = editedUserData ?? userBackups ?? []

  const { data: lastZip } = useQuery({
    queryKey: ['zipEraser'],
    queryFn: async (): Promise<string | null> => {
      return await window.api.zipEraserService()
    },
    staleTime: 1000 * 60 * 60 * 12,
    refetchInterval: 1000 * 60 * 60 * 12
  })

  //полная хуйня , но работает , потом исправлю
  const archiveAllBackup = async (): Promise<void> => {
    setProblem(true)
    setEditedUserData((prev) => {
      const baseList = prev ?? userBackups ?? []
      return baseList.map((backup) => ({
        ...backup,
        backupDelay: '0'
      }))
    })

    setTimeout(async () => {
      await queryClient.invalidateQueries({
        queryKey: ['userData']
      })
      setProblem(false)
      setEditedUserData(null)
    }, 25000)
  }

  const { mutate: offlineArchiveAllBackup, isPending: isArchiving } = useMutation({
    mutationFn: async () => {
      await window.api.archiveAll()
    },
    onSuccess: async () => {
      setActiveOverlay(null)
    },
    onError: (err) => {
      console.log(`Error in offlineArchiveAllBackup: `, err.message)
    }
  })

  const toggleOverlay = (overlay: Exclude<ActiveOverlay, null>): void => {
    setActiveOverlay((prev) => (prev === overlay ? null : overlay))
  }

  const renderActiveOverlay = (): React.JSX.Element | null => {
    switch (activeOverlay) {
      case 'backupAll':
        return (
          <WarningWindow
            onClick={archiveAllBackup}
            textWarning="Backup all file to Google Drive"
            onClose={() => setActiveOverlay(null)}
          />
        )
      case 'archiveAll':
        return (
          <WarningWindow
            onClick={offlineArchiveAllBackup}
            textWarning="Archive all file offline"
            onClose={() => setActiveOverlay(null)}
            isLoading={isArchiving}
          />
        )
      case 'settings':
        return <Settings setAuth={setAuthorized} toggleOverlay={() => setActiveOverlay(null)} />
      case 'terminal':
        return <Terminal lastZip={lastZip} />
      default:
        return null
    }
  }

  return (
    <Loading loading={isLoading} loadingStyle={true}>
      <div className="non-draggable" style={styles.mainBody}>
        <div>
          <ButtonHolder>
            <ButtonForm
              size={35}
              iconName="start"
              onClick={() => {
                toggleOverlay('backupAll')
              }}
            />
            <ButtonForm size={35} iconName="terminal" onClick={() => toggleOverlay('terminal')} />
            <ButtonForm size={35} iconName="addCircle" onClick={() => setNetBackup(!newBackup)} />
            <ButtonForm
              size={35}
              iconName="archive"
              onClick={() => {
                toggleOverlay('archiveAll')
              }}
            />
            <ButtonForm size={35} iconName="settings" onClick={() => toggleOverlay('settings')} />
          </ButtonHolder>
        </div>

        {renderActiveOverlay()}

        {newBackup ? (
          <NewBackup />
        ) : (
          <HighlightProblemFrom problem="Archiving all backups..." isProblem={problem}>
            <SaveListForm>
              {userData?.map((obj) => (
                <div key={obj.gamePath}>
                  <SaveFile
                    gameName={obj.gameName}
                    savePath={obj.gamePath}
                    backupDelay={obj.backupDelay}
                  />
                </div>
              ))}
            </SaveListForm>
          </HighlightProblemFrom>
        )}
      </div>
    </Loading>
  )
}

export default BackupperMain

const styles: Record<string, React.CSSProperties> = {
  mainBody: {
    height: '100%',
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 10
  }
}
