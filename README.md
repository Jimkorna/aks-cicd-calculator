# Azure AKS CI/CD Automation Project

This repository contains an end-to-end, automated deployment pipeline for a containerized Node.js application running on **Azure Kubernetes Service (AKS)**. 

The project demonstrates modern DevOps practices, including Infrastructure as Code (IaC), continuous integration/deployment (CI/CD), and secure cloud authentication.

## 🚀 Architecture Overview
The workflow follows a standard DevOps lifecycle:
1. **Infrastructure**: Provisioned using **OpenTofu**.
2. **Containerization**: The application is containerized using **Docker**.
3. **CI/CD**: Fully automated pipeline using **GitHub Actions**.
4. **Security**: Secure authentication with Azure using **OIDC (OpenID Connect)**.

## 🛠 Tech Stack
* **Cloud Provider:** Microsoft Azure
* **Orchestration:** Azure Kubernetes Service (AKS)
* **Infrastructure as Code:** OpenTofu
* **CI/CD:** GitHub Actions
* **Container Registry:** Azure Container Registry (ACR)
* **Language:** Node.js

## ⚙️ How the Pipeline Works
Every time a commit is pushed to the `main` branch, the following steps are triggered automatically:
1. **Login**: Securely authenticates to Azure via OIDC.
2. **Build**: Builds the Docker image.
3. **Push**: Pushes the image to the Azure Container Registry.
4. **Deploy**: Updates the Kubernetes deployment in AKS using `kubectl`.

## 📸 Screenshots
<img width="745" height="104" alt="image" src="https://github.com/user-attachments/assets/76ec2c50-d120-488b-86f6-0cb0aa6b6ae4" />

## 🚧 Challenges & Troubleshooting
Building this pipeline involved overcoming several real-world DevOps challenges:

* **Transitioning to OIDC Authentication:** Instead of using legacy, hardcoded JSON credentials (`AZURE_CREDENTIALS`), I implemented the modern and more secure **OpenID Connect (OIDC)** method. This required setting up Federated Credentials in Azure AD and mapping `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_SUBSCRIPTION_ID` to individual GitHub Secrets.
* **Fixing OIDC Token Permissions:** Initially, the Azure login step failed in GitHub Actions. I identified that OIDC requires explicit permissions to generate a token, which I resolved by adding the `permissions: id-token: write` and `contents: read` block to the workflow file.
* **Workflow Directory Structure:** The GitHub Actions pipeline wouldn't trigger automatically at first because the `.github/workflows` folder was accidentally nested inside the project subfolder. Moving it to the absolute root of the repository resolved the issue and enabled automatic triggers on `git push`.
* **Context/Path Management in CI/CD:** Since the application code (`server.js`) and the `Dockerfile` were located in a subfolder, the pipeline failed to build the image. I fixed this by configuring the pipeline steps to explicitly change directories (`cd azure-aks-project`) before executing the `docker build` and `kubectl apply` commands.

## 💡 Key Learnings
* Mastering OpenTofu for infrastructure provisioning.
* Implementing OIDC for secure, passwordless authentication between GitHub and Azure.
* Setting up automated Kubernetes rollouts to ensure zero-downtime updates.

---
*Created by [Jimkorna]*
