import { useState } from 'react'
import './App.css'
import LoginEmail from './components/LoginEmail'
import LoginPassword from './components/LoginPassword'

function App() {
  const [stage, setStage] = useState('email') // 'email' | 'password' | 'success'
  const [email, setEmail] = useState('')

  function handleEmailNext(e) {
    setEmail(e)
    setStage('password')
  }

  function handleBack() {
    setStage('email')
  }

  function handleSuccess() {
    setStage('success')
  }

  return (
    <div>
      {stage === 'email' && <LoginEmail onNext={handleEmailNext} />}
      {stage === 'password' && (
        <LoginPassword email={email} onBack={handleBack} onSuccess={handleSuccess} />
      )}

      {stage === 'success' && (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>✅ Signed in</h2>
          <p>Welcome, <strong>{email}</strong> — you are now signed in.</p>
          <button onClick={() => { setStage('email'); setEmail('') }}>Sign out</button>
        </div>
      )}
    </div>
  )
}

export default App
