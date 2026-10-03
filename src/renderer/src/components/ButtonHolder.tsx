import React from 'react'
interface ButtonHolderProps {
  children: React.ReactNode
}

function ButtonHolder({ children }: ButtonHolderProps): React.JSX.Element {
  return (
    <div
      style={{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        border: '1px solid blue',
        borderRadius: 5,
        width: '30vw',
        height: '10vh',
        backgroundColor:'red',
        padding:5
      }}
    >
      {children}
    </div>
  )
}

export default ButtonHolder
