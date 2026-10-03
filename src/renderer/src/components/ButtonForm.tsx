/* eslint-disable prettier/prettier */
interface ButtonFormProps {
  size: number
  buttonName: string
  onClick: () => void
}

function ButtonForm({ size, buttonName, onClick }: ButtonFormProps): React.JSX.Element {
  return (
    <button
      style={{
        height: size,
        width: size,
        backgroundColor: '#4C7DC0',
        borderStyle:'solid',
        borderColor:'#97DEBF',
        borderWidth: 1,
        borderRadius: 5,
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      {buttonName}
    </button>
  )
}

export default ButtonForm
