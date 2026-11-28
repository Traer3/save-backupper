import Loading from './Loading'
import TextButton from './TextButton'

interface WarningWindowProps {
  textWarning?: string
  onClick?: () => void
  setState?: React.Dispatch<React.SetStateAction<boolean>>
  onClose?: () => void
  isLoading?: boolean
}

const WarningWindow = ({
  textWarning,
  onClick,
  setState,
  onClose,
  isLoading
}: WarningWindowProps): React.JSX.Element => {
  const onEnable = (): void => {
    onClick?.()
    setState?.(false)
  }

  const onDisable = (): void => {
    setState?.(false)
    onClose?.()
  }

  return (
    <div style={styles.mainBody}>
      <Loading loading={isLoading}>
        <div //хуйня не работает нормально , потом исправлю
          style={{
            //border: '1px solid red',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            height: '100%',
            width: '100%'
          }}
        >
          <TextButton text={textWarning} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 60
            }}
          >
            <TextButton text="yes" onClick={onEnable} backgroundColor="#00ff046b" />
            <TextButton text="no" onClick={onDisable} backgroundColor="#fa0101a9" />
          </div>
        </div>
      </Loading>
    </div>
  )
}

export default WarningWindow

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
    //flexDirection: 'column',
    gap: 10,
    zIndex: 101
  }
}
