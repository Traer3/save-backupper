import ButtonForm from './ButtonForm'

interface SaveTextInfoFormProps {
  savePath?: string
  lastBackup?: string
  disableEdit: boolean
}

export default function SaveTextInfoForm({
  savePath,
  lastBackup,
  disableEdit
}: SaveTextInfoFormProps): React.JSX.Element {
  return (
    <>
      <div title={savePath} style={styles.folderPosition}>
        <input disabled={disableEdit} placeholder={savePath} style={styles.textStyle} />
        <ButtonForm size={25} iconName="folder" />
      </div>
      <input
        disabled={disableEdit}
        placeholder={lastBackup}
        style={{ ...styles.textStyle, alignItems: 'center', display: 'flex' }}
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
