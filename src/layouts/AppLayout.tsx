import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, ClipboardList, PlusCircle, Users, Menu, LogOut, Bell, ChevronRight } from 'lucide-react'
import { Drawer, IconButton } from '@mui/material'
import { useAuth } from '../contexts/AuthContext'

export function AppLayout() {
  const { user, logout } = useAuth(); const [drawer, setDrawer] = useState(false); const navigate = useNavigate(); const location = useLocation()
  if (!user) return null
  const links = user.role === 'ADMIN'
    ? [{ to:'/dashboard', label:'Dashboard', icon:LayoutDashboard }, { to:'/requests', label:'All Requests', icon:ClipboardList }, { to:'/requests/new', label:'New Request', icon:PlusCircle }, { to:'/admin/users', label:'Users', icon:Users }]
    : [{ to:'/dashboard', label:'Dashboard', icon:LayoutDashboard }, { to:'/requests', label:'My Requests', icon:ClipboardList }, { to:'/requests/new', label:'New Request', icon:PlusCircle }]
  const nav = <div className="sidebar-inner">
    <div className="brand"><div className="brand-mark">RK</div><div><strong>Ramkrishna</strong><span>uPVC Solutions</span></div></div>
    <div className="nav-label">WORKSPACE</div>
    <nav>{links.map(l => { const I=l.icon; return <NavLink key={l.to} to={l.to} onClick={()=>setDrawer(false)} className={({isActive})=>isActive?'active':''}><I size={18}/><span>{l.label}</span></NavLink> })}</nav>
    <div className="sidebar-footer"><div className="mini-user"><div className="avatar">{user.displayName.slice(0,1)}</div><div><strong>{user.displayName}</strong><span>{user.role === 'ADMIN' ? 'Administrator' : 'Sales User'}</span></div></div><button className="logout-btn" onClick={()=>{logout(); navigate('/login')}}><LogOut size={17}/> Sign out</button></div>
  </div>
  return <div className="app-shell">
    <aside className="desktop-sidebar">{nav}</aside>
    <Drawer open={drawer} onClose={()=>setDrawer(false)} PaperProps={{className:'mobile-drawer'}}>{nav}</Drawer>
    <div className="app-main">
      <header className="topbar"><div className="top-left"><IconButton className="mobile-menu" onClick={()=>setDrawer(true)}><Menu size={21}/></IconButton><div className="breadcrumbs"><span>Ramkrishna</span><ChevronRight size={14}/><strong>{location.pathname.includes('requests/new')?'New Request':location.pathname.includes('/requests/')?'Request Details':location.pathname.includes('users')?'Users':location.pathname.includes('requests')?'Requests':'Dashboard'}</strong></div></div><div className="top-actions"><button className="icon-button"><Bell size={18}/><i/></button><div className="top-user"><div className="avatar small">{user.displayName.slice(0,1)}</div><span>{user.displayName}</span></div></div></header>
      <main className="page-container"><Outlet/></main>
    </div>
  </div>
}