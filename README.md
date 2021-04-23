# partners-app

Is a Rest API to search the nearest partner of a point

## Installation

Clone this project and install your dependencies

```
npm install
```

Finally, run a node server to up the services and access them in http://localhost:3000

```
npm run dev
```

## Usage

POST

```
http://localhost:3000/partner
```

GET

```
http://localhost:3000/partner/<_id>
```

SEARCH NEAREST PARTNER

```
http://localhost:3000/partner/<longitude>/<latitude>
```

#Tests

To run the tests, you need to execute a container for a new database, exclusively to tests.
In a terminal, go to the root directory of the project e run the docker compose to up a database

```
docker-compose up
```

In another terminal, run the command below

```
npm run test
```

## Deploy
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Author
Ugo da Costa Cavalcanti - https://www.linkedin.com/in/ugocavalcanti/
