import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material'
import { useAuth } from '../contexts/AuthContext'
import { useRequests } from '../contexts/RequestContext'
import { requestService } from '../services/requestService'
import { labelize, priorities } from '../constants/requestConstants'
import { Toast } from '../components/common/Toast'

export function EditRequestPage(){
 const {id}=useParams();const navigate=useNavigate();const {user}=useAuth();const {requests,refresh}=useRequests();const r=requests.find(x=>x.id===id)
 const [description,setDescription]=useState(r?.description||'');const [priority,setPriority]=useState(r?.priority||'MEDIUM');const [date,setDate]=useState(r?.expectedDate||'');const [remarks,setRemarks]=useState(r?.remarks||'');const [toast,setToast]=useState('')
 if(!r||!user)return null
 const save=(e:React.FormEvent)=>{e.preventDefault();requestService.update(r.id,{description,priority:priority as any,expectedDate:date,remarks},user.id,`updated request details: description, priority, expected date or remarks.`);refresh();setToast('Request updated successfully');setTimeout(()=>navigate(`/requests/${r.id}`),600)}
 return <div><div className="page-heading"><div><p className="eyebrow">{r.requestNumber}</p><h1>Edit Request</h1><p className="muted">Update appropriate request details without losing the activity history.</p></div></div><form className="panel edit-form" onSubmit={save}><div className="form-grid"><TextField label="Expected date" type="date" InputLabelProps={{shrink:true}} value={date} onChange={e=>setDate(e.target.value)}/><FormControl size="small"><InputLabel>Priority</InputLabel><Select label="Priority" value={priority} onChange={e=>setPriority(e.target.value)}>{priorities.map(p=><MenuItem key={p} value={p}>{labelize(p)}</MenuItem>)}</Select></FormControl></div><TextField label="Description" multiline minRows={5} fullWidth value={description} onChange={e=>setDescription(e.target.value)}/><TextField label="Remarks" multiline minRows={3} fullWidth value={remarks} onChange={e=>setRemarks(e.target.value)}/><div className="form-actions"><button type="button" className="secondary-button" onClick={()=>navigate(-1)}>Cancel</button><button className="primary-button">Save changes</button></div></form>{toast&&<Toast message={toast} onClose={()=>setToast('')}/>}</div>
}