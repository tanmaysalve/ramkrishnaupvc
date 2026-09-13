import { Alert, Snackbar } from '@mui/material'
export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return <Snackbar open autoHideDuration={2600} onClose={onClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}><Alert onClose={onClose} severity="success" variant="filled">{message}</Alert></Snackbar>
}