# 🔥📊 NCPI FHIR Data Dashboard

<p align="center">
  <a href="https://github.com/ncpi-fhir/ncpi-ui-fhir-data-dashboard/blob/master/LICENSE"><img src="https://img.shields.io/github/license/ncpi-fhir/ncpi-ui-fhir-data-dashboard.svg?style=for-the-badge"></a>
  <a href="https://circleci.com/gh/ncpi-fhir/ncpi-ui-fhir-data-dashboard"><img src="https://img.shields.io/circleci/project/github/ncpi-fhir/ncpi-ui-fhir-data-dashboard.svg?style=for-the-badge"></a>
  <a href="https://codecov.io/gh/ncpi-fhir/ncpi-ui-fhir-data-dashboard"><img src="https://img.shields.io/codecov/c/gh/ncpi-fhir/ncpi-ui-fhir-data-dashboard?style=for-the-badge"></a>
</p>


💡📊A prototype data dashboard for any FHIR server. Spin this up in front of your server so people can get a quick visual understanding of what's in this server.

## Quickstart

The NCPI FHIR Dashboard app has been deployed into the three standard environments
within the NCPI AWS account: Dev, QA, Prd.

Each dashboard deployment points at the NCPI FHIR server that has been deployed
in the same environment (e.g. the dashboard deployed in the Dev environment points
at the FHIR server deployed in the Dev environment)

The endpoints for these are:

### Production
https://ncpi-api-fhir-service.kidsfirstdrc.org/dashboard

### QA
https://ncpi-api-fhir-service-qa.kidsfirstdrc.org/dashboard

### Dev
https://ncpi-api-fhir-service-dev.kidsfirstdrc.org/dashboard

### Pre-requisite: FHIR Server Access

In order to use the dashboard to browse data in NCPI servers you will
need to:

1. Request access to the server
2. Authenticate with your Google account

Please follow the instructions on the [NCPI FHIR Server README](https://github.com/ncpi-fhir/ncpi-api-fhir-service/blob/master/README.md#-server-access-).

## Developers

### Dockerized Dashboard
If you want to run the dashboard app and don't want to install
dependencies directly on your machine, you can spin up the Dockerized dashboard
app:

```shell
docker-compose up -d
```

This will launch an NGINX container serving your app at `http://localhost:3000`
By default the app points to a local FHIR server at `http://localhost:8000`.

If you want to change the FHIR server behind the app, you can set the environment
variables (see [FHIR APIs](#FHIR-APIs)) in your `docker-compose.yml` file.

## Native Dashboard

If you are developing, you will need to setup your development
environment on your machine. This application utilizes `create-react-app`.
To run it, install the dependencies and start the server on your machine:

```
npm install
npm start
```

This will open up the application at `localhost:3000`.
More on `create-react-app` [here](https://reactjs.org/docs/create-a-new-react-app.html).

If you want to change the FHIR server behind the app, you can set the environment
variables (see [FHIR APIs](#FHIR-APIs)) in your shell environment or a `.env`
file.

### FHIR APIs

Creating a data dashboard over the FHIR API standard means that a user potentially
has the ability to search over datasets from different FHIR servers.

This application can be launched over any FHIR server. To use a specific FHIR
server, set the following environment variables
(also found at `/src/.env.example`) in your shell environment if running
natively or in your Docker compose file if running via Docker:

`REACT_APP_FHIR_API`: The url at which the FHIR server is located<br>
`REACT_APP_FHIR_API_NAME`: The display name of the FHIR server<br>
`REACT_APP_FHIR_API_AUTH_TYPE`: The two options for this are `NO_AUTH` or `BASIC_AUTH`

Servers are configurable and more can be added after startup.

### Tests

The dashboard uses [Cypress](https://www.cypress.io/) and the local development server to run frontend tests. To open Cypress, use the command:

`npm run cypress:open`

This will pull up an interactive window for running tests. You must also be running the dashboard locally at `http://localhost:3000` to run the tests. Click on any of the tests listed to execute them.
