<div align="center">

# 📅 BookMe — Booking App (Client)

### React · Redux Toolkit · React Calendar · Google OAuth

A full-stack booking application: pick a date and time, book it, and get a confirmation email with a cancellation link. Bookings are unique per date + time, so double-booking is blocked at the database level.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

</div>

---

## ✨ Features

| Feature | How it works |
| --- | --- |
| 📆 Calendar booking | Pick a date and time with `react-calendar`; available slots come from the server |
| 🔐 Google sign-in | Sign in with Google OAuth, then book from your dashboard |
| 📧 Confirmation emails | Every booking emails a confirmation with a cancellation link |
| 🚫 No double-bookings | The server enforces a unique date + time index in MongoDB |
| 📊 Dashboard | See your bookings and cancel from the dashboard |

## 🧩 How it fits together

```
bookedCRA-client (this repo, React, port 3000)
        │  REST + Google OAuth
        ▼
bookedCRA-server (Express + MongoDB, port 3001)
        │  Mongoose, Passport, Nodemailer
        ▼
MongoDB · Gmail confirmation emails
```

> **Server repo:** [bookedCRA-server](https://github.com/afshinmalek/bookedCRA-server)

## 🚀 Run it locally

```bash
# 1. Server first (see its README for env vars)
cd ../bookedCRA-server && npm install && npm start

# 2. Client
npm install
cp .env.example .env   # then fill in REACT_APP_CLIENT_ID
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## 🔑 Environment variables

See `.env.example`. Never commit a real `.env` file — it is ignored by `.gitignore`.

| Variable | Used for |
| --- | --- |
| `REACT_APP_APP_URL` | Server URL the client talks to |
| `REACT_APP_APP_PORT_NUM` | Server port |
| `REACT_APP_CLIENT_ID` | Google OAuth client ID |

## 🛠️ Tech

React 18 · Redux Toolkit · React Router · React Calendar · Axios · Create React App
