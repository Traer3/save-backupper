// import { useQueryClient, useQuery } from '@tanstack/react-query'
import TextButton from '../ui/TextButton'

interface TerminalProps {
  lastZip?: string | null
}

const Terminal = ({ lastZip }: TerminalProps): React.JSX.Element => {
  //    const queryClient = useQueryClient()
  //     const lastZip = queryClient.getQueryData<string | null>(['zipEraser'])
  const tempZipState = lastZip ? lastZip : '...'
  return (
    <div style={styles.mainBody}>
      <TextButton text={tempZipState} />
    </div>
  )
}

export default Terminal

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
