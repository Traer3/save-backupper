import React, { useState } from 'react'
import ButtonForm from './ButtonForm'
import { UserData } from './NewBackup'

interface SaveTextInfoFormProps {
  savePath?: string
  lastBackup: string
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
  const [backupDelayInput, setBackupDelayInput] = useState<string>(lastBackup)

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

  const dateFormatter = new Intl.DateTimeFormat('ru-Ru',{
    second:'2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit'
  })

  const getFormattedDate = (time: string): string => {
    const numericValue = Number(time)
    const date = new Date(numericValue * 1000)
    return dateFormatter.format(date)
  }
  // const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  //       day: '2-digit',
  //       month: '2-digit',
  //       year: '2-digit'
  //   })
  //   function getFormattedDate(ts) {
  //       const date = (ts !== undefined && ts !== null)
  //           ? new Date(ts * 1000)
  //           : new Date();
  //       return dateFormatter.format(date)
  //   }

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
        value={getFormattedDate(backupDelayInput)}
        placeholder={lastBackup}
        style={{ ...styles.textStyle, alignItems: 'center', display: 'flex' }}
        onChange={handleBackupDelayChange}
        onBlur={handleBlur}
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
