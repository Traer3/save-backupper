import ButtonForm from './ButtonForm'
import ButtonHolder from './ButtonHolder'

type SaveInfoFormProps = {
  savePath?: string
  lastBackup?: string // потом ебануть timestamp
}

const SaveInfoForm = ({ savePath, lastBackup }: SaveInfoFormProps): React.JSX.Element => {
  return (
    <div style={styles.mainBody}>
      <div
        title={savePath}
        style={{
          width: '100%',
          display: 'flex',
          gap: 5
        }}
      >
        <text style={styles.textStyle}>{savePath}</text>
        <ButtonForm size={25} iconName="folder" />
      </div>
      <text style={{ ...styles.textStyle, alignItems: 'center', display: 'flex' }}>
        {lastBackup}
      </text>
      <div>
        <ButtonHolder>
          <ButtonForm size={30} iconName="start" />
          <ButtonForm size={30} iconName="archive" />
          <ButtonForm size={30} iconName="emptyTrash" />
        </ButtonHolder>
      </div>
    </div>
  )
}

export default SaveInfoForm

const styles: Record<string, React.CSSProperties> = {
  mainBody: {
    backgroundColor: '#2E346E',
    borderStyle: 'solid',
    borderColor: '#4C7DC0',
    borderWidth: 0,
    borderRadius: 1,
    height: '20%',
    width: '100%',
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
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
    userSelect: 'text'
  }
}
