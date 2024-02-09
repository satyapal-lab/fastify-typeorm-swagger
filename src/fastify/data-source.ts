import { FastifyInstance } from "fastify";
import { AppDataSource } from "../data-source";

export async function datasource(fastify: FastifyInstance) {
    await AppDataSource.initialize()
}