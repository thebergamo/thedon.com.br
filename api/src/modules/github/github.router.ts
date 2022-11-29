import { FastifyInstance } from 'fastify'
import * as schema from './github.schema'
import * as controller from './github.controller'

export default async function githubRouter(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/',
    schema: schema.getRepos,
    handler: controller.read,
  })
}
