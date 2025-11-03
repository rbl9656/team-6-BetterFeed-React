import { useEffect } from 'react'
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom'
import { AppHeader } from './components/AppHeader'
import { ToastProvider } from './context/toast'
import { useAuthStore } from './store/auth'
import { FeedPage } from './pages/FeedPage'
import { PostPage } from './pages/PostPage'
import { SavedPage } from './pages/SavedPage'
import { ProfilePage } from './pages/ProfilePage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { RouteGuard } from './components/RouteGuard'

const AppShell = () => {
  const navigate = useNavigate()
  const { user, logout, initialized } = useAuthStore()

  return (
    <div className="bf-app-shell">
      <AppHeader
        user={user}
        onSignIn={() => navigate('/login')}
        onSignOut={logout}
        onSearch={location.pathname === '/' ? (term) => {
          // Search will be handled in FeedPage
          window.dispatchEvent(new CustomEvent('feed-search', { detail: term }))
        } : null}
      />
      <main className="bf-main">
        {!initialized ? (
          <div className="bf-loader">Booting BetterFeed…</div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AppShell />}>
        <Route index element={<FeedPage />} />
        <Route path="post/:id" element={<PostPage />} />
        <Route
          path="saved"
          element={
            <RouteGuard>
              <SavedPage />
            </RouteGuard>
          }
        />
        <Route
          path="profile"
          element={
            <RouteGuard>
              <ProfilePage />
            </RouteGuard>
          }
        />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </>
  )
)

const AuthHydrator = ({ children }) => {
  const hydrate = useAuthStore((state) => state.hydrate)
  useEffect(() => {
    hydrate()
  }, [hydrate])
  return <>{children}</>
}

const App = () => (
  <ToastProvider>
    <AuthHydrator>
      <RouterProvider router={router} />
    </AuthHydrator>
  </ToastProvider>
)

export default App
