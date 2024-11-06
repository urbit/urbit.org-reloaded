'use client'
import Link from 'next/link'
import classNames from 'classnames'

export const MarkdocLink = ({children, href}) => {

  const isExternal = href.startsWith('http');

  return (
    <Link href={href} target={isExternal ? '_blank' : ''} className={isExternal ? 'external' :''}>
      
      {children}
    </Link>
  )
}

