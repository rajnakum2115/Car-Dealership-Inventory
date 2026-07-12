# Car Dealership Inventory

A simple full-stack car dealership inventory application (backend API + frontend client) for browsing vehicles, placing purchases, and administering inventory and orders.

---

## Features
- Browse vehicles with filters and detailed views
- Authentication: register, login, password reset
- Purchase vehicles (customers only)
- Admin dashboard: manage vehicles and view customer orders
- Order editing and cancellation for customers

---

## Tech Stack
- Backend: Node.js, Express, MongoDB (Mongoose)
- Frontend: React (Vite)
- Auth: JWT stored in `localStorage`
- Testing: Jest (backend)

---

## Prerequisites
- Node.js (16+ recommended)
- npm or yarn
- MongoDB (or use a hosted MongoDB Atlas instance)

---

## Repository Structure (high level)

- `backend/` — Express API, controllers, services, models, tests
- `frontend/` — React app (Vite), pages, components, public assets

---

## Backend — Setup & Run

1. Open a terminal and navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file at `backend/.env` with the following variables (example):

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxxxx.mongodb.net/car_dealership
PORT=8000
JWT_SECRET=your_jwt_secret_here

```

4. Run the development server:

```bash
npm run dev
```

Notes:
- The project uses `npm run dev` (see `backend/package.json`).
- To run backend tests:

```bash
npm test -- --runInBand
```

---

## Frontend — Setup & Run

1. Open another terminal and navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables for development (optional):

Create `frontend/.env` (or set system env) with:

```
VITE_API_URL=http://localhost:8000/api
```

4. Run the frontend dev server (Vite):

```bash
npm run dev
```

5. Open the app in the browser at the address provided by Vite (usually `http://localhost:5173`).

Build & preview:

```bash
npm run build
npm run preview
```

---

## Environment & Common Commands

- Start backend: `cd backend && npm run dev`
- Start frontend: `cd frontend && npm run dev`
- Run backend tests: `cd backend && npm test`

---

## Screenshots

### Primary screenshots

**Home page**

![Home screenshot](frontend/public/images/screenshot-1.png)

**Vehicle details page**

![Details screenshot](frontend/public/images/screenshot-2.png)

**Admin orders page**

![Admin orders screenshot](frontend/public/images/screenshot-3.png)

### Additional screenshots

**Signup page**

![Signup](frontend/public/images/Signup.png)

**Login page**

![Login](frontend/public/images/login.png)

**Admin dashboard**

![Admin dashboard](frontend/public/images/Admin_Dashboard.png)

**Add vehicles page**

![Add vehicles](frontend/public/images/Add_Vehicles.png)

**Vehicle edit page**

![Vehicle edit](frontend/public/images/Vehicles_edit.png)

**Add vehicles page**

![Add vehicles](frontend/public/images/Add_Vehicles.png)

**Restock vehicles page**

![Restock vehicles](frontend/public/images/Restock_Vehicles.png)

**Vehicles section**

![Vehicles section](frontend/public/images/Vehicles_section.png)

**Reset password page**

![Reset password](frontend/public/images/Reset_password.png)

**Profile section**

![Profile section](frontend/public/images/profile_section.png)

**My orders (user)**

![My orders (user)](frontend/public/images/My_order_user.png)

**Contact us page**

![Contact us](frontend/public/images/Contact_us.png)

**About us page**

![About us](frontend/public/images/About_us.png)



---

## My AI Usage

This README and other recent code changes were assisted by an AI coding assistant. The AI helped with the following tasks during development of this repository:

- Fixing a duplicate test-created user and moving tests to an isolated in-memory MongoDB to avoid production DB pollution.
- Implementing and wiring password reset endpoints and frontend UI.
- Auto-login after registration and redirect flow in the frontend.
- Adding a password visibility toggle to login/register forms.
- Preventing admin users from creating purchases (server-side 403 and UI disable).
- Adding endpoints and frontend flows for editing and cancelling customer orders.
- Patching multiple files across backend and frontend for the above features.



---




Thank you!
