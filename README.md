<div id="top"></div>

## Data Team create-react-app Github Template

<div>
  <p>Table of Contents</p>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#used-technologies">Used Technologies</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#circleci-changes">CircleCI Changes</a></li>
        <li><a href="#terraform-changes">Terraform Changes</a></li>
        <li><a href="#create-new-service-account">Create New Service Account</a></li>
        <li><a href="#set-circleci-environment-variables">Set CircleCI Environment Variables</a></li>
        <li><a href="#congratulations">Congratulations</a></li>
      </ul>
    </li>
  </ol>
</div>


## About The Project
This repository is a GitHub template that could be used to create and deploy quickly an `express` app in Gcloud. This project contains CircleCI pipeline, terraform deployment, and working typescript express app with a simple skeleton structure. You will need to change a few configurations and you can have a working application in less than 30 minutes.

<p align="right">(<a href="#top">back to top</a>)</p>



### Used Technologies

* CircleCI
* Terraform
* React
* Redux
* Redux Saga
* React Router
* React Intl
* Typescript
* Jest

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

When creating a new repository, select
`Repository template` and pick the `newscorp-ghfb/nuk-create-react-app-template` value. This is going to copy the code from this repository into the new repository.
![Screenshot 2022-08-01 at 14 24 29](https://user-images.githubusercontent.com/58942028/182595796-e25843c3-42fc-4315-ad3f-372fb6ea258f.png)

### CircleCI Changes

Inside the `.circleci/config.yaml` file you will need to apply the following changes:

1. Uncomment the following code for [staging](https://github.com/newscorp-ghfb/nuk-create-react-app-template/blob/master/.circleci/config.yml#L251)
2. Uncomment the following code for [production](https://github.com/newscorp-ghfb/nuk-create-react-app-template/blob/master/.circleci/config.yml#L271)
3. Change the values of `IMAGE_SERVICE_NAME` [here](https://github.com/newscorp-ghfb/nuk-create-react-app-template/blob/master/.circleci/config.yml#L88) and [here](https://github.com/newscorp-ghfb/nuk-create-react-app-template/blob/master/.circleci/config.yml#L205) with the name of your service. For example, if your service is called `Service Name`, the name would be `nuk-service-name`. These lines will look like this in our case:
```
  IMAGE_SERVICE_NAME="nuk-service-name"
```

The CircleCI contains the following:
1. Worksflows:
   1. Workflow for staging (`deploy_to_staging`)
   2. Workflow for production (`deploy_to_prod`)
2. Each workflow contains the following jobs:
   1. `init_gcloud` - job to initialise the google credentials and persist them through the whole pipeline
   2. `build_service_image_and_push` - job to build, tag and publish the image of the service to the container registry
   3. `terraform_deploy` - job to provide all the gcloud resources required for your service. This include `init`, `fmt`, `validate`, `plan` and `apply`

### Terraform Changes

Inside the `deploy/terraform/main.tf` file you will need to apply the following changes:

Replace:
```
prefix = "<YOUR_BUCKET_FOLDER_NAME>".
```

If your service is called `Service Name`, then your prefix value will be:

```
terraform {
  backend "gcs" {
    bucket = var.bucket
    prefix = "nuk-service-name"
  }
}
```

Inside the `deploy/terraform/terraform.tfvars` file you will need to apply the following changes:

Replace:
```
service_name        = "<YOUR_SERVICE_NAME>"
service_name_tag    = "<YOUR_SERVICE_NAME_TAG>"
```

If your service is called `Service Name` and your service name tag is `nuk-service-name-server` then your `service_name` and `service_name_tag` will look like:

```
service_name        = "nuk-service-name"
service_name_tag    = "nuk-service-name-server"
```

### Create New Service Account
You will need to create a new service account and generate keys for the deployment. A guide how to do that can be found [here](https://nidigitalsolutions.jira.com/wiki/spaces/DATA/pages/3966763103/Gcloud+Service+Account). Once you generate a service account key, you will need to set it in CircleCI.

### Set CircleCI Environment Variables

After setting up the repository and you are done with it's configuration, you will need to setup the project inside CircleCI.
Setuping CircleCI is easy - you open the project dashboard [here](https://app.circleci.com/projects/project-dashboard/github/newscorp-ghfb/), navigate to your repository and click `Set Up Project`. You will need to follow up the project.

Replace `YOUR REPOSITORY NAME` with the actual name of your repository in the following link and open the link:

```https://app.circleci.com/settings/project/github/newscorp-ghfb/YOUR REPOSITORY NAME/environment-variables```

You will need to set the following env variables:
1. `GOOGLE_APPLICATION_CREDENTIALS_STAGE` - you will need to put the whole json file of the staging service account key as value.
2. `GOOGLE_APPLICATION_DEPLOY_EMAIL_STAGE` - you will need to put the email of the staging service account as value.
3. `WIF_AUDIENCE_STAGE` - Workload Identity Federation audience (STAGE).
4. `WIF_AUDIENCE_PROD` - Workload Identity Federation audience (PROD)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Congratulations

You are done! After running the pipeline you should have a new service hosted in Cloud Run instance. Please feel free to contribute to this template or contact us if you have any questions in slack: [#data-technology](https://newsuktechnology.slack.com/archives/C039881D0H3).

* Contributors: Data Team

<p align="right">(<a href="#top">back to top</a>)</p>
