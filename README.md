# Node API Demo

## Prerequisites
Before running the application, ensure you have the following installed on your system:

MongoDB: Download and install MongoDB
[Download MongoDB Community Edition](https://www.mongodb.com/try/download/community)
Follow the instructions for your operating system to install and configure MongoDB.
Ensure MongoDB is running on localhost:27017 (or the configured host/port in your project).

Docker: Download and install Docker
[Download MongoDB Community Edition](https://www.docker.com/products/docker-desktop/))

- Follow the instructions to install Docker on your system.

---

## Setup Instructions

### Step 1: Fork the Repository
Fork this repository to your own GitHub account and clone it to your local machine:

### Step 2: Start the Application with Docker Compose
Use Docker Compose to build and run the application:
```bash
docker compose up --build
```

### Step 3: Verify the Application
Once the containers are running, you can access the application at:
http://localhost:3000

Troubleshooting
Ensure MongoDB is running and accessible.
If docker compose up fails, check for errors in the terminal and resolve any missing dependencies.
Check the logs with docker compose logs for detailed error messages.
