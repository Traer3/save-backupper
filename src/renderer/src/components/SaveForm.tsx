import ButtonForm from './ButtonForm'

interface SaveFormProps {
  name?: string
  iconName?: string
  children?: React.ReactNode
}

const SaveForm = ({ name, iconName, children }: SaveFormProps): React.JSX.Element => {
  return (
    <li
      style={{
        backgroundColor: '#2E346E',
        borderStyle: 'solid',
        borderColor: '#4C7DC0',
        borderWidth: 1,
        borderRadius: 3
      }}
    >
      <ButtonForm size={20} />
      <text style={{ margin: 5 }}>{name}</text>
      {iconName}
      {children}
    </li>
  )
}

export default SaveForm
