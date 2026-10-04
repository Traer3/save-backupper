import ButtonForm from './ButtonForm'

interface SaveFormProps {
  name?: string
  iconName?: string
  children?: React.ReactNode
  onClick?: () => void
}
const SaveForm = ({ name, iconName, children, onClick }: SaveFormProps): React.JSX.Element => {
  return (
    <li
      title={name}
      style={{
        backgroundColor: '#2E346E',
        borderStyle: 'solid',
        borderColor: '#4C7DC0',
        borderWidth: 0,
        borderRadius: 1,
        height: '10%',
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        gap: 5
      }}
    >
      <div
        style={{
          height: '100%',
          width: '20%'
        }}
      >
        <ButtonForm size={'100%'} iconName={iconName} onClick={onClick} />
      </div>
      <text
        style={{
          padding: 5,
          border: '1px solid red',
          width: '100%',
          height: '100%',
          textAlign: 'start',
          fontSize: 25,
          fontWeight: 600,
          color: '#EBF8E7',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          userSelect: 'text'
        }}
      >
        {name}
      </text>
      {children}
    </li>
  )
}

export default SaveForm
