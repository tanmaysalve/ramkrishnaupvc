import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipboardList, CircleDot, PhoneCall, MapPinned, RefreshCw, Hammer, CheckCircle2, Clock3, AlertTriangle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useRequests } from '../contexts/RequestContext'
import { StatCard } from '../components/dashboard/StatCard'
import { StatusBadge, PriorityBadge } from '../components/common/StatusBadge'
import { labelize } from '../constants/requestConstants'

export function DashboardPage() {
  const {user}=useAuth(); const {requests,customers,sites}=useRequests(); const navigate=useNavigate()
  const visible=useMemo(()=>user?.role==='ADMIN'?requests:requests.filter(r=>r.createdBy===user?.id||r.assignedTo===user?.id),[requests,user])
  const count=(s:string)=>visible.filter(r=>r.status===s).length
  const cards=user?.role==='ADMIN'
    ? [{l:'Total Requests',s:'',i:ClipboardList,t:'teal'},{l:'New',s:'NEW',i:CircleDot,t:'blue'},{l:'Contacted',s:'CONTACTED',i:PhoneCall,t:'cyan'},{l:'Site Visit',s:'SITE_VISIT',i:MapPinned,t:'purple'},{l:'Follow Up',s:'FOLLOW_UP',i:RefreshCw,t:'amber'},{l:'Quotation Pending',s:'QUOTATION_PENDING',i:Clock3,t:'orange'},{l:'Confirmed',s:'CONFIRMED',i:CheckCircle2,t:'green'},{l:'In Progress',s:'IN_PROGRESS',i:Hammer,t:'indigo'}]
    : [{l:'Total Requests',s:'',i:ClipboardList,t:'teal'},{l:'New',s:'NEW',i:CircleDot,t:'blue'},{l:'Contacted',s:'CONTACTED',i:PhoneCall,t:'cyan'},{l:'Site Visit',s:'SITE_VISIT',i:MapPinned,t:'purple'},{l:'Follow Up',s:'FOLLOW_UP',i:RefreshCw,t:'amber'},{l:'In Progress',s:'IN_PROGRESS',i:Hammer,t:'indigo'},{l:'Completed',s:'COMPLETED',i:CheckCircle2,t:'green'}]
  const recent=[...visible].sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt)).slice(0,7)
  return <div>
    <div className="page-heading"><div><p className="eyebrow">OVERVIEW</p><h1>{user?.role==='ADMIN'?'Operations dashboard':'My sales dashboard'}</h1><p className="muted">Track customer requests, activity and next actions.</p></div><button className="primary-button" onClick={()=>navigate('/requests/new')}>+ New Request</button></div>
    <div className="stats-grid">{cards.map(c=><StatCard key={c.l} label={c.l} value={c.s?count(c.s):visible.length} icon={c.i} tone={c.t} onClick={()=>navigate(c.s?`/requests?status=${c.s}`:'/requests')}/>)}</div>
    <div className="dashboard-grid"><section className="panel"><div className="panel-header"><div><h3>{user?.role==='ADMIN'?'Recent Requests':'My Requests'}</h3><p>Latest request activity</p></div><button className="text-button" onClick={()=>navigate('/requests')}>View all</button></div><div className="table-scroll"><table><thead><tr><th>Request</th><th>Customer</th><th>Status</th><th>Priority</th><th>Updated</th></tr></thead><tbody>{recent.map(r=><tr key={r.id} onClick={()=>navigate(`/requests/${r.id}`)} className="click-row"><td><strong>{r.requestNumber}</strong></td><td>{customers.find(c=>c.id===r.customerId)?.companyName||customers.find(c=>c.id===r.customerId)?.name}</td><td><StatusBadge status={r.status}/></td><td><PriorityBadge priority={r.priority}/></td><td>{new Date(r.updatedAt).toLocaleDateString('en-IN',{day:'2-digit',month:'short'})}</td></tr>)}</tbody></table></div></section>
      {user?.role==='ADMIN'&&<section className="panel side-panel"><div className="panel-header"><div><h3>Requests by Sales User</h3><p>Current workload</p></div></div>{['u2','u3','u4'].map(id=>{const u=localStorage.getItem('rk_users');const users=u?JSON.parse(u):[];const name=users.find((x:any)=>x.id===id)?.displayName;const n=requests.filter(r=>r.assignedTo===id).length;return <div className="workload" key={id}><div className="workload-head"><span>{name}</span><strong>{n}</strong></div><div className="progress"><i style={{width:`${Math.min(100,n*7)}%`}}/></div></div>})}<div className="source-box"><span><AlertTriangle size={17}/> Priority attention</span><strong>{visible.filter(r=>r.priority==='URGENT'||r.priority==='HIGH').length} requests</strong></div></section>}
    </div>
    {user?.role==='ADMIN'&&<section className="panel source-panel"><div className="panel-header"><div><h3>Requests by Source</h3><p>Lead origin across the pipeline</p></div></div><div className="source-grid">{['GOOGLE_ADS','WHATSAPP','WEBSITE','REFERRAL','PHONE','EXISTING_CUSTOMER'].map(s=><div key={s} className="source-item"><span>{labelize(s)}</span><strong>{visible.filter(r=>r.source===s).length}</strong></div>)}</div></section>}
  </div>
}