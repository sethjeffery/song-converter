import { config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

export default function Navbar() {
  return (
    <nav className="border-b-[1px] border-b-[rgba(255,255,255,0.25)] p-4 block">
      <h1 className="text-2xl">
      <FontAwesomeIcon icon={faMusic} className="mr-2" />
        Song Converter
      </h1>
    </nav>
  )
}