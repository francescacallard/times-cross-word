terraform {
  backend "gcs" {
    bucket = var.bucket
    prefix = "<YOUR_BUCKET_FOLDER_NAME>" // Can't be variable should be static value
  }
}

provider "google" {
  project = var.project
  region  = var.region
}