---
sidebar_position: 2
---
import { Button, ThemeProvider, Stack } from "@bubbles-ui/components";
import ReactPlayer from 'react-player'

# Get Started

# **Create a Leemons project**

## **Overview[](https://docs.astronomer.io/astro/create-project#overview)**

To run Airflow pipelines on Astro, you first need to create an Astro project. An Astro project contains the set of files necessary to run Airflow, including dedicated folders for your DAG files, plugins, and dependencies. Once you've tested these files locally, the Astro project structure makes it easy to deploy your pipelines to Astro.

This guide provides instructions for creating a new Astro project, as well as information about the default Astro project structure.

<ThemeProvider>
<Stack direction="column" spacing={4}>
    <ReactPlayer url='https://youtu.be/VuOgdOKOHd8'/>
</Stack>
</ThemeProvider>



## **Prerequisites[](https://docs.astronomer.io/astro/create-project#prerequisites)**

To create an Astro project, you need:

- [The Astro CLI](https://docs.astronomer.io/astro/cli/configure-cli#install-the-cli)
- [Docker](https://www.docker.com/products/docker-desktop)

## **Step 1: Create an Astro project[](https://docs.astronomer.io/astro/create-project#step-1-create-an-astro-project)**

To create a new Astro project:

1. Create a new directory for your Astro project:
    
    ```
    mkdir <your-astro-project-name>
    
    ```
    
2. Open the directory:
    
    ```
    cd <your-astro-project-name>
    
    ```
    
3. Run the following Astro CLI command to initialize an Astro project in the directory:
    
    ```
    astro dev init
    
    ```
    
    This command generates the following files in the directory:
    
    ```
    .
    ├── dags # Where your DAGs go
    │   └── example-dag-basic.py # Example DAG that showcases a simple ETL data pipeline
    |   └── example-dag-advanced.py # Example DAG that showcases more advanced Airflow features, such as the TaskFlow API
    ├── Dockerfile # For the Astro Runtime Docker image, environment variables, and overrides
    ├── include # For any other files you'd like to include
    ├── plugins # For any custom or community Airflow plugins
    |   └── example-plugin.py
    ├── tests # For any DAG unit test files to be run with pytest
    |   └── test_dag_integrity.py # Test that checks for basic errors in your DAGs
    ├── airflow_settings.yaml # For your Airflow Connections, Variables and Pools (local only)
    ├── packages.txt # For OS-level packages
    └── requirements.txt # For Python packages
    
    ```
    
    This set of files will build into a Docker image that you can both run on your local machine and deploy to Astro.
    

### **Astro Runtime[](https://docs.astronomer.io/astro/create-project#astro-runtime)**

Your `Dockerfile` includes a reference to Astro Runtime. Packaged into a Debian-based Docker image, Astro Runtime extends the Apache Airflow open source project to provide you with differentiated functionality that centers around reliability, efficiency, and performance. For more information on what's included in Runtime and how it's versioned, see [Runtime Versioning](https://docs.astronomer.io/astro/runtime-version-lifecycle-policy).

By default, the Docker image in your Dockerfile is:

```
FROM quay.io/astronomer/astro-runtime:5.0.4

```

## **Step 2: Build Your Project Locally[](https://docs.astronomer.io/astro/create-project#step-2-build-your-project-locally)**

To confirm that you successfully initialized an Astro project, run the following command from your project directory:

```
astro dev start

```

This command builds your project and spins up 4 Docker containers on your machine, each for a different Airflow component:

- **Postgres:** Airflow's metadata database
- **Webserver:** The Airflow component responsible for rendering the Airflow UI
- **Scheduler:** The Airflow component responsible for monitoring and triggering tasks
- **Triggerer:** The Airflow component responsible for running Triggers and signaling tasks to resume when their conditions have been met. The Triggerer is used exclusively for tasks that are run with [deferrable operators](https://docs.astronomer.io/astro/deferrable-operators)

As your project builds locally, you should see the following output:

```
% astro dev start
Env file ".env" found. Loading...
Sending build context to Docker daemon  10.75kB
Step 1/1 : FROM quay.io/astronomer/astro-runtime:5.0.4

# Executing 5 build triggers
---> Using cache
---> Using cache
---> Using cache
---> Using cache
---> Using cache
---> 5160cfd00623
Successfully built 5160cfd00623
Successfully tagged astro-trial_705330/airflow:latest
INFO[0000] [0/4] [postgres]: Starting
INFO[0002] [1/4] [postgres]: Started
INFO[0002] [1/4] [scheduler]: Starting
INFO[0003] [2/4] [scheduler]: Started
INFO[0003] [2/4] [webserver]: Starting
INFO[0004] [3/4] [webserver]: Started
INFO[0003] [3/4] [triggerer]: Starting
INFO[0004] [4/4] [triggerer]: Started
Airflow Webserver: http://localhost:8080
Postgres Database: localhost:5432/postgres
The default credentials are admin:admin

```

****INFO****

By default, the Astro CLI uses port `8080` for the Airflow Webserver and port `5432` for the Airflow metadata database. If these ports are already in use on your local machine, you can change the default ports for these components by following these steps:

1. In your Astro project directory, open `.astro/config.yaml`. This file might be hidden in graphical file browsers. You can show hidden files using `⌘ + Shift + .` on Mac or by selecting **View** > **Hidden items** in Windows file explorer.
2. Specify alternative ports for your Webserver and/or metadata database in `config.yaml`. For example, to use `8081` for your Webserver port and `5435` for your database port, you would specify the following:
    
    ```
    project:
      name: <your-directory-name>
    webserver:
      port: 8081
    postgres:
      port: 5435
    
    ```
    
3. Run `astro dev restart` to rebuild and rerun your project.

## **Step 3: Access the Airflow UI[](https://docs.astronomer.io/astro/create-project#step-3-access-the-airflow-ui)**

Once your project builds successfully, you can access the Airflow UI by going to `http://localhost:8080/` and logging in with `admin` for both your username and password.

****INFO****

It might take a few minutes for the Airflow UI to be available. As you wait for the Webserver container to start up, you may need to refresh your browser.

After logging in, you should see the DAGs from your `dags` directory in the Airflow UI.

![https://docs.astronomer.io/img/docs/sample-dag.png](https://docs.astronomer.io/img/docs/sample-dag.png)

## **Next Steps[](https://docs.astronomer.io/astro/create-project#next-steps)**

Running your project locally is the best way to test your DAGs before pushing them to Astro. For more information on running a local Airflow environment, read:

- [Develop your Astro Project](https://docs.astronomer.io/astro/develop-project)
- [Test and Troubleshoot Locally](https://docs.astronomer.io/astro/test-and-troubleshoot-locally#run-a-project-locally)

