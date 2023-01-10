import React from 'react'

export interface ButtonProps {
  label: string
}

const Widget = (props: ButtonProps) => {
  return <button>{props.label}</button>
}

export default Widget
