import TextButton from './TextButton'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient, useQuery } from '@tanstack/react-query'

interface SettingsProps {
  setAuth: React.Dispatch<React.SetStateAction<boolean>>
  setEnableSettings: React.Dispatch<React.SetStateAction<boolean>>
}

const Settings = ({ setAuth, setEnableSettings }: SettingsProps): React.JSX.Element => {
  const queryClient = useQueryClient()
  const { data: autoStartState = false } = useQuery({
    queryKey: ['autoStartState'],
    queryFn: async () => {
      return await window.api.getAutoLaunch<boolean>()
    }
  })

  const { mutate: deleteAllBackups } = useMutation({
    mutationFn: async () => {
      await window.api.deleteMainFolder()
    },
    onSuccess: async () => {
      console.log('Deleted')
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['userData'] }),
        queryClient.invalidateQueries({ queryKey: ['authToken'] })
      ])
      //нужно добавить онулирование userData
    },
    onError: (err) => {
      console.log(`Error in deleteAllBackups: `, err.message)
      // setTrigeredError(err.message)
    }
  })

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      await window.api.logout()
    },
    onSuccess: async () => {
      console.log('TokenDeleted')
      setAuth(false)
      setEnableSettings(false)
    },
    onError: (err) => {
      console.log(`Error in logout: `, err.message)
      // setTrigeredError(err.message)
    }
  })

  const { mutate: changeAutoStart, isPending: isChangingAutoStart } = useMutation({
    mutationFn: async (nextState: boolean): Promise<boolean> => {
      console.log('nextState: ', nextState)
      await window.api.setAutoLaunch(nextState)
      return nextState
    },
    onSuccess: async (savedState) => {
      queryClient.setQueryData(['autoStartState'], savedState)
      await queryClient.invalidateQueries({ queryKey: ['autoStartState'] })
    },
    onError: (err) => {
      console.log(`Error in changeAutoStart: `, err.message)
      // setTrigeredError(err.message)
    }
  })

  const toggleAutoStart = (): void => {
    if (isChangingAutoStart) return
    changeAutoStart(!autoStartState)
  }

  const color = autoStartState ? 'green' : ''
  return (
    <div style={styles.mainBody}>
      <TextButton text="delete all current buckups" onClick={deleteAllBackups} />
      <TextButton text="Exit google" onClick={logout} />
      <TextButton text="start automatically" onClick={toggleAutoStart} backgroundColor={color} />
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
    gap: 10,
    zIndex: 101
  }
}
