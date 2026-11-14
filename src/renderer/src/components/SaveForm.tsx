import ButtonForm from './ButtonForm'
import { UserData } from './NewBackup'

interface SaveFormProps {
  name?: string
  iconName?: string
  children?: React.ReactNode
  onClick?: () => void
  newBackground?: string
  disableEdit: boolean
  setUserData?: React.Dispatch<React.SetStateAction<UserData>>
  isProblem?: boolean
}
const SaveForm = ({
  name,
  iconName,
  children,
  onClick,
  newBackground,
  disableEdit,
  setUserData,
  isProblem
}: SaveFormProps): React.JSX.Element => {
  const changeName = (value: string): void => {
    if (disableEdit || !setUserData) return
    setUserData((prev) => ({
      ...prev,
      gameName: value
    }))
  }
  return (
    <li
      title={isProblem ? undefined : name}
      style={{ ...styles.mainBody, backgroundColor: newBackground ? newBackground : '#2e346ebc' }}
    >
      <div style={styles.nameInputPosition}>
        <ButtonForm size={50} iconName={iconName} onClick={onClick} />
      </div>
      <div style={styles.holderDiv}>
        <input
          disabled={disableEdit}
          placeholder={name}
          style={{
            ...styles.inputBody,
            backgroundColor: newBackground ? newBackground : 'transparent'
          }}
          onChange={(e) => changeName(e.target.value)}
        />

        {children}
      </div>
    </li>
  )
}

export default SaveForm

const styles: Record<string, React.CSSProperties> = {
  mainBody: {
    borderStyle: 'solid',
    borderColor: '#4C7DC0',
    borderWidth: 0,
    borderRadius: 1,
    //height: '10%',
    //minHeight: '9vh',
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 5
  },
  nameInputPosition: {
    height: '100%',
    width: '20%',
    display: 'flex',
    alignItems: 'center'
  },
  inputBody: {
    padding: 5,
    // borderStyle: 'solid',
    //borderColor: '#97DEBF', //4C7DC0
    // borderWidth: 1,
    // borderRadius: 2,
    border: 'none',
    width: '100%',
    textAlign: 'start',
    fontSize: 25,
    fontWeight: 600,
    color: '#EBF8E7',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    userSelect: 'text'
  },
  holderDiv: {
    borderColor: '#97DEBF',
    borderWidth: 1,
    borderRadius: 2,
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5
  }
}
