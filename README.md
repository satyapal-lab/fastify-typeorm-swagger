# Instruction 
Starter template for nodejs web application using fastify, typescript, typeorm, swagger and postgres 

1. Clone repository from `https://github.com/satyapal-lab/fastify-typeorm-swagger.git`

2. Install dependencies

```
npm install
```

3. Update database, user name and password into data-source.ts file

```
import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "USERNAME",
    password: "PASSWORD",
    database: "DATABASE_NAME",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
```

4. Start the application 
```
npm run dev
```

5. Open `http://localhost:8080/documentation/static/index.html`
It will open swagger api documentation. Try Ping api. It should return Pong

6. Uncomment below code into src/fastify/app.ts file and start the application. It will insert two users into database.

```
      // // insert new users for test
      // await AppDataSource.manager.save(
      //   AppDataSource.manager.create(User, {
      //     firstName: "Mahesh",
      //     lastName: "Sharma",
      //     email: "m@s.com"
      //   })
      // )
  
      // await AppDataSource.manager.save(
      //   AppDataSource.manager.create(User, {
      //     firstName: "Rohit",
      //     lastName: "Kumar",
      //     email: "r@r.com"
      //   })
      // )
```

7. Try users api endpoint from swagger. You should get the two users in response.

