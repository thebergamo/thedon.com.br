import { FastifyInstance } from 'fastify'
import {
  deleteIssue,
  getIssue,
  listIssues,
  newIssue,
  updateIssue,
} from './issue.schema'

import * as controller from './issue.controller'

export default async function issueRouter(fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/',
    schema: newIssue,
    handler: controller.create,
  })

  fastify.route({
    method: 'GET',
    url: '/',
    schema: listIssues,
    handler: controller.list,
  })

  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: getIssue,
    handler: controller.read,
  })

  fastify.route({
    method: 'PUT',
    url: '/:id',
    schema: updateIssue,
    handler: controller.update,
  })

  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: deleteIssue,
    handler: controller.remove,
  })
}
