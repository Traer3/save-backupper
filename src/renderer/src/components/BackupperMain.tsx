import { useState } from 'react'
import ButtonForm from './ButtonForm'
import ButtonHolder from './ButtonHolder'
import NewBackup, { UserData } from './NewBackup'
import SaveFile from './SaveFile'
import SaveListForm from './SaveListForm'
import Settings from './Settings'
import { useQuery } from '@tanstack/react-query'
import Loading from './Loading'
import WarningWindow from './WarningWindow'

interface BackupperMainProps {
  setAuthorized: React.Dispatch<React.SetStateAction<boolean>>
}
const BackupperMain = ({ setAuthorized }: BackupperMainProps): React.JSX.Element => {
  const [newBackup, setNetBackup] = useState(false)
  const [enableSettings, setEnableSettings] = useState(false)
  const [backupAll, setBackupAll] = useState(false)
  const [archiveAll, setArchiveAll] = useState(false)
  // const waringName =  'backup all to drive'

  const { data: userData, isLoading } = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      return await window.api.readUserData<UserData[]>()
    }
  })

  const onNewBackup = (): void => {
    setNetBackup(!newBackup)
  }

  const toggleSettings = (): void => {
    setEnableSettings(!enableSettings)
  }

  const archiveAllBackup = async (): Promise<void> => {
    //await window.api. архивировать все
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
            <ButtonForm size={35} iconName="terminal" />
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
        {newBackup ? (
          <NewBackup />
        ) : (
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
