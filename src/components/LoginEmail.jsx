import { useState } from 'react'
import { isValidUser } from '../auth'
import './Login.css'

export default function LoginEmail({ onNext }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  function validateEmailFormat(e) {
    // simple email regex
    return /^\S+@\S+\.\S+$/.test(e)
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    setError('')
    if (!validateEmailFormat(email)) {
      setError('Please enter a valid email address')
      return
    }
    if (!isValidUser(email)) {
      setError('No user found with that email')
      return
    }
    onNext(email)
  }

  return (
    <div className="login-card">
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </label>
        {error && <div className="error">{error}</div>}
        <div className="actions">
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  )
}
