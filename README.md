
# CodeFuse Project - React Native Mobile Development

Welcome to the CodeFuse project! This repository is used for mobile React Native development, inspired by platforms like [bolt.new](https://bolt.new). This README will guide you through the steps to get started, including setting up the environment, building the Docker image, installing dependencies, and running services.

## Table of Contents

1. [Clone the Repository](#clone-the-repository)
2. [Build the Docker Image](#build-the-docker-image)
3. [Install Bun](#install-bun)
4. [Initialize PostgreSQL](#initialize-postgresql)
5. [Initialize .env](#initialize-env)
6. [Running the Application](#running-the-application)

## 1. Clone the Repository

Start by cloning the repository to your local machine. Use the following command to clone the repository from GitHub:

```bash
git clone https://github.com/your-username/codefuse.git
cd codefuse
```

### Folder Structure

Upon cloning the repository, you will see the following folder structure:

```
hkirat/
    hkirat/
    Prod/
    ae8620c/
    .github/
        workflows/
    expo-base-app/
    ext/
    localhost/
    framework-serializer/
    mobile-magic/
    nextjs-base-app/
    ops/
    react-base-app/
    .gitignore
```

## 2. Build the Docker Image

In order to build the Docker image for the project, navigate to the `docker` folder and build the Docker image using the following command:

```bash
docker build -f Dockerfile.code-server -t code-server-update .
```

This will create a Docker image named `code-server-update`.

## 3. Run the Docker Image

Once the Docker image is built, you can run the Docker container with the following command:

```bash
docker run -p 8080:8080 code-server-update
```

This will start the application on port 8080. You can access the application by opening your browser and navigating to `http://localhost:8080`.

## 4. Install Bun

[Bun](https://bun.sh/) is a fast JavaScript runtime, and it's required for this project. 

### For Linux Users (Arch-based)

For Arch-based Linux systems, you can install Bun using `yay`. First, install `yay` if you haven't already:

```bash
sudo pacman -S yay
```

Then, install Bun:

```bash
yay -S bun
```

### For macOS or Windows

For macOS and Windows users, download and install Bun from the official website: [https://bun.sh](https://bun.sh).

Once Bun is installed, proceed to the next step.

## 5. Initialize PostgreSQL

We are using PostgreSQL as the database for the application. To initialize PostgreSQL, use the following Docker command:

```bash
docker run -e POSTGRES_PASSWORD=mypassword -p 5432:5432 postgres
```

This will run PostgreSQL inside a Docker container with the password `mypassword`. 

### Run PostgreSQL in Detached Mode

If you want to run PostgreSQL in the background (detached mode), use the following command:

```bash
docker run -d -e POSTGRES_PASSWORD=mypassword -p 5432:5432 postgres
```

This will run PostgreSQL in the background, and you can interact with it via port 5432.

## 6. Initialize .env

Before starting the application, ensure you have the `.env` file configured correctly. You can use the `.env.example` file as a template for creating your `.env` file. To do this, simply copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Then, open `.env` and adjust any environment variables as needed for your setup.

## 7. Running the Application

Once the environment is set up, and PostgreSQL is running, you can start the application. 

Make sure all the necessary dependencies are installed by running:

```bash
bun install
```

Sure! Here’s the continuation of your `README.md` file, including the new steps you mentioned:


## 8. Migrate Prisma Database

To migrate the Prisma database, navigate to the `packages/db` folder and run the following command:

```bash
cd packages/db
npx prisma migrate dev
```

This will apply the migrations to the PostgreSQL database and sync it with the schema defined in your Prisma setup.

## 9. Start the Frontend

To start the frontend application, go to the `apps/frontend` directory and run the following command to start the development server using Bun:

```bash
cd apps/frontend
bun dev
```

This will start the frontend application and make it available for local development.

## 10. Start the Backend

To start the backend server, navigate to the `apps/primary-backend` directory and run the following command to start the backend:

```bash
cd apps/primary-backend
bun index.ts
```

This will start the backend server, and it should now be running and ready to handle requests.

## 11. Add API Keys to .env

Make sure to configure all necessary API keys in your `.env` file. You can reference the `.env.example` file to see which keys need to be added.

To copy the example `.env` file to your actual `.env` file, use the following command:

```bash
cp .env.example .env
```

Then, open the `.env` file and add all the required API keys and environment-specific variables.

## 12. Start the LLM Backend

Finally, to start the LLM (Large Language Model) backend, go to the `apps/worker` directory and run the following command:

```bash
cd apps/worker
bun index.ts
```

Here is the continuation of the README with the steps to sign in to Clerk, update the JWT key, and set the Clerk-related environment variables (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`) as per the `.env.example` file:

## 13. Sign In to Clerk

Clerk is used for authentication and managing user sessions in the application. To integrate Clerk into your project, you'll need to sign in to Clerk and configure the required keys.

### Sign Up / Sign In to Clerk

1. Go to the [Clerk dashboard](https://clerk.dev) and sign up for an account or log in if you already have one.
2. Once logged in, go to the **API Keys** section in the Clerk dashboard.
3. Obtain the following keys:
    - **Publishable Key** (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`)
    - **Secret Key** (`CLERK_SECRET_KEY`)

### Update `.env` with Clerk Keys

After obtaining the Clerk keys, you'll need to update your `.env` file with the values for `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`.

1. Copy the keys from your Clerk dashboard.
2. Open the `.env` file in the root of your project.
3. Update the environment variables with the following:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
```

Make sure to replace `your-clerk-publishable-key` and `your-clerk-secret-key` with the actual keys from Clerk.

### Update JWT Key

You may also need to update the JWT key in your `.env` file, depending on your Clerk configuration. For example:

```bash
JWT_KEY=your-jwt-secret-key
```

Ensure that all keys are correctly updated and saved.

## 14. Restart the Application

After updating the environment variables, restart all services (frontend, backend, and worker) to apply the changes.

1. Restart the frontend:

    ```bash
    cd apps/frontend
    bun dev
    ```

2. Restart the backend:

    ```bash
    cd apps/primary-backend
    bun index.ts
    ```

3. Restart the LLM worker:

    ```bash
    cd apps/worker
    bun dev
    ```


## 15. Running All Services in the `apps` Folder

To run all the services in the `apps` folder, follow these steps:

1. **Frontend Service**: Go to the `apps/frontend` directory and run the development server using Bun:

    ```bash
    cd apps/frontend
    bun dev
    ```

2. **Backend Service**: Next, navigate to the `apps/primary-backend` directory and start the backend server:

    ```bash
    cd apps/primary-backend
    bun index.ts
    ```

3. **Worker Service**: Lastly, navigate to the `apps/worker` directory and start the worker service:

    ```bash
    cd apps/worker
    bun dev
    ```

### Start All Services Simultaneously

If you'd prefer to run all services in parallel, you can either use a tool like `concurrently` or manually open separate terminal tabs for each service. Here's an example of using `concurrently`:

1. Install `concurrently`:

    ```bash
    bun add concurrently
    ```

2. Create a new script in your `package.json` to run all services:

    ```json
    "scripts": {
      "start:all": "concurrently \"bun dev --cwd apps/frontend\" \"bun index.ts --cwd apps/primary-backend\" \"bun dev --cwd apps/worker\""
    }
    ```

3. Then, run the command:

    ```bash
    bun start:all
    ```

This will run the frontend, backend, and worker services simultaneously in your terminal.

---

## 16. Troubleshooting Errors

Here are some common errors you may encounter and their resolutions:

### Error 1: **404 Not Found in Kubernetes API**

You might encounter the following error when interacting with Kubernetes resources:

```bash
error: HTTP-Code: 404
Message: Unknown API Status Code!
Body: "Not found."
```

This error typically indicates that the Kubernetes resource you're trying to access doesn't exist or the API server is not reachable. Here’s how to resolve it:

- **Verify Kubernetes Cluster Connection**: Ensure your Kubernetes cluster is running and accessible. You can check the connection by running the following command:

    ```bash
    kubectl get pods --all-namespaces
    ```

    If you see an error, check your Kubernetes configuration and ensure it's pointing to the correct cluster.

- **Check Resource Existence**: The resource you're trying to access may not exist, such as a specific namespace or pod. Use the following commands to verify the existence of resources like namespaces:

    ```bash
    kubectl get namespaces
    ```

    If the namespace doesn’t exist, create it:

    ```bash
    kubectl create namespace user-apps
    ```

- **Check the Correct API Endpoint**: Ensure the correct API path is being used in your code. If you're trying to create or list resources in a specific namespace, ensure that the namespace exists and is correctly referenced.

### Error 2: **"current-context must exist" Error**

When running the command to view the Kubernetes configuration, you might see the following error:

```bash
error: current-context must exist in order to minify
```

This indicates that there is no current context set in your Kubernetes configuration, which is necessary to interact with the cluster. To resolve this:

- **Check Kubernetes Configuration**: Ensure your `kubectl` context is properly set. Run:

    ```bash
    kubectl config get-contexts
    ```

    Then, set the correct context:

    ```bash
    kubectl config use-context <your-context-name>
    ```

    Replace `<your-context-name>` with the appropriate context.

- **Verify Context Configuration**: If no contexts are set, you might need to authenticate with your Kubernetes provider (e.g., AWS EKS, GKE, etc.) to set the context correctly.

### Error 3: **Docker-related Issues**

When building and running Docker images, you might encounter errors. Some potential issues include:

- **Docker Not Found**: Ensure Docker is installed on your system. If it isn't, install Docker using the official instructions for your operating system:

    - [Docker Installation Guide](https://docs.docker.com/get-docker/)

- **Permission Denied Errors**: You might encounter permission issues when trying to build or run Docker containers. Make sure you have the necessary permissions or try running the commands with `sudo`:

    ```bash
    sudo docker build -f Dockerfile.code-server -t code-server-update .
    sudo docker run -p 8080:8080 code-server-update
    ```

---

## 17. Additional Configuration and Notes

- **.env Configuration**: Ensure your `.env` file is correctly configured with all required keys and variables for API integrations, database connections, and authentication. Use `.env.example` as a template and replace placeholders with actual values.
  
- **Database Initialization**: If you encounter issues with the database, ensure that PostgreSQL is properly initialized and the environment variables for database connections are correctly set in your `.env` file.

    You can initialize PostgreSQL via Docker with the following command:

    ```bash
    docker run -e POSTGRES_PASSWORD=mypassword -p 5432:5432 postgres
    ```

    Or, for detached mode:

    ```bash
    docker run -d -e POSTGRES_PASSWORD=mypassword -p 5432:5432 postgres
    ```

- **API Keys and External Services**: For any external services like Clerk, ensure that your API keys are correctly configured in the `.env` file. Refer to the Clerk section of the README for specific instructions on setting up Clerk.

