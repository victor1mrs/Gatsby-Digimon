import React from 'react'
import Navbar from './Navbar'
import '../styles/global.scss'

export interface LayoutProps {
  children: React.ReactNode
}

const Layout = (props: LayoutProps) => {
  return (
    <div className="layout">
      <Navbar />
      <div className='content'>
        {props.children}
      </div>
      <footer>
        <p>Copyright 2023 Digimon Adventure</p>
      </footer>
    </div>
  )
}

export default Layout
