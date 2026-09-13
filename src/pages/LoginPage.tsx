import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { LockKeyhole, UserRound, ArrowRight, ShieldCheck } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { Alert } from '@mui/material'

export function LoginPage() {
  const { user, login } = useAuth(); const navigate = useNavigate()
  const [username,setUsername]=useState('sales1'); const [password,setPassword]=useState('Sales@123'); const [error,setError]=useState('')
  if(user) return <Navigate to="/dashboard" replace/>
  const submit=(e:React.FormEvent)=>{e.preventDefault();setError('');if(login(username,password))navigate('/dashboard');else setError('Invalid username or password')}
  return <div className="login-page"><div className="login-visual"><div className="login-visual-content"><div className="brand large"><div className="brand-mark">RK</div><div><strong>Ramkrishna</strong><span>uPVC Solutions</span></div></div><div className="visual-copy"><div className="eyebrow">INTERNAL OPERATIONS</div><h1>Sales, requests and follow-ups — <em>all in one place.</em></h1><p>A focused workspace for managing customer enquiries, site projects and sales activity.</p><div className="feature-row"><ShieldCheck size={20}/><span>Demo data persists in your browser</span></div></div></div></div>
    <div className="login-panel"><div className="login-card"><div className="mobile-logo"><div className="brand-mark">RK</div></div><p className="eyebrow">WELCOME BACK</p><h2>Sign in to your workspace</h2><p className="muted">Use one of the demo accounts to explore the prototype.</p><form onSubmit={submit}>{error&&<Alert severity="error" sx={{mb:2}}>{error}</Alert>}<label>Username<div className="input-wrap"><UserRound size={18}/><input value={username} onChange={e=>setUsername(e.target.value)} /></div></label><label>Password<div className="input-wrap"><LockKeyhole size={18}/><input type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div></label><button className="primary-button full">Sign in <ArrowRight size={18}/></button></form><div className="demo-accounts"><strong>Demo accounts</strong><span>admin / Admin@123</span><span>sales1 / Sales@123</span><span>sales2 / Sales@123</span><span>sales3 / Sales@123</span></div></div><div className="login-foot">Frontend-only prototype • local browser storage</div></div>
  </div>
}