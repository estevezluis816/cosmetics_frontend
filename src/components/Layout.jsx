import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ padding: '2rem', minHeight: 'calc(100vh - 160px)' }}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
