import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LogIn, LogOut, Sparkle, User } from 'lucide-react'
import { Button } from './ui/button'
import { AvatarFallback, AvatarImage, AvatarRoot } from './ui/avatar'
import { SearchBar } from './ui/SearchBar'
import { cn } from '../lib/utils'

const navLinks = [
  { to: '/', label: 'Feed' },
  { to: '/saved', label: 'Library' },
  { to: '/profile', label: 'Profile' },
]

export const AppHeader = ({ user, onSignIn, onSignOut, onSearch }) => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <header className="bf-header">
      <div className="bf-header__inner">
        <Link to="/" className="bf-header__logo">
          <span className="bf-header__logo-badge">
            <Sparkle className="bf-icon-sm" />
          </span>
          <div className="bf-header__logo-text">
            <span className="bf-header__logo-title">BetterFeed</span>
            <span className="bf-header__logo-sub">Sage companion</span>
          </div>
        </Link>

        {/* Add Search Bar */}
        {onSearch && (
          <div className="bf-header__search">
            <SearchBar onSearch={onSearch} />
          </div>
        )}

        <nav className="bf-header__nav">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'bf-header__nav-link',
                  isActive && 'is-active'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="bf-header__actions">
          {user ? (
            <>
              <Link to="/profile" className="bf-header__profile-link">
                <AvatarRoot className="bf-avatar-md">
                  <AvatarImage src={user.avatar_url} alt={user.username} />
                  <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </AvatarRoot>
              </Link>
              <Button variant="ghost" size="sm" onClick={onSignOut}>
                <LogOut className="bf-icon-sm" />
                <span className="bf-show-desktop">Sign out</span>
              </Button>
            </>
          ) : (
            <Button variant="default" size="sm" onClick={onSignIn}>
              <LogIn className="bf-icon-sm" />
              Sign in
            </Button>
          )}
          <button
            type="button"
            className={cn(
              'bf-header__profile-toggle',
              location.pathname === '/profile' && 'is-active'
            )}
            onClick={() => {
              if (location.pathname === '/profile') return
              navigate('/profile')
            }}
          >
            <User className="bf-icon-sm" />
          </button>
        </div>
      </div>
    </header>
  )
}