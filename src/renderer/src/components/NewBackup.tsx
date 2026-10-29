import { useRef, useState } from 'react'
import ButtonForm from './ButtonForm'
import SaveForm from './SaveForm'
import SaveTextInfoForm from './SaveTextInfoForm'
import ButtonHolder from './ButtonHolder'
import Loading from './Loading'
import SelectTime from './SelectTime'

export interface UserData {
  gameName: string
  gamePath: string
  backupDelay: string
}

const NewBackup = (): React.JSX.Element => {
  const [userData, setUserData] = useState<UserData>({
    gameName: 'DarkSouls II',
    gamePath: 'save path',
    backupDelay: '43200' //0
  })
  const [showIcons, setShowIcons] = useState(false)
  const scrollRef = useRef<HTMLUListElement>(null)
  const [loading, setLoading] = useState(false)
  const iconNames = [
    'settings',
    'addCircle',
    'archive',
    'cancel',
    'close',
    'emptyTrash',
    'fullTrash',
    'google',
    'mainLogo',
    'save',
    'start',
    'terminal',
    'toggleOff',
    'toggleOn',
    'folder',
    'default'
  ]

  const handleWheel = (e: React.WheelEvent<HTMLUListElement>): void => {
    if (scrollRef.current) {
      if (e.deltaY !== 0) {
        scrollRef.current.scrollLeft += e.deltaY
      }
    }
  }

  const onShowIcons = (): void => {
    setShowIcons(!showIcons)
  }

  const onSave = async (): Promise<void | null> => {
    if (!userData.gamePath || userData.gamePath === 'save path') return null
    setLoading(true)
    console.log('save path : ', userData.gamePath)
    //const response = await onTriggerSave(userData.gamePath)
    await writeInfo()
    //console.log('response: ', response)
  }

  // const onTriggerSave = async (savePath: string): Promise<boolean> => {
  //   try {
  //     const response = await window.api.backupUploader<boolean>(savePath, userData.gameName)
  //     setLoading(!response)
  //     return response
  //   } catch (err) {
  //     console.log(`Error in OnTriggerSave:\n${err}`)
  //     return false
  //   }
  // }

  const writeInfo = async (): Promise<void> => {
    if (userData.backupDelay === '0') throw new Error(`Im not that fast`)

    const newFormat = JSON.stringify(userData)
    await window.api.changeUserData(newFormat)
    setLoading(false)
  }

  const onCancel = (): void | null => {
    return console.log('test', userData)
  }

  return (
    <div className="non-draggable" style={styles.mainBody}>
      <Loading loading={loading}>
        <SaveForm
          disableEdit={false}
          name={userData.gameName}
          newBackground="#4C7DC0"
          onClick={onShowIcons}
          setUserData={setUserData}
        />
        <div style={styles.formHolder}>
          <SaveTextInfoForm
            disableEdit={false}
            savePath={userData.gamePath}
            lastBackup={userData.backupDelay}
            setUserData={setUserData}
          />
          <SelectTime backupDelay={userData.backupDelay} setUserData={setUserData} />
        </div>
        {showIcons && (
          <ul
            ref={scrollRef}
            onWheel={handleWheel}
            className="non-draggable"
            style={styles.listBody}
          >
            {iconNames.map((iconName) => (
              <li key={iconName} style={{ flexShrink: 0 }}>
                <ButtonForm size={50} iconName={iconName} />{' '}
                {/*добавишь функцию , если чел нажал на кнопку то получил имя желанной иконки  */}
              </li>
            ))}
          </ul>
        )}
        <div style={styles.buttonsAlign}>
          <ButtonHolder>
            <ButtonForm size={50} iconName="save" onClick={onSave} />
            <ButtonForm size={50} iconName="cancel" onClick={onCancel} />
          </ButtonHolder>
        </div>
      </Loading>
    </div>
  )
}

export default NewBackup

const styles: Record<string, React.CSSProperties> = {
  mainBody: {
    //display:'flex',
    borderStyle: 'solid',
    borderColor: '#4C7DC0',
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: '#4C7DC0'
    //padding: 0,
  },
  formHolder: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    padding: 5
  },
  listBody: {
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'auto',
    overflowY: 'hidden',
    padding: 5,
    //width: '100%',
    gap: 5,
    listStyle: 'none',
    boxSizing: 'border-box',
    borderStyle: 'solid',
    borderColor: '#97DEBF',
    borderWidth: 1,
    borderRadius: 3,
    margin: 5
  },
  buttonsAlign: {
    paddingLeft: 20,
    paddingRight: 20
  }
}
