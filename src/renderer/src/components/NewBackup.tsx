import { useRef, useState } from 'react'
import ButtonForm from './ButtonForm'
import SaveForm from './SaveForm'
import SaveTextInfoForm from './SaveTextInfoForm'
import ButtonHolder from './ButtonHolder'

const NewBackup = (): React.JSX.Element => {
  const [showIcons, setShowIcons] = useState(false)
  const [savePath, setSavePath] = useState('save path')
  const scrollRef = useRef<HTMLUListElement>(null)
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

  const onSave = (): void | null => {
    if (!savePath || savePath === 'save path') return null
    window.api.getFolderInfo(savePath)
  }

  return (
    <div className="non-draggable" style={styles.mainBody}>
      <SaveForm
        disableEdit={false}
        name="game name..."
        newBackground="#4C7DC0"
        onClick={onShowIcons}
      />
      <div style={styles.formHolder}>
        <SaveTextInfoForm
          disableEdit={false}
          savePath={savePath}
          lastBackup="backup delay"
          setSavePath={setSavePath}
        />
      </div>
      {showIcons && (
        <ul ref={scrollRef} onWheel={handleWheel} className="non-draggable" style={styles.listBody}>
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
          <ButtonForm size={50} iconName="cancel" />
        </ButtonHolder>
      </div>
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
