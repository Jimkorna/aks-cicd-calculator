# terraform/main.tf

# Configures the Azure Provider.
# [TEMPLATE NOTE] Usually, no changes are needed here for a standard Azure deployment.
provider "azurerm" {
  features {}
}

# Creates a Resource Group to hold all related resources.
# [TEMPLATE NOTE] Change 'name' to your new project's name. Change 'location' if you want a different region.
resource "azurerm_resource_group" "rg" {
  name     = "aks-practice-rg"
  location = "West Europe"
}

# Creates the Azure Container Registry (ACR) to store Docker images.
# [TEMPLATE NOTE] Change 'sku' to "Standard" or "Premium" for production workloads.
resource "azurerm_container_registry" "acr" {
  name                = "myregistry${random_integer.ri.result}" # Uses random integer to ensure a globally unique name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = true
}


# resource "azurerm_role_assignment" "aks_to_acr" {
#   principal_id                     = azurerm_kubernetes_cluster.aks.kubelet_identity[0].object_id
#   role_definition_name             = "AcrPull"
#   scope                            = azurerm_container_registry.acr.id
#   skip_service_principal_aad_check = true
# }

# Creates the Azure Kubernetes Service (AKS) cluster.
# [TEMPLATE NOTE] Change 'name' and 'dns_prefix' to match your new application's name.
resource "azurerm_kubernetes_cluster" "aks" {
  name                = "practice-aks"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "practiceaks"

  # Defines the VMs (Nodes) running in the cluster.
  # [TEMPLATE NOTE] Change 'node_count' for high availability. Change 'vm_size' based on CPU/RAM needs.
  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "Standard_D2s_v3"
  }

  identity {
    type = "SystemAssigned"
  }
}

# Generates a random number.
# [TEMPLATE NOTE] Used to make the ACR name unique. No need to change.
resource "random_integer" "ri" {
  min = 10000
  max = 99999
}


# Role Assignment: Grants the AKS cluster permission to pull Docker images from the ACR.
# [TEMPLATE NOTE] Do not change this. It is required for AKS to talk to ACR securely.
resource "azurerm_role_assignment" "aks_to_acr" {
  principal_id                     = azurerm_kubernetes_cluster.aks.kubelet_identity[0].object_id
  role_definition_name             = "AcrPull"
  scope                            = azurerm_container_registry.acr.id
  skip_service_principal_aad_check = true
}