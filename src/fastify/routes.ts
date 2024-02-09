import { FastifyInstance } from "fastify"
import { AppDataSource } from "../data-source"
import { User } from "../entity/User"

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
export async function routes(fastify: FastifyInstance) {
    fastify.get('/users', async (request, reply) => {
        const userRepository = AppDataSource.getRepository(User)
        const users = await userRepository.find();
        return users;
    })
}