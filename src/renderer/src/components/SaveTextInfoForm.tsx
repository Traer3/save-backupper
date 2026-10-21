import ButtonForm from './ButtonForm'
import { UserData } from './NewBackup'

interface SaveTextInfoFormProps {
  savePath?: string
  lastBackup?: string
  disableEdit: boolean
  setUserData?: React.Dispatch<React.SetStateAction<UserData>>
}

export default function SaveTextInfoForm({
  savePath,
  lastBackup,
  disableEdit,
  //setSavePath,
  setUserData
}: SaveTextInfoFormProps): React.JSX.Element {
  const changePath = (value: string): void => {
    if (disableEdit || !setUserData) return
    // тут еще ебнутее , строка не должны быть пустой и должна быть системной
    setUserData((prev) => ({
      ...prev,
      gamePath: value
    }))
  }

  const changeDelay = (value: string): void => {
    if (disableEdit || !setUserData) return
    //конечный value должен быть в секундах
    setUserData((prev) => ({
      ...prev,
      backupDelay: value
    }))
  }
  return (
    <>
      <div title={savePath} style={styles.folderPosition}>
        <input
          disabled={disableEdit}
          //value={savePath}
          placeholder={savePath}
          style={styles.textStyle}
          onChange={(e) => changePath(e.target.value)}
        />
        <ButtonForm size={25} iconName="folder" />
      </div>
      <input
        disabled={disableEdit}
        placeholder={lastBackup}
        style={{ ...styles.textStyle, alignItems: 'center', display: 'flex' }}
        onChange={(e) => changeDelay(e.target.value)}
      />
    </>
  )
}

const styles: Record<string, React.CSSProperties> = {
  folderPosition: {
    width: '100%',
    display: 'flex',
    gap: 5
  },
  textStyle: {
    padding: 5,
    borderStyle: 'solid',
    borderColor: '#97DEBF', //4C7DC0
    borderWidth: 1,
    borderRadius: 2,
    width: '100%',
    textAlign: 'start',
    fontSize: 12,
    fontWeight: 600,
    color: '#EBF8E7',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    userSelect: 'text',
    backgroundColor: 'transparent'
  }
}
