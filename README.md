# partners-app

Is a Rest API to search the nearest partner of a given point

## Requirements

To install and run this project, you need the follow requirements:

1. Node - https://nodejs.org/en/
2. Git - https://git-scm.com/
3. Docker - https://www.docker.com/

## Installation

Passo 1: Choose your workspace and clone this project.

```
git clone git@github.com:ugocavalcanti/partners-app.git
```
Passo 2: Go to the root directory

```
cd partners-app
```

Passo 3: Install all the dependecies
```
npm install
```

Passo 4: Run the docker compose to create a container with a mongo database

```
docker-compose up
```

Passo 5: Finally, run a node server to up the services and access them in http://localhost:3000

```
npm run dev
```

## Usage

POST - a partner

```
http://localhost:3000/partner

{
  "tradingName": String,
  "ownerName": String,
  "document": String / unique,
  "coverageArea": { 
    "type": "MultiPolygon", 
    "coordinates": [[[[Number]]]]
  },
  "address": { 
    "type": "Point",
    "coordinates": [Number]
  }
}
```

GET - by id

```
http://localhost:3000/partner/<_id>
```

SEARCH NEAREST PARTNER

```
http://localhost:3000/partner/<longitude>/<latitude>
```

## Tests

In the root directory, run the command below

```
npm run test
```

## Deploy

To deploy this application, you must send the directory "src"(and your content) and the "package.json" 
to your favorite provider. In addition, in this same, provider, you must configure the environment variables:
```
environment

PORT

MONGO_DB_CONNECTION
```

Finally, you have to install all the dependencies and run the API application. Typically,  providers do 
this for you with their own configurations.


## Author
Ugo da Costa Cavalcanti - Software Engineer - https://www.linkedin.com/in/ugocavalcanti/
