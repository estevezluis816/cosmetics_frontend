import React from 'react'
import './Footer.css'


const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Cosmética Natural · Todos los derechos reservados</p>
      <p>
        <a href="#privacidad">Política de Privacidad</a> · <a href="#terminos">Términos de uso</a>
      </p>
    </footer>
  )
}

export default Footer
