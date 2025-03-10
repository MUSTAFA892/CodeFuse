
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

    