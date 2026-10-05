import TextButton from './TextButton'

const Settings = (): React.JSX.Element => {
  const deleteAllBackups = (): void => {
    console.log('Deleted')
  }
  const deleteGoogleToken = (): void => {
    console.log('deleteGoogleToken')
  }
  return (
    <div style={styles.mainBody}>
      <TextButton text="delete all current buckups" onClick={deleteAllBackups} />
      <TextButton text="Exit google" onClick={deleteGoogleToken} />
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
