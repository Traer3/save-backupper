import React, { useEffect, useState } from 'react'
import ButtonForm from '../../ui/ButtonForm'
import { UserData } from '../NewBackup'
import { getFormattedData } from '../TimeComponents/FormatTime'
import InputForm from '../../ui/InputForm'
import { useDebounce } from '@renderer/useDebounce'
import { useMutation } from '@tanstack/react-query'

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
  setUserData
}: SaveTextInfoFormProps): React.JSX.Element {
  const [backupDelayInput, setBackupDelayInput] = useState<string>(backupDelay || '0')

  const debouncedBackupDelay = useDebounce<string>(backupDelayInput, 500)

  const timeFormat = (value: string): string => {
    const numericValue = Number(value)
    const validTime = isNaN(numericValue) || numericValue < 300 ? 300 : numericValue
    return String(validTime)
  }

  useEffect(() => {
    if (disableEdit || !setUserData) return
    if (debouncedBackupDelay.trim() === '' || isNaN(Number(debouncedBackupDelay))) return

    const validTime = timeFormat(debouncedBackupDelay)

    const timeoutId = setTimeout(() => {
      //хуйня не стабильная, если задержка ввода совпадет с таймером активации то setUserData запишит старое значение , выкенет из инпута . Это работа на 23 день , запись называется "«задача» Исправить баг с инпутом "
      setUserData((prev) => {
        if (prev.backupDelay === validTime) return prev
        return {
          ...prev,
          backupDelay: validTime
        }
      })
    }, 1000)
    return () => clearTimeout(timeoutId)
  }, [debouncedBackupDelay, disableEdit, setUserData])

  const handleBackupDelayChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBackupDelayInput(e.target.value)
  }

  const handleBlur = (): void => {
    if (disableEdit) return
    const validTime = timeFormat(backupDelayInput)
    setBackupDelayInput(String(validTime))
    if (setUserData) {
      setUserData((prev) => ({
        ...prev,
        backupDelay: String(validTime)
      }))
    }
  }
  const changePath = (value: string): void => {
    if (disableEdit || !setUserData) return
    // тут еще ебнутее , строка не должны быть пустой и должна быть системной
    setUserData((prev) => ({
      ...prev,
      gamePath: value
    }))
  }

  const { mutate: selectBackupPath } = useMutation({
    mutationFn: async () => {
      if (disableEdit && savePath) {
        await window.api.openFolder(savePath)
      } else {
        const result = await window.api.selectBackupFolder<string | null>()
        if (!result || result.length === 0 || !setUserData) return
        setUserData((prev) => ({
          ...prev,
          gamePath: result
        }))
      }
    },
    onError: (err) => {
      console.log(`Error in selectBackupPath: `, err.message)
    }
  })

  return (
    <>
      <div title={savePath} style={styles.folderPosition}>
        <InputForm
          disabled={disableEdit}
          placeholder={savePath}
          onChange={(e) => changePath(e.target.value)}
        />
        <ButtonForm size={25} iconName="folder" onClick={selectBackupPath} />
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
