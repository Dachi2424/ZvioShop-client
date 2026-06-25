import { useEffect, useState } from 'react'
import './LanguageLoader.scss'
 
 
export default function LanguageLoader({setLanguageLoader}) {
 
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setClosing(true)
      setTimeout(() => {setLanguageLoader(false)}, 200)
    }, 550)
  }, [])

  return (
    <div className={`language-loader ${closing && "language-loader--closing"}`}>
      <div className='language-loader__loader'></div>
    </div>
  )
}