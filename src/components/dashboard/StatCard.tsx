import type { LucideIcon } from 'lucide-react'
export function StatCard({ label, value, icon: Icon, tone, onClick }: { label:string; value:number; icon:LucideIcon; tone:string; onClick?:()=>void }) {
  return <button className={`stat-card stat-${tone}`} onClick={onClick}><div className="stat-top"><span>{label}</span><div className="stat-icon"><Icon size={19}/></div></div><strong>{value}</strong><div className="stat-bar"><i/></div></button>
}