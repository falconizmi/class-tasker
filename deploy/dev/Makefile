# Makefile - placed in deploy/

# Start just the database in background
up-db:
	docker compose up -d postgres

# Start all services (detached, no logs in terminal)
up-build:
	docker compose up --build -d

# Start all services and show logs live (no -d)
up-build-logs:
	docker compose up --build

# Stop all services (keep data)
down:
	docker compose down

# Stop all and delete volumes (wipe DB)
down-all:
	docker compose down -v

# Show logs for all services (detached mode use-case)
logs:
	docker compose logs -f

# Show running containers
ps:
	docker compose ps

# Create a new migration (use: make revision m="your message")
revision:
	docker compose run --rm migrate alembic revision --autogenerate -m "$(m)"

# Preview Alembic SQL changes (without applying them)
migrate-preview:
	docker compose run --rm migrate alembic upgrade head --sql

# Run Alembic migrations (apply changes)
migrate:
	docker compose run --rm migrate alembic upgrade head

# Remove all stopped containers
clean:
	docker container prune -f
