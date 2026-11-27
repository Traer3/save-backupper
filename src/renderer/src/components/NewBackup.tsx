import { useRef, useState } from 'react'
import ButtonForm from '../ui/ButtonForm'
import SaveForm from './SaveComponents/SaveForm'
import SaveTextInfoForm from './SaveComponents/SaveTextInfoForm'
import ButtonHolder from '../ui/ButtonHolder'
import Loading from '../ui/Loading'
import SelectTime from '../components/TimeComponents/SelectTime'
import { useQueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import HighlightProblemFrom from '../ui/HighlightProblem'

export interface UserData {
  gameName: string
  gamePath: string
  backupDelay: string
}

const NewBackup = (): React.JSX.Element => {
  const queryClient = useQueryClient()
  const [userData, setUserData] = useState<UserData>({
    gameName: 'DarkSouls II',
    gamePath: 'C:\\Users\\traer\\AppData\\Roaming\\DarkSoulsII',
    backupDelay: '43200'
  })
  const [showIcons, setShowIcons] = useState(false)
  const scrollRef = useRef<HTMLUListElement>(null)
  const [trigeredError, setTrigeredError] = useState<string>('')
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

  const onTriggerSave = async (savePath: string): Promise<boolean> => {
    try {
      return await window.api.backupUploader<boolean>(savePath, userData.gameName)
    } catch (err) {
      console.log(`Error in OnTriggerSave:\n${err}`)
      return false
    }
  }

  const writeInfo = async (): Promise<void> => {
    if (userData.backupDelay === '0') throw new Error(`Im not that fast`)
    const newFormat = JSON.stringify(userData)
    await window.api.changeUserData(newFormat)
  }

  const { mutate: onSave, isPending: isLoading } = useMutation({
    mutationFn: async () => {
      if (!userData.gamePath || userData.gamePath === 'save path') return null
      console.log('save path : ', userData.gamePath)
      await writeInfo()
      return await onTriggerSave(userData.gamePath)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['userData']
      })
    },
    onError: (err) => {
      setTrigeredError(err.message)
    }
  })

  const onCancel = (): void | null => {
    return console.log('test', userData)
  }

  const hasError = trigeredError.length > 0

  return (
    <div className="non-draggable" style={styles.mainBody}>
      <HighlightProblemFrom isProblem={hasError}>
        <Loading loading={isLoading}>
          <SaveForm
            disableEdit={false}
            name={userData.gameName}
            newBackground="#4C7DC0"
            onClick={onShowIcons}
            setUserData={setUserData}
          />
          <div style={styles.formHolder}>
            <SaveTextInfoForm
              key={userData.backupDelay}
              disableEdit={false}
              savePath={userData.gamePath}
              backupDelay={userData.backupDelay}
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
      </HighlightProblemFrom>
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
