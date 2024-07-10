resource "google_cloud_run_v2_service" "cloud-run-instance" {
  name     = var.service_name
  location = var.region
  labels = {
    servicename = var.service_name_tag
    environment = var.target_env
  }

  traffic {
    percent = 100
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
  }

  template {
    service_account = var.service_account

    scaling {
      max_instance_count = var.max_total_instances
    }

    containers {
      image = var.image_repository

      env {
        name  = "NODE_ENV"
        value = var.target_env
      }

      env {
        name  = "TARGET_ENV"
        value = var.target_env
      }
    }
  }
}

# resource "google_cloud_run_domain_mapping" "domain_mapping" {
#   location = var.region
#   name     = var.domain_name

#   metadata {
#     namespace = var.project

#     labels = {
#       servicename = var.service_name_tag
#       environment = var.target_env
#     }
#   }

#   spec {
#     route_name = google_cloud_run_service.cloud-run-instance.name
#   }
# }

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location = google_cloud_run_v2_service.cloud-run-instance.location
  project  = google_cloud_run_v2_service.cloud-run-instance.project
  service  = google_cloud_run_v2_service.cloud-run-instance.name

  policy_data = data.google_iam_policy.noauth.policy_data
}
