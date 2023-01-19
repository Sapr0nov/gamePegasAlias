import { useNavigate } from 'react-router-dom'
import { useAuth } from '../services/hooks/useAuth'

let Cooldown: NodeJS.Timeout | undefined

export const authorization = () => {
  clearTimeout(Cooldown)

  const isAuth = useAuth()
  const navigate = useNavigate()

  if (typeof window !== 'undefined') {
    Cooldown = setTimeout(() => {
      const pathname = window.location.pathname
      if (pathname === '/login' || pathname === '/sign-up') {
        if (isAuth) {
          navigate('/')
        }
      } else {
        if (!isAuth) {
          navigate('/login')
        }
      }
    }, 200)
  }
}
