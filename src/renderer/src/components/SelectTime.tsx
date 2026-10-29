import ButtonForm from './ButtonForm'
import ButtonHolder from './ButtonHolder'
import { UserData } from './NewBackup'

export interface SelectTimeProps {
  backupDelay: string
  setUserData: React.Dispatch<React.SetStateAction<UserData>>
}

const SelectTime = ({ backupDelay, setUserData }: SelectTimeProps): React.JSX.Element => {
  console.log('backupDelay: ', backupDelay)
  const addTime = (timeInSeconds: number): void => {
    setUserData((prev) => ({
      ...prev,
      backupDelay: String(Number(prev.backupDelay || 0) + timeInSeconds)
    }))
  }
  const reduceTime = (timeInSeconds: number): void => {
    setUserData((prev) => {
      const currentDelay = Number(prev.backupDelay || 0)
      const newBackupTime = Math.max(300, currentDelay - timeInSeconds)
      return {
        ...prev,
        backupDelay: String(newBackupTime)
      }
    })
  }
  return (
    <ButtonHolder>
      <ButtonForm
        size={50}
        iconName={'halfHour'}
        onClick={() => addTime(1800)}
        onRightClick={() => reduceTime(1800)}
      />
      <ButtonForm
        size={50}
        iconName={'oneHour'}
        onClick={() => addTime(3600)}
        onRightClick={() => reduceTime(3600)}
      />
      <ButtonForm
        size={50}
        iconName={'twelveHours'}
        onClick={() => addTime(43200)}
        onRightClick={() => reduceTime(43200)}
      />
      <ButtonForm
        size={50}
        iconName={'thirtyDays'}
        onClick={() => addTime(2592000)}
        onRightClick={() => reduceTime(2592000)}
      />
    </ButtonHolder>
  )
}

export default SelectTime
