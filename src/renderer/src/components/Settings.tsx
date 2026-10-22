import TextButton from './TextButton'

interface SettingsProps {
  setAuth: React.Dispatch<React.SetStateAction<boolean>>
  setEnableSettings: React.Dispatch<React.SetStateAction<boolean>>
}

const Settings = ({ setAuth, setEnableSettings }: SettingsProps): React.JSX.Element => {
  const deleteAllBackups = async (): Promise<void> => {
    await window.api.deleteMainFolder()
    console.log('Deleted')
  }
  const logout = async (): Promise<void> => {
    await window.api.logout()
    console.log('TokenDeleted')
    setAuth(false)
    setEnableSettings(false)
  }
  return (
    <div style={styles.mainBody}>
      <TextButton text="delete all current buckups" onClick={deleteAllBackups} />
      <TextButton text="Exit google" onClick={logout} />
    </div>
  )
}

export default Settings

const styles: Record<string, React.CSSProperties> = {
  mainBody: {
    position: 'absolute',
    top: 100,
    height: '30vh',
    right: 10,
    left: 10,
    boxSizing: 'border-box',
    background: '#2e346eea',
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 10
  }
}
