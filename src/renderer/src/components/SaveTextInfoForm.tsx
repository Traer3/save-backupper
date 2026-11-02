import React, { useState } from 'react'
import ButtonForm from './ButtonForm'
import { UserData } from './NewBackup'
import { getFormattedData } from './FormatTime'
import InputForm from './InputForm'

interface SaveTextInfoFormProps {
  savePath?: string
  backupDelay?: string
  disableEdit: boolean
  setUserData?: React.Dispatch<React.SetStateAction<UserData>>
}

export default function SaveTextInfoForm({
  savePath,
  backupDelay,
  disableEdit,
  //setSavePath,
  setUserData
}: SaveTextInfoFormProps): React.JSX.Element {
  const [backupDelayInput, setBackupDelayInput] = useState<string>(backupDelay || '0')

  const handleBackupDelayChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBackupDelayInput(e.target.value)
  }
  const handleBlur = (): void => {
    if (disableEdit || !setUserData) return
    const numericValue = Number(backupDelayInput)
    const validTime = isNaN(numericValue) || numericValue < 300 ? 300 : numericValue
    const stringTime = String(validTime)
    setUserData((prev) => ({
      ...prev,
      backupDelay: stringTime
    }))
  }
  const changePath = (value: string): void => {
    if (disableEdit || !setUserData) return
    // тут еще ебнутее , строка не должны быть пустой и должна быть системной
    setUserData((prev) => ({
      ...prev,
      gamePath: value
    }))
  }

  return (
    <>
      <div title={savePath} style={styles.folderPosition}>
        <InputForm
          disabled={disableEdit}
          placeholder={savePath}
          onChange={(e) => changePath(e.target.value)}
        />
        <ButtonForm size={25} iconName="folder" />
      </div>
      {disableEdit ? (
        <InputForm
          disabled={true}
          title={getFormattedData(backupDelayInput)}
          value={getFormattedData(backupDelayInput)}
          extraStyles={{ alignItems: 'center', flex: 1 }}
        />
      ) : (
        <div style={{ display: 'flex', gap: 2 }}>
          <InputForm
            disabled={disableEdit}
            value={backupDelayInput}
            placeholder={backupDelay}
            extraStyles={{ alignItems: 'center', flex: 2 }}
            onChange={handleBackupDelayChange}
            onBlur={handleBlur}
          />
          <InputForm
            disabled={true}
            title={getFormattedData(backupDelayInput)}
            value={getFormattedData(backupDelayInput)}
            extraStyles={{ alignItems: 'center', flex: 1 }}
          />
        </div>
      )}
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
