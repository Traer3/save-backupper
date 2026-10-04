import { useState } from 'react'
import SaveForm from './SaveForm'
import SaveInfoForm from './SaveInfoForm'

interface SaveFileProps {
  name?: string
  savePath?: string
  lastBackup?: string
}

const SaveFile = ({ name, savePath, lastBackup }: SaveFileProps): React.JSX.Element => {
  const [showExtra, setShowExtra] = useState(false)
  const showExtraInfo = (): void => {
    setShowExtra(!showExtra)
  }
  return (
    <>
      <SaveForm name={name} onClick={showExtraInfo} />
      {showExtra && <SaveInfoForm savePath={savePath} lastBackup={lastBackup} />}
    </>
  )
}

export default SaveFile
