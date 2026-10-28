import { useState } from 'react'
import ButtonForm from './ButtonForm'
import ButtonHolder from './ButtonHolder'
import NewBackup, { UserData } from './NewBackup'
import SaveFile from './SaveFile'
import SaveListForm from './SaveListForm'
import Settings from './Settings'
import { useQuery } from '@tanstack/react-query'
import Loading from './Loading'

interface BackupperMainProps {
  setAuthorized: React.Dispatch<React.SetStateAction<boolean>>
}
const BackupperMain = ({ setAuthorized }: BackupperMainProps): React.JSX.Element => {
  const [newBackup, setNetBackup] = useState(false)
  const [enableSettings, setEnableSettings] = useState(false)

  const { data: userData, isLoading } = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      return await window.api.readUserData<UserData[]>()
    }
  })

  //console.log('userData:', userData)

  const onNewBackup = (): void => {
    setNetBackup(!newBackup)
  }

  const toggleSettings = (): void => {
    setEnableSettings(!enableSettings)
  }

  const createFolder = async (): Promise<void> => {
    //await window.api.createFolder()
    //await window.api.uploadFile('test.txt')
    //await window.api.deleteMainFolder()
    //await window.api.filesInMainFolder()
    //await window.api.textFile('Test kys now')
    //await window.api.archive('C:\\Users\\traer\\AppData\\Roaming\\DarkSoulsII','C:\\Users\\traer\\AppData\\Roaming\\DarkSoulsII\\DarkSoulsIIBackUp.zip')
    //await window.api.extractArchive('C:\\Users\\traer\\AppData\\Roaming\\DarkSoulsII\\DarkSoulsIIBackUp.zip','C:\\Users\\traer\\Desktop\\test')
  }

  return (
    <Loading loading={isLoading} loadingStyle={true}>
      <div className="non-draggable" style={styles.mainBody}>
        <div>
          <ButtonHolder>
            <ButtonForm size={35} iconName="start" />
            <ButtonForm size={35} iconName="terminal" />
            <ButtonForm size={35} iconName="addCircle" onClick={onNewBackup} />
            <ButtonForm size={35} iconName="archive" onClick={createFolder} />
            <ButtonForm size={35} iconName="settings" onClick={toggleSettings} />
          </ButtonHolder>
        </div>
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
                  lastBackup={obj.backupDelay}
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
