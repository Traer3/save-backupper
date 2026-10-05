import ButtonForm from './ButtonForm'
import ButtonHolder from './ButtonHolder'
import SaveTextInfoForm from './SaveTextInfoForm'

type SaveInfoFormProps = {
  savePath?: string
  lastBackup?: string // потом ебануть timestamp
}

const SaveInfoForm = ({ savePath, lastBackup }: SaveInfoFormProps): React.JSX.Element => {
  return (
    <div style={styles.mainBody}>
      <SaveTextInfoForm disableEdit={true} savePath={savePath} lastBackup={lastBackup} />
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
    backgroundColor: '#2e346ebc',
    borderStyle: 'solid',
    borderColor: '#4C7DC0',
    borderWidth: 0,
    borderRadius: 1,
    //height: '20%',
    width: '100%',
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    gap: 5
  }
}
