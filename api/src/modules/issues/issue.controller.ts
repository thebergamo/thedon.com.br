import { FastifyReply, FastifyRequest } from 'fastify'
import HttpError from 'http-errors'
import { IssueDTO } from './dto/issue.dto'
import * as service from './issue.service'

interface CreateIssueRequest extends FastifyRequest {
  body: IssueDTO
}

interface ReadIssueRequest extends FastifyRequest {
  params: { id: number }
}

interface FindIssuesREquest extends FastifyRequest {
  query: { draft: boolean }
}

type UpdateIssueRequest = CreateIssueRequest & ReadIssueRequest
type DeleteIssueRequest = ReadIssueRequest

export const create = async (
  request: CreateIssueRequest,
  reply: FastifyReply
) => {
  const newIssue = request.body

  const createdIssue = await service.createIssue(newIssue)

  return reply.status(201).send(createdIssue)
}
export const read = async (request: ReadIssueRequest, reply: FastifyReply) => {
  const { id } = request.params

  const issue = await service.getIssue(id)

  if (!issue) {
    return reply
      .status(404)
      .send(new HttpError.NotFound('Issue does not exist'))
  }

  return reply.send(issue)
}
export const list = async (request: FindIssuesREquest, reply: FastifyReply) => {
  const { draft } = request.query

  const issues = await service.findIssues({ draft })

  return reply.send(issues)
}
export const update = async (
  request: UpdateIssueRequest,
  reply: FastifyReply
) => {
  const issue = request.body
  const { id } = request.params

  const updatedIssue = await service.updateIssue(id, issue)

  if (!updatedIssue) {
    return reply.send(new HttpError.NotFound('Issue does not exist'))
  }

  reply.send(updatedIssue)
}
export const remove = async (
  request: DeleteIssueRequest,
  reply: FastifyReply
) => {
  const { id } = request.params

  const deleted = await service.deleteIssue(id)

  if (!deleted) {
    return reply.send(
      new HttpError.NotFound('Issue cannot be deleted because does not exist')
    )
  }

  reply.status(200)
}
