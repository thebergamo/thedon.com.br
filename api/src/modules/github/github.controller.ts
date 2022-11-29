import { FastifyReply, FastifyRequest } from 'fastify'
import { fetchPinnedRepos } from './github.service'

export const read = async (_request: FastifyRequest, reply: FastifyReply) => {
  const repos = await fetchPinnedRepos()
  return reply.send(repos)
}
