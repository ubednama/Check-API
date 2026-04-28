# API Test Project
This is a simple API test project designed to check if your server is properly set up and running. This project verifies the instance's availability and ensures that it is live.

#### Verify that the API is running properly

## Run

```bash
npm install
npm start
```

The server listens on port `3005` by default. Override with the `PORT` env var:

```bash
PORT=4000 npm start
```

Endpoints (both return `{"message":"OK"}`):

- `GET /`
- `GET /health`

## Deploy with PM2

```bash
npm install -g pm2
pm2 start index.js --name check-api
```

### Acknowledgments
Inspiration for this project was to ensure AWS EC2 instances are properly set up and running.
