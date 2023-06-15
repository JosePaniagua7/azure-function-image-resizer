# Azure function image resizer

## Requirements
* Docker
    * If you are running on an apple silicon processor (M1 or M2), please, enable rosetta virtualization features. Here is a tutorial on how to do it. http://issamben.com/running-azure-function-as-docker-container-on-an-m1-m2/
* Docker Compose

## How to run the project

To run the project you must simply run the command `docker-compose up` and your service will be available through `http://localhost:3000`

### What is happening behing the scenes?

When you run `docker-compose up`, 3 containers will be created:
* db: a database container that is based on postgresql dockerhub image, this will allow us to maintain data and make it persistance in our storage
* api: Our node-express backend service, the one in charge of receiving tasks requests, store them in db and orchestrate the resizing operations. 
* resizer-service: This will emulate an azure function environment and allow the developer to make any changes in local without cost attached to it.

### Play around with the project

There is a postman collection attached to this repo called `Image resizer.postman_collection.json` so, you just have to import this in your postman agent and will be ready to go. 

As a recommnedation, if you want to test end to end scenario, I'd use the request called "Create task" since it covers the entire long running operation for images resize. Either way, api is prepared to handle not-possible operations like trying to update an image that does not exists.

### Running the function in the cloud. 

To achieve this, you must deploy an azure function in your own azure active directory and then execute the following request

`curl -X POST https://{YOUR_AZURE_FUNCTION}/api/resize-image/{IMAGE_IG}?code={YOUR_AZURE_PROVIDED_CODE}&dimension={YOUR_REQUESTED_DIMENSION}
   -H "Content-Type: application/x-www-form-urlencoded" 
   -d "resource={PATH_TO_FILE}"`


So, replacing some generic values for this particular project, it will end in a call like the following: 

`curl -X POST https://jose-paniagua-image-resizer.azurewebsites.net/api/resize-image/1?code={AZURE_CODE}&dimension=800
   -H "Content-Type: application/x-www-form-urlencoded" 
   -d "resource=./test/resources/input.jpeg"`

Nevertheless, I still recommend to use the postman collection attached, particularly, the request called `Azure function cloud` to see this working.

### Running tests

To run test and check coverage, you must run the following commands:

* `npm i`
* `npm test`


## Project structure

This project was build with a domain driven development approach, with the following identitites and use cases: 
* Image
    * Creator: In charge of receive a task creation event and create all the required image sizes, create an agregate and persist it in database. At the same time, in charge of creating a "resize request" to the service in charge for each entry.
    * Finder: In charge retriving data and instance agregates through the usage of repository in charge.
    * Image updater: In charge of refresh information about a certain image, this use case was used as a subscriber for ImageResizerService so when a resize is ready, this Updater will be nitified and will act in consequence (Store the resized path in db and notify the task to check if status can be set to PROCESSED)
    * LocalImageResizer: This is a service that will perform image resize in the local machine (without performin the http call to the azure-resize-service). This service is also helpful for testing. 
    * AzureImageResizer: Azure function image resizer implementation, consumed through http trigger.
* Tasks
    * Creator: In charge of create task in storage provider (in this case, postgresql) and notify image creator use case.
    * Finder
    * Updater

### Asynchronous behavior

What is most interesing about this project is the Asynchronous approach, since task creation request is not hanged untill resizing operations are done, but it only creates a reisizing request to the Azure function and then is the Azure function the one in charge of notifying the configured subscribers about the resizing result. Under this scenario, the api expose a method where the resizing operation result is received and handled properly (stored in the local container and path saved to db).

## Dependency injection

Dependency injection is made in file `dependeny.injection.ts` and it helps to orchestrate services/dependencies based on the environment.