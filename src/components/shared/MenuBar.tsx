import { Link, useLocation } from 'react-router-dom'
import ThemeSelector from './ThemeSelector'
import { useThemeStore } from '@/store/themeStore'

const MenuBar = () => {
  const location = useLocation()
  const { specialty } = useThemeStore()

  return (
    <nav className={`bg-primary text-white p-4`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex gap-4">
          <Link to="/" className={location.pathname === '/' ? 'font-bold' : ''}>Home</Link>
          <Link to="/themes" className={location.pathname === '/themes' ? 'font-bold' : ''}>Themes</Link>
        </div>
        <ThemeSelector />
      </div>
    </nav>
  )
}

export default MenuBar
