# Example Application Project #

This is a small application example that uses nodeJS and the Express web server package to provision a simple web site that responds to a root request `/` with a page containing information about its environment and also the result of a request to the example Api project from the `CCSExampleApi1` repository.

The application will listen for requests on **port 8080**. Note that this is the port number the build pipe lines will use when defining the ECS tasks and load balancer rules. Changing the application to use a different port will result in incorrect deployment of the resulting container.

In addition to Express it makes use of two other packages of note:

`govuk-frontend` [https://github.com/alphagov/govuk-frontend](https://github.com/alphagov/govuk-frontend)

This is the GOV UK front end tool kit and it provides the basic styling for the example application.

`ccsexamplenpmmodule`

This is the example NPM module project from the `CCSExampleNPMModule` repository. It provides a small class, `AppConfig` that inspects the environment variables to generate a valid URL for invoking the example Api.

## Local Execution ##
To execute locally, assuming nodejs and npm are installed, checkout the repository from Github and execute the following:

```
npm install
npm start
```

A web browser request to `http://localhost:8080/` should result in a page being displayed. This will probably include an error relating to the attempt to invoke the example api: api1.

If you have a local copy of the api running under Docker (see `CCSExampleApi1` repository) and listening on port `18080`, and assuming your local Docker machine is using IP `192.168.99.100` add the following to your hosts file:

`192.168.99.100 api1.ccsdev-internal.org`

Then define the following environment variable:

`set CCS_API_BASE_URL=ccsdev-internal.org:18080`

Running the application again and accessing `http://localhost:8080/` should now result in the Api call succeeding. It is important that the request to the api is made using the host name defined in the rules for the load balancer attached to the ECS Api cluster, the default being `api1.ccsdev-internal.org`.

If you are building and running the example Api locally as a Java application change `192.168.99.100` to `127.0.0.1`.

## Build Pipeline ##
The corresponding example build pipeline project is in the `CCSDevEnvironment` repository as `/terraform/build/app1`. The pipeline currently needs to be stored within the `CCSDevEnvironment` repository because it requires access to various Terraform modules.

## Dockerfile ##
The project includes a simple Docker file, this is used by the build pipeline to generate the container image. It is a standard file for a NodeJS based application. It must expose port 8080. If Docker is installed it can be executed locally.

To build the Docker image locally execute:

`docker image build -t ccs/app1 .`



 
