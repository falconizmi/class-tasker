# 🚀 Project Deployment Guide (limit-watch-time)


## 🛠️ Example Development steps

```bash
make up-db                      # Start only Postgres
make revision m="changes on db" # Generate sql commands of changes
make migrate-preview            # Preview changes
make migrate                    # Apply changes
make up-build-logs                    # Run app with logs (not in background)
make down                       # Stop containers, but keep db
```

---

## 🧠 Tips

* You **should not run ****`migrate`**** automatically** with other services — it's manual on purpose.
* Never mix `Base.metadata.create_all()` with Alembic — use only migrations.
* Use `make up-db` + `make migrate` when resetting or applying schema.
* The `migrate` service is isolated and only runs when invoked manually.

---


## 🧪 How to Run the Project

### ✅ Start all services (detached mode — background)

```bash
make up
```

### ✅ Start all services and see logs live

```bash
make up-logs
```

### ✅ Start only the database

```bash
make up-db
```

### 🚫 Stop all services

```bash
make down
```

### 🔥 Stop everything and delete the database (clean start)

```bash
make down-all
```

---

## 📄 Database Migrations (with Alembic)

### 📥 1. Make sure Postgres is running

```bash
make up-db
```

### ✍️ 2. Edit your models in `backend/app/db/...`

### 🛠 3. Generate a new migration file

```bash
make revision m="add users table"
```

This creates a new file in `backend/alembic/versions/`.

### 👀 Optional: Preview the SQL changes Alembic would apply

```bash
make migrate-preview
```

### ⬆️ 4. Apply the migration

```bash
make migrate
```

> ✅ Only applies changes if needed.

---

## 📡 Logs and Status

### 🔍 See logs from all running services

```bash
make logs
```

### 📋 Check which containers are running

```bash
make ps
```

---

## 🧌 Clean Up

### 🧹 Remove stopped containers (migrate leftovers, test runs, etc.)

```bash
make clean
```

---

