import { useEffect, useState } from 'react'
import ButtonForm from './ButtonForm'
import ButtonHolder from './ButtonHolder'
import NewBackup from './NewBackup'
import SaveFile from './SaveFile'
import SaveListForm from './SaveListForm'
import Settings from './Settings'

interface BackupperMainProps {
  setAuthorized: React.Dispatch<React.SetStateAction<boolean>>
}
const BackupperMain = ({ setAuthorized }: BackupperMainProps): React.JSX.Element => {
  const [newBackup, setNetBackup] = useState(false)
  const [enableSettings, setEnableSettings] = useState(false)

  // useEffect(() => {
  //   const getData = async (): Promise<void> => {
  //     const response = await window.api.readUserData()
  //     console.log('response: ', response)
  //   }
  //   getData()
  // }, [])

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

  const testData = [
    //C:\Users\traer\AppData\Roaming\DarkSoulsII\011000010a3889c9
    {
      id: 1,
      name: 'Dark souls 2',
      savePath: 'DarkSoulsII011000010a3889c9',
      lastBackup: '01.10.2026'
    },
    {
      id: 2,
      name: 'dark',
      savePath: 'asdASDasd',
      lastBackup: '09.11.2026'
    },
    {
      id: 3,
      name: 'souls',
      savePath: '324123423433sdfqwef2g233',
      lastBackup: '12.08.2026'
    }
  ]
  return (
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
      {enableSettings && <Settings setAuth={setAuthorized} setEnableSettings={setEnableSettings} />}
      {newBackup ? (
        <NewBackup />
      ) : (
        <SaveListForm>
          {testData.map((obj) => (
            <div key={obj.id}>
              <SaveFile gameName={obj.name} savePath={obj.savePath} lastBackup={obj.lastBackup} />
            </div>
          ))}
        </SaveListForm>
      )}
    </div>
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
