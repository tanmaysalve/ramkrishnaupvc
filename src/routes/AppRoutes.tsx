import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { AppLayout } from '../layouts/AppLayout'
import { LoginPage } from '../pages/LoginPage'
import { DashboardPage } from '../pages/DashboardPage'
import { RequestsPage } from '../pages/RequestsPage'
import { CreateRequestPage } from '../pages/CreateRequestPage'
import { RequestDetailPage } from '../pages/RequestDetailPage'
import { EditRequestPage } from '../pages/EditRequestPage'
import { UsersPage } from '../pages/admin/UsersPage'

function Protected({ children }: {children:React.ReactNode}) { const {user}=useAuth(); return user?<>{children}</>:<Navigate to="/login" replace/> }
function Admin({ children }: {children:React.ReactNode}) { const {user}=useAuth(); return user?.role==='ADMIN'?<>{children}</>:<Navigate to="/dashboard" replace/> }
export function AppRoutes(){return <Routes><Route path="/login" element={<LoginPage/>}/><Route element={<Protected><AppLayout/></Protected>}><Route path="/dashboard" element={<DashboardPage/>}/><Route path="/requests" element={<RequestsPage/>}/><Route path="/requests/new" element={<CreateRequestPage/>}/><Route path="/requests/:id" element={<RequestDetailPage/>}/><Route path="/requests/:id/edit" element={<EditRequestPage/>}/><Route path="/admin/dashboard" element={<Admin><DashboardPage/></Admin>}/><Route path="/admin/users" element={<Admin><UsersPage/></Admin>}/></Route><Route path="*" element={<Navigate to="/dashboard" replace/>}/></Routes>}