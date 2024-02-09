import fastify from "fastify"
import { datasource } from "./data-source"
import { routes } from "./routes"
import { AppDataSource } from "../data-source"
import { User } from "../entity/User"
import fastifySwagger from "./swagger"

export async function createServer() {
    const server = fastify()

    await server.register(datasource)
    await server.register(fastifySwagger)

    server.get('/ping', async (request, reply) => {
      return 'pong\n'
    })
    
    await server.register(routes)
    await server.ready()
    server.swagger()
  
    server.listen({ port: 8080 }, async (err, address) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log(`Server listening at ${address}`)
  
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
    })
  }
