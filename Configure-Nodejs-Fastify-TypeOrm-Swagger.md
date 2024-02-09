# Fastify, Nodejs and Typeorm scafolding

1. Create a new npm project, install Fastify, and install typescript & node.js types as peer dependencies:

```
npm init -y
npm i fastify
npm i -D typescript @types/node
```

2. Initialize a TypeScript configuration file:

```
npx tsc --init
```

Note: Set target property in tsconfig.json to es2017 

3. Create an index.ts file - add following code

```
import fastify from 'fastify'

const server = fastify()

server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
```

4. Run `npm run build` - this will compile `index.ts` into `index.js` which can be executed using Node.js.

5. Run `npm run start` to run the Fastify server

6. Try out your server using curl localhost:8080/ping, it should return pong 🏓


# Configure Typeorm


1. Install the npm package:
```
npm install typeorm --save
npm install reflect-metadata --save
```


2. import `reflect-metadata` shim into `index.ts` file
```
import "reflect-metadata"
```


3. Install a postgres database driver:
```
npm install pg --save
```


4. Typescript configuration
You have to enbale following configuration in `tsconfig.json` 
```
"lib": [ "es6" ],
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```


5. Create a src/entity/User.ts file - add following code

```
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50 })
    firstName: string

    @Column({ length: 50 })
    lastName: string

    @Column()
    email: string

}

```


6. Create a src/data-source.ts file - add following code

```
import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "USER_NAME",
    password: "PASSWORD",
    database: "DATABASE_NAME",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})

```


7. Insert new user for testing TypeOrm configuration. Adds following code into callback function of server.listen. 
```
// insert new users for test
  await AppDataSource.manager.save(
    AppDataSource.manager.create(User, {
      firstName: "Mahesh",
      lastName: "Sharma",
      email: "m@s.com"
    })
  )

  await AppDataSource.manager.save(
    AppDataSource.manager.create(User, {
      firstName: "Rohit",
      lastName: "Kumar",
      email: "r@r.com"
    })
  )
```

8. Test configuration 
```
npm run build
npm start
```
Check your database. There should be a new user table with two users



# Configure Swagger

1. Install fastify swagger plug-in and swagger-ui plug-in
```
npm i @fastify/swagger
npm i @fastify/swagger-ui
```


2. Create a `swagger.ts` and adds following code

```
import { FastifyInstance } from "fastify";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyPlugin from 'fastify-plugin'
import swagger from "@fastify/swagger";

async function configureSwagger(fastify: FastifyInstance) {
    await fastify.register(swagger as any, {
        openapi: {
          info: {
            title: 'Test swagger',
            description: 'testing the fastify swagger api',
            version: '0.1.0'
          },
          servers: [{
            url: 'http://localhost:8080'
          }],
          components: {
            securitySchemes: {
              apiKey: {
                type: 'apiKey',
                name: 'apiKey',
                in: 'header'
              }
            }
          }
        },
        hideUntagged: false,
        exposeRoute: true
      })

    await fastify.register(fastifySwaggerUi, {
        routePrefix: '/documentation',
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false
        },
        uiHooks: {
            onRequest: function (request, reply, next) { next() },
            preHandler: function (request, reply, next) { next() }
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
        transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
        transformSpecificationClone: true
    })
}

const fastifySwagger = fastifyPlugin(configureSwagger)

export default fastifySwagger;

```

3. Register fastify swagger - add following code into index.ts file

```
await server.register(fastifySwagger)

...register routes...

await server.ready()
server.swagger()
```

4. Test swagger configuration 

```
npm run build
npm start
```

Open `http://localhost:8080/documentation/static/index.html`



