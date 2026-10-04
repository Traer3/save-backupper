import ButtonForm from './components/ButtonForm'
import ButtonHolder from './components/ButtonHolder'
import SaveForm from './components/SaveForm'
import SaveListForm from './components/SaveListForm'

function App(): React.JSX.Element {
  const buttonClicking = (showTest: string): void => {
    console.log('show: ', showTest)
  }
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#2E346E' }}>
      <div
        className="draggable"
        style={{
          width: '100%',
          height: '30px',
          paddingRight: '140px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '10px'
        }}
      >
        <span style={{ fontSize: '12px', color: 'red' }}>Zalupa</span>
      </div>
      <div
        className="non-draggable"
        style={{
          height:'100%',
          padding: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: 10,
          //border: '1px solid red'
        }}
      >
        <ButtonHolder>
          <ButtonForm size={40} iconName="start" onClick={() => buttonClicking('test')} />
          <ButtonForm size={40} iconName="terminal" onClick={() => buttonClicking('test')} />
          <ButtonForm size={40} iconName="addCircle" onClick={() => buttonClicking('test')} />
          <ButtonForm size={40} iconName="archive" onClick={() => buttonClicking('test')} />
          <ButtonForm size={40} iconName="settings" onClick={() => buttonClicking('test')} />
        </ButtonHolder>

        <SaveListForm>
          <SaveForm name='test'/>
        </SaveListForm>
      </div>
    </div>
  )
}

export default App

/*
return (
    <>
      <div
        className="draggable"
        style={{
          backgroundColor: '#2E346E',
          width: '100%',
          height: 'calc(100vh - 30px)',
          marginTop: 30,
          color: '#ffff',
          overflow: 'hidden',
          padding: 10,
          alignItems: 'center'
        }}
      >
        <ButtonHolder>
          <ButtonForm size={40} iconName="start" onClick={() => buttonClicking('test')} />
          <ButtonForm size={40} iconName="terminal" onClick={() => buttonClicking('test')} />
          <ButtonForm size={40} iconName="addCircle" onClick={() => buttonClicking('test')} />
          <ButtonForm size={40} iconName="archive" onClick={() => buttonClicking('test')} />
          <ButtonForm size={40} iconName="settings" onClick={() => buttonClicking('test')} />
        </ButtonHolder>
      </div>
    </>
  )
}
*/
