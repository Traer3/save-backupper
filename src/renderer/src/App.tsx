import { useState } from 'react'
import AuthorizationForm from './components/AuthorizationForm'
import BackupperMain from './components/BackupperMain'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App(): React.JSX.Element {
  const [authorized, setAuthorized] = useState(false)
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry: 1
      }
    }
  })

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#2E346E' }}>
      <div className="draggable" style={styles.aplicationName}>
        <span style={{ fontSize: '12px', color: 'red' }}>Zalupa</span>
      </div>
      <QueryClientProvider client={queryClient}>
        {authorized ? (
          <BackupperMain setAuthorized={setAuthorized} />
        ) : (
          <AuthorizationForm setAuth={setAuthorized} />
        )}
      </QueryClientProvider>
    </div>
  )
}

export default App

const styles: Record<string, React.CSSProperties> = {
  aplicationName: {
    width: '100%',
    height: '30px',
    paddingRight: '140px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10px'
  }
}
