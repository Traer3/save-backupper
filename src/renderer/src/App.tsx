import ButtonForm from './components/ButtonForm'
import ButtonHolder from './components/ButtonHolder'
import SaveListForm from './components/SaveListForm'
import SaveFile from './components/SaveFile'

function App(): React.JSX.Element {
  const buttonClicking = (showTest: string): void => {
    console.log('show: ', showTest)
  }

  const testData = [
    //C:\Users\traer\AppData\Roaming\DarkSoulsII\011000010a3889c9
    {
      id: 1,
      name: 'peak',
      savePath: 'DarkSoulsII011000010a3889c9',
      lastBackup: '01.10.2026'
    },
    {
      id: 2,
      name: 'dark',
      savePath: 'asdASDasd',
      lastBackup: '09.11.2026'
    },
    {
      id: 3,
      name: 'souls',
      savePath: '324123423433sdfqwef2g233',
      lastBackup: '12.08.2026'
    }
  ]
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
          height: '100%',
          padding: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: 10
          //border: '1px solid red'
        }}
      >
        <div>
          <ButtonHolder>
            <ButtonForm size={35} iconName="start" onClick={() => buttonClicking('test')} />
            <ButtonForm size={35} iconName="terminal" onClick={() => buttonClicking('test')} />
            <ButtonForm size={35} iconName="addCircle" onClick={() => buttonClicking('test')} />
            <ButtonForm size={35} iconName="archive" onClick={() => buttonClicking('test')} />
            <ButtonForm size={35} iconName="settings" onClick={() => buttonClicking('test')} />
          </ButtonHolder>
        </div>

        <SaveListForm>
          {testData.map((obj) => (
            <div key={obj.id}>
              <SaveFile name={obj.name} savePath={obj.savePath} lastBackup={obj.lastBackup} />
            </div>
          ))}
        </SaveListForm>
      </div>
    </div>
  )
}

export default App
