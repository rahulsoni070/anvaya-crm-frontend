# Anvaya CRM

A full-stack Customer Relationship Management (CRM) app to manage sales leads, assign sales agents, track lead status through the pipeline, add follow-up comments, and view performance reports.

Built with a **React** frontend, **Express/Node** backend, **MongoDB (Mongoose)** database, and **JWT-based authentication** with role-based (admin/user) access.

![Anvaya CRM Demo](./screenshots/Demo.gif)

---

## Demo Link

[Live Demo](https://anvaya-crm-frontend-bice.vercel.app/) &nbsp;•&nbsp; [Backend API](https://anvaya-crm-backend-mu.vercel.app/)

---

## Login

**Guest**

- Email: `guest@gmail.com`
- Password: `12345678`

---

## Demo Video

Watch a walkthrough (~7 minutes) of all major features: [YouTube Demo](https://youtu.be/qwSpGQZRsnk)

---

## Quick Start

This project has two folders: `frontend` and `backend`. (The frontend and backend are also in separate GitHub repos.)

**Backend**

```bash
git clone https://github.com/rahulsoni070/anvaya-crm-backend.git
cd anvaya-crm-backend
npm install
npm run dev
```

**Frontend**

```bash
git clone https://github.com/rahulsoni070/anvaya-crm-frontend.git
cd anvaya-crm-frontend
npm install
npm run dev
```

### Environment Variables

Create a `.env` file in the **backend** with:

```bash
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
PORT=8000
```

---

## Technologies

- React JS
- React Router
- Vite
- Node.js
- Express
- MongoDB (Mongoose)
- JWT (JSON Web Token)

---

## Features

**Authentication**

- User register and login with JWT
- Role-based access (admin vs. user) with protected routes

**Dashboard**

- Overview of lead statistics and pipeline status
- Quick snapshot of leads across the sales funnel

**Leads**

- Create, view, edit, and delete leads
- Assign leads to sales agents
- Filter by status, priority, sales agent, and tags
- Real-time search and sorting

**Sales Agents**

- Admin can add, update, and remove sales agents
- View leads grouped by a specific agent

**Comments**

- Add comments to a lead for follow-up history

**Reports**

- Visualize closed vs. in-pipeline leads
- Reports by agent and by status

---

## API Reference

> Auth routes are served under `/auth`; all other routes are served under `/api`. All protected routes require an `Authorization: Bearer <token>` header.

### Auth

**`POST /auth/register`** — Register a new user

Sample Response:

```json
{ "userId": "...", "token": "..." }
```

**`POST /auth/login`** — Log in and receive a JWT

Sample Response:

```json
{ "userId": "...", "token": "..." }
```

**`GET /auth/users`** _(admin)_ — List all users

---

### Leads

**`GET /api/leads`** — List all leads (supports filters: status, priority, salesAgent, tags, sort)

Sample Response:

```json
[{ "_id": "...", "name": "...", "status": "...", "salesAgent": "...", "tags": ["..."], "priority": "..." }, ...]
```

**`GET /api/leads/:id`** — Get details for one lead

Sample Response:

```json
{ "_id": "...", "name": "...", "source": "...", "status": "...", "salesAgent": "...", "timeToClose": 20, "tags": ["..."] }
```

**`POST /api/leads`** — Create a new lead

**`PUT /api/leads/:id`** — Update a lead

**`GET /api/leads/tags/all`** — Get all available tags

**`DELETE /api/leads/:id`** _(admin)_ — Delete a lead

---

### Sales Agents

**`GET /api/agents`** — List all sales agents

Sample Response:

```json
[{ "_id": "...", "name": "...", "email": "..." }, ...]
```

**`POST /api/agents`** _(admin)_ — Create a new sales agent

**`PUT /api/agents/:id`** _(admin)_ — Update a sales agent

**`DELETE /api/agents/:id`** _(admin)_ — Delete a sales agent

---

### Comments

**`GET /api/comments`** — List comments for a lead

**`POST /api/comments`** — Add a comment to a lead

**`PUT /api/comments/:id`** — Update a comment

**`DELETE /api/comments/:id`** _(admin)_ — Delete a comment

---

### Dashboard & Reports

**`GET /api/dashboard`** — Get dashboard statistics

**`GET /api/reports`** — Get pipeline and performance reports

---

## Contact

For bugs or feature requests, please reach out to [rahulsoni66676@gmail.com](mailto:rahulsoni66676@gmail.com)
