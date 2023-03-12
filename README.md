# Nest.js with Mocked RabbitMQ and Sender Email

Swagger: [http://localhost:3000/swagger](http://localhost:3000/swagger)

### Implementations: 
- The database used was MongoDB with the Mongoose module. 
- The API follows a specific response format using interceptors. The gateway also had an interceptor that logs the class used and the error.
- The database is agnostic and is involved by other classes which have a memory version.
- The application is constructed based on modules, which are: users, health, and events.
- Post methods have their body verified by the Zod library.
- The Swagger documentation is constructed using Decorators.
- Architecture:
``` json
{
"api": "Implements all endpoints",
"domain": "Implements interfaces, business rules, entities without dependencies, and is the bridge between API and infra",
"infra": "Is the core of the application, containing databases, configs, and entities with dependencies" 
}
```


- Install dependencies: 
```
pnpm install
```

- start project
```
pnpm start:dev
```

- start build
```
pnpm build
```

- start docker
```
docker-compose up
```

### Steps
- Install all dependencies of project
- Start docker
- Start project 
### Require

- Docker
- nodejs > 16



