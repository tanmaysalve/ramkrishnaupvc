# Ramkrishna Sales & Request Management

A polished frontend-only React prototype for an internal Sales & Request Management workflow.

## Stack

- React + TypeScript
- Vite
- React Router
- Material UI
- Lucide React
- Browser localStorage

No backend, Firebase, Supabase, external database, API keys, or real authentication are required.

## Run

```bash
npm install
npm run dev
```

## Demo Users

```text
ADMIN
admin / Admin@123

SALES
sales1 / Sales@123
sales2 / Sales@123
sales3 / Sales@123
```

## Included workflow

- Demo login/logout
- Role-based navigation and protected routes
- Admin vs sales-user request visibility
- Seeded customers, sites, requests and timeline activity
- Request search, filters and sorting
- Create customer/site/request
- Request detail and edit
- Status changes with timeline activity
- Admin assignment/reassignment
- Comments
- Browser-side document metadata upload
- Dashboard counts calculated from localStorage
- Responsive desktop/tablet/mobile UI
- Persistent browser data after refresh

## Storage architecture

Current:

```text
React
  ↓
Context / Hooks
  ↓
Service Layer
  ↓
localStorage
```

Future:

```text
React
  ↓
Context / Hooks
  ↓
Service Layer
  ↓
REST API
  ↓
Spring Boot
  ↓
PostgreSQL
```

Business logic is intentionally separated into services so the UI can later be connected to a backend with minimal screen redesign.

## Reset demo data

Open browser DevTools and run:

```js
localStorage.clear()
```

Then refresh the app. Seed data will be initialized again.

## Note on documents

The prototype stores document metadata in localStorage. It does not upload file contents to a server. This is deliberate for a frontend-only demonstration.

## Brand reference

The business/brand reference supplied for this prototype is Ramkrishna uPVC's existing website:

https://ramkrishnaupvc.com/
