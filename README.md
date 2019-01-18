# AKS-Angular-AspnetCore-SQLServer
Azure Kubernetes Service (AKS) Sample Application developed in Angular, ASP.net Core and SQL Server

Azure Kubernetes Service(AKS) makes it simple to deploy a managed Kubernetes cluster in Azure. The scope of this blog is to show how easy it is to deploy a sample application to AKS which is developed in Angular, ASP.net core and SQL Server on Linux. 

The components and steps needed to deploy these to AKS are
• SQL Server on Linux
  ◦ Create deployment for SQL Server on Linux
  ◦ Deploy to AKS
• ASP.net Core Web API
  ◦ Create ASP.net Core Web API
  ◦ Create a docker image
  ◦ Publish docker image to Docker Hub
  ◦ Create deployment for Web API
  ◦ Deploy to AKS
• Angular App
  ◦ Create and Angular App
  ◦ Create a docker image
  ◦ Publish docker image to Docker Hub
  ◦ Deploy to AKS

You can read in detail by going through this article https://www.appdevmusings.com/azure-kubernetes-service-aks-deploying-angular-asp-net-core-and-sql-server-on-linux/

# Multiple ways to load App configuration in ASP.net Core Web API

Hosting Environment specific appsettings.json
Dockerfile Environment Variables
Kubernetes
Container Environment variables with data from ConfigMap/Secret
Populate Volume (Config file) with data stored in a ConfigMap/Secret
Azure Key Vault Secrets

You can read in detail by going through this article 
https://www.appdevmusings.com/asp-net-core-2-1-web-api-load-app-configuration-from-appsettings-json-dockerfile-environment-variables-azure-key-vault-secrets-and-kubernetes-configmaps-secrets/

# Add real-time web functionality to Angular application using ASP.NET Core SignalR, Azure SignalR service and Azure SignalR Service bindings for Azure Functions 2.0

https://www.appdevmusings.com/add-real-time-web-functionality-to-angular-application-using-asp-net-core-signalr-azure-signalr-service-and-azure-signalr-service-bindings-for-azure-functions-2-0/

# Deploy SonarQube to Azure Kubernetes Service cluster and integrate with Azure DevOps build pipeline
https://www.appdevmusings.com/deploy-sonarqube-to-azure-kubernetes-service-cluster-and-integrate-with-azure-devops-build-pipeline/

# Host your ASP.NET Core 2.2 Web App with IIS (in-process and out-of-process hosting model) and deploy to Docker Windows Containers
https://appdevmusings.com/host-your-asp-net-core-2-2-web-app-with-iis-in-process-and-out-of-process-hosting-model-and-deploy-to-docker-windows-containers/
 
One of the new features of ASP.NET Core 2.2 is support for hosting ASP.NET Core Web App with IIS using in-process or out-of-process hosting model. This article will cover steps needed to

- Host ASP.NET Core 2.2 Web API with IIS using in-process hosting model
- Host ASP.NET Core 2.2 Web API with IIS using out-of-process hosting model
- Host ASP.NET Core 2.2 Web API in Docker Windows containers (with IIS)

# Configure Kubernetes Liveness and Readiness probes for ASP.NET Core 2.2 web application using Health checks
https://appdevmusings.com/configure-kubernetes-liveness-and-readiness-probes-for-asp-net-core-2-2-web-application-using-health-checks/

Health checks API is one of the new features of ASP.NET Core 2.2 for application health monitoring. Health checks are exposed by ASP.NET Core 2.2 application as HTTP endpoints which enables liveness and readiness probes.

Health checks are usually used with an external monitoring service or container orchestrator to check the status of an app. In this article, I am going to share steps needed to configure Kubernetes Liveness and Readiness probes for an ASP.NET Core 2.2 web application deployed in Azure Kubernetes Service cluster.
