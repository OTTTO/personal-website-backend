# personal-website-backend

Backend for my personal website, this will provide an API for the admin to update the personal website through the admin panel and an API for the frontend to consume this data.

## Getting Started

### Create .env file

```
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB_NAME=pwb
ADMIN_EMAIL=admin@me.com
ADMIN_PASSWORD=password
JWT_SECRET=secret
SALT_ROUNDS=7
```

### Install architecture specific modules

```bash
$ docker compose run web npm install
```

### Running the app locally

```bash
$ docker compose up
```
