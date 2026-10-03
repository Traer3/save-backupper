import ButtonForm from './components/ButtonForm'
import ButtonHolder from './components/ButtonHolder'

function App(): React.JSX.Element {
  console.log('Working')
  const buttonClicking = (showTest: string): void => {
    console.log('show: ', showTest)
  }
  return (
    <>
      <div
        style={{
          backgroundColor: '#2E346E',
          width: '100vw',
          height: '100vh',
          color: '#ffff',
          
        }}
      >
        <h1>Test back</h1>
        <ButtonHolder>
          <ButtonForm size={40} buttonName="Test" onClick={() => buttonClicking('test')} />
          <ButtonForm size={40} buttonName="Test" onClick={() => buttonClicking('test')} />
        </ButtonHolder>

      </div>
    </>
  )
}

export default App
