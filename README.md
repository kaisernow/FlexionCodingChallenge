# Flexion Coding Challenge
Live URL: [http://demoebsga-env.eba-b28bc2gd.us-east-1.elasticbeanstalk.com/conversion](http://demoebsga-env.eba-b28bc2gd.us-east-1.elasticbeanstalk.com/conversion "Flexion Coding Challenge")

### To run in production mode
* install docker-compose on your machine
* run `docker-compose up` in root directory
* go to `http://localhost:3000`


### OR

# Frontend
From root folder  :
* `cd client/conversion-app`
* `npm i`
### run tests
* For unit test : `npm run test`
* For e2e : `npm run cypress`
### run app in prod mode (ssr)
* To run application in production mode : `npm run build:ssr && npm run serve:ssr`


# Backend
From root folder:
* `cd server/conversion-app`
* `npm i`
### run tests
* For both unit & e2e tests: `npm run test`
### start application in prod
* `npm run start:prod`

Then,
Go to `http://localhost:4200`

OR 

# Use Command Line Interface
### run command line interface;
From root folder:
* `cd server/conversion-app`
* `npm install`
* `npm run command-line`


## To improve on the app

* Using NgRx for state management 
* Documentation of the nest js api
* Documentation of angular application
* Test command line interface
* Enable an overall http interceptor in angular app for proper network handling


