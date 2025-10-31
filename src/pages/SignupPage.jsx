import { Link, useNavigate } from 'react-router-dom'
import { SignupForm } from '../components/auth/SignupForm'
import { useAuthStore } from '../store/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

export const SignupPage = () => {
  const navigate = useNavigate()
  const { signup, loading } = useAuthStore()

  return (
    <div className="bf-auth-shell">
      <Card className="bf-auth-card">
        <CardHeader>
          <CardTitle>Create your feed persona</CardTitle>
          <CardDescription>Choose a display name the AI will reference in chats.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm
            loading={loading}
            onSubmit={async ({ email, username }) => {
              await signup({ email, username })
              navigate('/', { replace: true })
            }}
          />
          <p className="bf-auth-footer">
            Already have an account?{' '}
            <Link to="/login" className="bf-link">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
