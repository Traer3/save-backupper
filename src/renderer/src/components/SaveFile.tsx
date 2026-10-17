import { useState } from 'react'
import SaveForm from './SaveForm'
import SaveInfoForm from './SaveInfoForm'
import TimerForm from './TimerForm'

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
      <SaveForm disableEdit={true} name={name} onClick={showExtraInfo} />
      <TimerForm initialSeconds={199} />
      {showExtra && <SaveInfoForm savePath={savePath} lastBackup={lastBackup} />}
    </>
  )
}

export default SaveFile
