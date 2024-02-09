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

