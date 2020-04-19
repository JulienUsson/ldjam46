import React from 'react'

interface Props {
  name: string
  className?: string
  style?: React.CSSProperties
}

export default function Icon({ name, className, style }: Props) {
  return <span className={`mdi mdi-${name} ${className}`} style={style}></span>
}
