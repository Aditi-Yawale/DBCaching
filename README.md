# DB Caching Using Firebase Realtime Database

A full-stack project demonstrating **database caching** using **Firebase Realtime Database (RTDB)** to reduce Firestore reads, improve performance, and lower costs.

---

## Features

- Add a new user (ID, Name, Email)  
- Get user by ID  
- Low-latency responses via RTDB caching  

---

## Tech Stack

- **Frontend:** React.js  
- **Backend:** Express.js  
- **Databases:** Firestore (main), RTDB (cache)  

---

## Setup

### Backend

```bash
cd backend
npm install
node server.js
```

### Frontend

```bash
cd frontend
npm install
npm start
```
---

## Reference

Inspired by Google Looker Studio Firebase Cache Documentation
Link - https://developers.google.com/looker-studio/connector/firebase-cache
