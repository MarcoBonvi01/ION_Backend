# Portfolio Backend API

This application is a backend service written in **NestJS** that provides access to data stored in the database. It exposes REST API endpoints to query and retrieve information about portfolio companies and worker processes.

---

## API Endpoints

The API is organized into three main categories:

### 1. Work

Allows filtering and retrieving information about all started workers.

**Endpoint:** `GET /work`

**Query Parameters:**

- `sort` (string, optional) - Field to sort by
- `order` (string, optional) - Sort order: `ASC` or `DESC`
- `offset` (number, optional) - Number of records to skip
- `limit` (number, optional) - Maximum number of records to return

---

### 2. Portfolio

Allows filtering and retrieving all companies within the portfolio.

**Endpoint:** `GET /portfolio`

**Query Parameters:**

- `name` (string, optional) - Filter by company name
- `industry` (string, optional) - Filter by industry
- `order_by` (string, optional) - Field to sort by
- `sort_direction` (string, optional) - Sort direction: `ASC` or `DESC`
- `offset` (number, optional) - Number of records to skip
- `limit` (number, optional) - Maximum number of records to return

---

### 3. Company

Allows retrieving information about a specific company by its ID.

**Endpoint:** `GET /company`

**Query Parameters:**

- `id` (string, required) - The unique identifier of the company

---

## Getting Started

### Prerequisites

- Docker and Docker Compose

### Installation & Deployment

The application is fully dockerized. To run it, execute the following commands:

```bash
# Build the Docker images
docker-compose -f docker-compose.yml build

# Start the application in detached mode
docker-compose -f docker-compose.yml up -d --build
```

The API will be available at `http://localhost:<PORT>` (check your `docker-compose.yml` for the configured port).

---

## Environment Variables

Make sure to configure the necessary environment variables in your `.env` file or `docker-compose.yml`:

- `DATABASE_URI` - Database connection string
- `DATABASE_NAME` - Database name
- `DATABASE_USER` - Database user
- `DATABASE_PASSWORD` - Database password

- `URL` - Application url (default: localhost)
- `PORT` - Application port (default: 3003)

- `FRONTEND_URL` - Frontend application url (default: localhost)
- `FRONTEND_PORT` - Frontend application port (default: 3000)

---

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

---

## Continuous Deployment

The application includes a `build.yml` workflow file that enables **automatic deployment to production** on every push to the repository.

### Setup Instructions

To enable automatic deployment, add the following **SSH credentials** as secrets in your repository settings:

- `SSH_HOST` - Server hostname or IP address
- `SSH_USERNAME` - SSH username
- `SSH_KEY` - Private SSH key for authentication
- `SSH_PORT` - SSH port (default: 22)

Once configured, the workflow will automatically build and deploy the application to your production server on every push.
