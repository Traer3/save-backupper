import { useEffect } from 'react'
import mainIcon from '../../../../resources/mainIcon.png'
import ButtonForm from './ButtonForm'
import ButtonHolder from './ButtonHolder'
import TextButton from './TextButton'

interface AuthorizationFormProps {
  setAuth: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthorizationForm = ({ setAuth }: AuthorizationFormProps): React.JSX.Element => {
  useEffect(() => {
    const init = async (): Promise<void> => {
      const isSuccess = await window.api.checkToken<boolean>()
      setAuth(isSuccess)
    }
    init()
  }, [setAuth])

  const toggleAuth = async (): Promise<void> => {
    const isLoged = await logIn()
    if (isLoged) {
      setAuth(true)
    }
  }

  const logIn = async (): Promise<boolean> => {
    try {
      const isSuccess = await window.api.tryLogin<boolean>()
      return Boolean(isSuccess)
    } catch (err) {
      console.log(`Error in logIn: `, err)
      return false
    }
  }

  return (
    <div style={styles.mainBody}>
      <img src={mainIcon} style={styles.logoStyle} />
      <TextButton text="Save your progress" backgroundColor="#4c7cc0a0" />
      <div style={styles.buttonPosition}>
        <ButtonHolder backgroundColor="#4c7cc0a0">
          <ButtonForm size={50} iconName="google" onClick={toggleAuth} />
          <ButtonForm size={50} iconName="archive" />
        </ButtonHolder>
      </div>
    </div>
  )
}

export default AuthorizationForm

const styles: Record<string, React.CSSProperties> = {
  mainBody: {
    position: 'absolute',
    top: 31,
    height: '35vh',
    right: 10,
    left: 10,
    boxSizing: 'border-box',
    borderStyle: 'solid',
    borderColor: '#97DEBF',
    borderWidth: 1,
    borderRadius: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 10
  },
  logoStyle: {
    height: `clamp(24px, 30vw, 90px)`,
    width: `clamp(24px, 30vw, 90px)`,
    flexShrink: 0,
    objectFit: 'contain'
  },
  buttonPosition: {
    minWidth: 'clamp(300px, 100vw, 10vw)',
    padding: 20
  }
}
