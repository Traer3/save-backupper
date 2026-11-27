interface InputFormProps {
  disabled: boolean
  title?: string
  value?: string
  placeholder?: string
  extraStyles?: React.CSSProperties
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
}

const InputForm = ({
  disabled,
  title,
  value,
  placeholder,
  extraStyles,
  onChange,
  onBlur
}: InputFormProps): React.JSX.Element => {
  return (
    <input
      disabled={disabled}
      title={title}
      value={value}
      placeholder={placeholder}
      style={{ ...styles.textStyle, ...extraStyles }}
      onChange={onChange}
      onBlur={onBlur}
    />
  )
}

export default InputForm

const styles: Record<string, React.CSSProperties> = {
  folderPosition: {
    width: '100%',
    display: 'flex',
    gap: 5
  },
  textStyle: {
    padding: 5,
    borderStyle: 'solid',
    borderColor: '#97DEBF', //4C7DC0
    borderWidth: 1,
    borderRadius: 2,
    width: '100%',
    textAlign: 'start',
    fontSize: 12,
    fontWeight: 600,
    color: '#EBF8E7',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    userSelect: 'text',
    backgroundColor: 'transparent'
  }
}
