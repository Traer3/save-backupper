interface TextButtonProps {
  text?: string
  onClick?: () => void
  backgroundColor?: string
}

const TextButton = ({ text, onClick, backgroundColor }: TextButtonProps): React.JSX.Element => {
  return (
    <button
      style={{
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: '#97DEBF',
        borderWidth: 1,
        borderRadius: 3,
        fontWeight: 600,
        color: '#EBF8E7',
        backgroundColor: backgroundColor ? backgroundColor : '#4C7DC0',
        padding: 5,
        cursor: onClick ? 'pointer' : ''
      }}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default TextButton
