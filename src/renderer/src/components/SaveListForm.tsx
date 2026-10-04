interface SaveListFormProps {
  children: React.ReactNode
}

const SaveListForm = ({ children }: SaveListFormProps): React.JSX.Element => {
  return (
    <ul
      style={{
        height: '90%',
        width: '100%',
        listStyle: 'none',
        padding: 5,
        margin: 0,
        backgroundColor: '#4C7DC0', //97DEBF
        borderStyle: 'solid',
        borderColor: '#97DEBF', //4C7DC0
        borderWidth: 1,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: 2,
        overflow:'scroll',
       
      }}
    >
      {children}
    </ul>
  )
}

export default SaveListForm
