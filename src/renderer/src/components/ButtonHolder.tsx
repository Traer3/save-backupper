/* eslint-disable prettier/prettier */
interface ButtonHolderProps {
  children?: React.ReactNode
  backgroundColor?: string
}

function ButtonHolder({ children, backgroundColor }: ButtonHolderProps): React.JSX.Element {
  return (
    <div
      className="non-draggable"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: '#4C7DC0',
        borderWidth: 1,
        borderRadius: 3,
        width: '100%',
        height: '100%',
        backgroundColor: backgroundColor ? backgroundColor : '#4C7DC0',
        padding: 5
      }}
    >
      {children}
    </div>
  )
}

export default ButtonHolder
