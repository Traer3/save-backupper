import { useState } from 'react'
import ButtonForm from '../ui/ButtonForm'
import ButtonHolder from '../ui/ButtonHolder'
import NewBackup, { UserData } from './NewBackup'
import SaveFile from './SaveComponents/SaveFile'
import SaveListForm from './SaveComponents/SaveListForm'
import Settings from './Settings'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Loading from '../ui/Loading'
import WarningWindow from '../ui/WarningWindow'
import Terminal from './Terminal'
import HighlightProblemFrom from '../ui/HighlightProblem'

interface BackupperMainProps {
  setAuthorized: React.Dispatch<React.SetStateAction<boolean>>
}
const BackupperMain = ({ setAuthorized }: BackupperMainProps): React.JSX.Element => {
  const [newBackup, setNetBackup] = useState(false)
  const [enableSettings, setEnableSettings] = useState(false)
  const [enableTerminal, setEnableTerminal] = useState(false)
  const [backupAll, setBackupAll] = useState(false)
  const [archiveAll, setArchiveAll] = useState(false)
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

  const onNewBackup = (): void => {
    setNetBackup(!newBackup)
  }

  const toggleSettings = (): void => {
    setEnableSettings(!enableSettings)
  }

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

  const offlineArchiveAllBackup = async (): Promise<void> => {
    await window.api.archiveAll()
  }

  return (
    // закидывать сюда два состояния загрузки по активации
    <Loading loading={isLoading} loadingStyle={true}>
      <div className="non-draggable" style={styles.mainBody}>
        <div>
          <ButtonHolder>
            <ButtonForm
              size={35}
              iconName="start"
              onClick={() => {
                setBackupAll(!backupAll)
              }}
            />
            <ButtonForm
              size={35}
              iconName="terminal"
              onClick={() => setEnableTerminal(!enableTerminal)}
            />
            <ButtonForm size={35} iconName="addCircle" onClick={onNewBackup} />
            <ButtonForm
              size={35}
              iconName="archive"
              onClick={() => {
                setArchiveAll(!archiveAll)
              }}
            />
            <ButtonForm size={35} iconName="settings" onClick={toggleSettings} />
          </ButtonHolder>
        </div>

        {backupAll && (
          <WarningWindow
            onClick={archiveAllBackup}
            textWarning="Backup all file to Google Drive"
            setState={setBackupAll}
          />
        )}
        {archiveAll && (
          <WarningWindow
            onClick={offlineArchiveAllBackup}
            textWarning="Archive all file offline"
            setState={setArchiveAll}
          />
        )}

        {enableSettings && (
          <Settings setAuth={setAuthorized} setEnableSettings={setEnableSettings} />
        )}

        {enableTerminal && <Terminal lastZip={lastZip} />}
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
